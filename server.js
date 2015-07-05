import gm from 'gm';
import fs from 'fs';
import http from 'http';
import url from 'url';
import path from 'path';
import express from 'express';
import { TILE_WIDTH, TILE_HEIGHT } from './config/app-config';

let PORT = process.env.PORT || 8765;
let cache = {};
let app = express();

app.get('/color/:color', (req, res) => {
  let { color } = req.params;
  const complete = (buff) => {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.write(buff);
    res.end();
  };

  if (color in cache) {
    complete(cache[color]);
    return;
  }

  let gw = gm(TILE_WIDTH, TILE_HEIGHT, '#ffffff00')
    .options({ imageMagick: PORT !== 8765 })
    .fill('#' + color)
    .stroke('white', 0)
    .drawEllipse( TILE_WIDTH / 2 - 0.5
                , TILE_HEIGHT / 2 - 0.5
                , TILE_WIDTH / 2 + 0.5
                , TILE_HEIGHT / 2 + 0.5 )
    .stream('png');

  let chunks = [];

  gw.on('data', (chunk) => chunks.push(chunk));
  gw.on('end', () => {
    let buff = Buffer.concat(chunks);
    cache[color] = buff;
    complete(buff);
  });

});

app.use(express.static(__dirname + '/build/'));

app.listen(PORT, () => {
  console.log(`mosaic server running on port ${PORT}`);
});
