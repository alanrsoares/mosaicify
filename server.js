// Simulates a mosaic server.
//
// /             serves index.html
// /js/*         servers static files
// /color/<hex>  generates a tile for the color <hex>, and caches it in memory.
//
var config = require('./config/app-config');
var gm = require('gm');
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var PORT = process.env.PORT || 8765;

var dir = path.dirname(fs.realpathSync(__filename));
var mimeTypes = {
  'html': 'text/html',
  'js'  : 'application/javascript'
};
var cache = {};

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  var m;
  if (pathname == '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    fs.createReadStream(dir + '/index.html').pipe(res);
    return;
  } else if (m = pathname.match(/^\/js\//)) {
    var filename = dir + pathname;
    var stats = fs.existsSync(filename) && fs.statSync(filename);
    if (stats && stats.isFile()) {
      res.writeHead(200, {'Content-Type' : 'application/javascript'});
      fs.createReadStream(filename).pipe(res);
      return;
    }
  } else if (m = pathname.match(/^\/color\/([0-9a-fA-F]{6})/)) {
    var hex = m[1];
    if (hex in cache) {
      complete(cache[hex]);
      return;
    } else {
      var gw = gm(config.TILE_WIDTH, config.TILE_HEIGHT, '#ffffff00')
        .options({imageMagick: PORT != 8765})
        .fill('#' + hex)
        .stroke('white', 0)
        .drawEllipse(config.TILE_WIDTH / 2 - 0.5, config.TILE_HEIGHT / 2 - 0.5, config.TILE_WIDTH / 2 + 0.5, config.TILE_HEIGHT / 2 + 0.5)
        .stream('png');
      var chunks = [];

      gw.on('data', function(chunk) { chunks.push(chunk); });
      gw.on('end', function() {
        var buf = Buffer.concat(chunks);
        cache[hex] = buf;
        complete(buf);
      });
      return;
    }
    function complete(buf) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(buf);
      res.end();
    }
  }
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('404 Not Found\n');
  res.end();
}).listen(PORT);

console.log('mosaic server running on port ' + PORT);
