import async from 'async';

const TILE_HEIGHT = 16;
const TILE_WIDTH = 16;

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

let compose = (...fns) => {
  return (...args) => {
    fns.reduceRight((xs, fn) => {
      return [fn.apply(this, xs)];
    }, args);
  };
};

export default class Mosaic {
  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  rgbToHex(r, g, b, colors) {
    let calcComponent = (color) =>
      Math.floor((Math.floor(color / 255 * colors) / colors) * 255);

    return [r, g, b].map(calcComponent)
                    .map(this.componentToHex)
                    .reduceRight((xs, x) => xs + x);
  }

  getImage(file) {
    let image = new Image();
    return new Promise((resolve, reject) => {
      image.src = URL.createObjectURL(file);
      image.onload = () => resolve(image);
    });
  }

  // returns a array of objects containing pixel data
  // returned object has 3 keys: color, x, y
  // x and y are mosaic coordinates
  getPixelMap(size, image, colors) {
    let tmpCanvas = document.createElement('canvas');
    let context = tmpCanvas.getContext('2d');

    tmpCanvas.width = size.x;
    tmpCanvas.height = size.y;
    context.drawImage(image, 0, 0, size.x, size.y);
    let tileColors = this.getTileColorMap(context.getImageData(0, 0, size.x, size.y), colors);
    let toPixel = (color, i) => {
      return { color
             , x: (i % size.x) + 1
             , y: Math.floor(i / size.x) + 1
             };
    };

    return tileColors.map(toPixel);
  }

  // used to convert the data we get back from getImageData to something more manageable
  getTileColorMap(img, colors) {
    let l = img.data.length;
    let data = [];
    console.log(img.data);
    for (let i = 0; i < l; i += 4) {
      data.push(
        this.rgbToHex( img.data[i]
                     , img.data[i + 1]
                     , img.data[i + 2]
                     , colors
                     )
      );
    }
    return data;
  }

  // create a mosaic from file onto targetCanvas
  create(file, targetCanvas, colors = 16) {
    let context = targetCanvas.getContext('2d');

    context.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

    this.getImage(file).then((image) => {
      let targetSize = this.getTargetSize(image, targetCanvas);
      let mosaicDimensions = this.getMosaicDimensions(targetSize);
      let pixelMap = this.getPixelMap(mosaicDimensions, image, colors);
      let uniqueColors = unique(pixelMap.map((p) => p.color));
      let completeTiles = {};
      let currentRowIdx = 1, currentRow = pixelMap.filter((p) => p.y === currentRowIdx);
      let offset = {
        x: (targetCanvas.width - targetSize.x) / 2,
        y: (targetCanvas.height - targetSize.y) / 2
      };

      let currentRowIsComplete = () => !currentRow.some((r) => !completeTiles[r.color]);

      let drawAvailableRows = () => {
        if (!currentRowIsComplete()) {
          return;
        }
        currentRow.forEach((pixel) => {
          context.drawImage(completeTiles[pixel.color]
                           , offset.x + (pixel.x - 1) * TILE_WIDTH
                           , offset.y + (pixel.y - 1) * TILE_HEIGHT
                           );
        });
        currentRowIdx++;
        currentRow = pixelMap.filter((p) => p.y === currentRowIdx);
        if (!currentRow.length) {
          return;
        }
        drawAvailableRows();
      };

      // use async to download upto max 16 images at a time
      async.mapLimit(uniqueColors, 16, (color, callback) => {
        let img = new Image();
        img.src = 'color/' + color;
        img.onload = () => {
          completeTiles[color] = img;
          callback(false, image);
          drawAvailableRows();
        };
      }, drawAvailableRows);
    });
  }

  // get the largest dimensions that image can be drawn into targetCanvas
  // while maintaining aspect ratio
  getTargetSize(image, targetCanvas) {
    let aspectRatio = image.width / image.height,
        width = targetCanvas.width,
        height = targetCanvas.height;

    if (width / aspectRatio < height) {
      return {
        x: width,
        y: Math.floor(width / aspectRatio)
      };
    }

    return {
      x: Math.floor(height * aspectRatio),
      y: Math.floor(height)
    };
  }

  // get the mosaic dimensions for a size
  getMosaicDimensions(size) {
    return {
      x: Math.ceil(size.x / TILE_WIDTH),
      y: Math.ceil(size.y / TILE_HEIGHT)
    };
  }
}
