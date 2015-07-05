import gm from 'gm';
import fs from 'fs';
import http from 'http';
import url from 'url';
import path from 'path';
import express from 'express';
import { TILE_WIDTH, TILE_HEIGHT } from './config/app-config';

let PORT = process.env.PORT || 8765;
const CACHE = {};

const app = express();

app.get('/color/:color', (req, res) => {
  let { color } = req.params;
  if (color in CACHE) {
    complete(CACHE[color]);
    return;
  } else {
    let gw = gm(TILE_WIDTH, TILE_HEIGHT, '#ffffff00')
      .options({ imageMagick: PORT !== 8765 })
      .fill('#' + color)
      .stroke('white', 0)
      .drawEllipse(TILE_WIDTH / 2 - 0.5, TILE_HEIGHT / 2 - 0.5, TILE_WIDTH / 2 + 0.5, TILE_HEIGHT / 2 + 0.5)
      .stream('png');
    let chunks = [];

    gw.on('data', (chunk) => chunks.push(chunk));
    gw.on('end', () => {
      let buff = Buffer.concat(chunks);
      CACHE[color] = buff;
      complete(buff);
    });
    return;
  }
  function complete(buff) {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.write(buff);
    res.end();
  }
});

app.use(express.static(__dirname + '/build/'));
app.use(express.static(__dirname + '/build/assets'));

app.listen(PORT, () => {
  console.log(`mosaic server running on port ${PORT}`);
});
