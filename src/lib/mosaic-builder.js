import { TILE_WIDTH, TILE_HEIGHT } from '../../config/app-config';

const NO_OP = () => {};

let unique = (items) => {
  return items.reduce((uniqueItems, item) => {
    if (!(uniqueItems.indexOf(item) + 1)) {
      uniqueItems.push(item);
    }
    return uniqueItems;
  }, []);
};

let memoise = (fn) => {
  let memo = {};
  return (...xs) => {
    let key = JSON.stringify(xs);
    return memo[key] || (memo[key] = fn.apply(this, xs));
  };
};

export default class MosaicBuilder {
  constructor(file) {
    this.file = file;
    this.onProgressChanged = NO_OP;
  }

  // Number -> String
  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  // (Number, Number, Number, Number) -> String
  rgbToHex(r, g, b, colors) {
    let toComponentColor = memoise((color) =>
      Math.floor((Math.floor(color / 255 * colors) / colors) * 255));

    return [r, g, b].map(toComponentColor)
                    .map(this.componentToHex)
                    .reduce((xs, x) => xs + x);
  }

  // File -> Promise Image
  getImage(file) {
    let img = new Image();
    return new Promise((resolve, reject) => {
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve(img);
    });
  }

  // ({x: Number, y: Number}, Image, Number) -> {color: String, x: Number, y, Number}}
  getPixels(size, img, colors) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = size.x;
    canvas.height = size.y;
    ctx.drawImage(img, 0, 0, size.x, size.y);

    let tileColors = this.getTileColors(ctx.getImageData(0, 0, size.x, size.y), colors);
    let toPixel = (color, i) => {
      return { color
             , x: (i % size.x) + 1
             , y: Math.floor(i / size.x) + 1
             };
    };

    return tileColors.map(toPixel);
  }

  // Calculates the hex color for each tile
  // (Image, Number) -> [String]
  getTileColors(img, colors) {
    let tileColors = [];

    for (let i = 0; i < img.data.length; i += 4) {
      let [r, g, b] = [].slice.call(img.data, i, i + 3);
      tileColors.push(this.rgbToHex(r, g, b, colors));
    }

    return tileColors;
  }
  // Draws a mosaic to a provided canvas object
  // Canvas -> Void
  drawTo(canvas, colors = 256) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.getImage(this.file).then((img) => {
      let size = this.getCanvasSize(img, canvas);
      let dimensions = this.getDimensions(size);
      let pixels = this.getPixels(dimensions, img, colors);
      let uniqueColors = unique(pixels.map((p) => p.color));
      let offSet = {
        x: (canvas.width - size.x) / 2,
        y: (canvas.height - size.y) / 2
      };

      let pixelsCompleted = 0;

      let progress = () => Math.ceil(pixelsCompleted / pixels.length * 100);

      let drawPixel = (p) => {
        ctx.beginPath();
        ctx.arc( offSet.x + p.x * TILE_WIDTH
               , offSet.y + p.y * TILE_HEIGHT
               , TILE_WIDTH / 2
               , 0
               , 2 * Math.PI
               , false
               );
        ctx.fillStyle = `#${p.color}`;
        ctx.fill();
        this.onProgressChanged(progress(++pixelsCompleted));
      };

      let drawColor = (color) => {
        pixels.filter((p) => p.color === color)
              .map((p) => drawPixel(p));
      };

      uniqueColors.map(drawColor);
    });
  }

  // (Image, Canvas) -> Object
  getCanvasSize(img, canvas) {
    let aspectRatio = img.width / img.height;
    let { height, width } = canvas;

    return (width / aspectRatio < height)
      ? {
        x: width,
        y: Math.floor(width / aspectRatio)
      }
      : {
        x: Math.floor(height * aspectRatio),
        y: Math.floor(height)
      };
  }

  // Calculates dimensions for a given canvas size
  // Object -> Object
  getDimensions(size) {
    return {
      x: Math.ceil(size.x / TILE_WIDTH),
      y: Math.ceil(size.y / TILE_HEIGHT)
    };
  }
}
