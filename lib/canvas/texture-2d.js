export default class Texture2D {

  /**
   * @constructor
   * @param {Device} device
   * @param {Object} options
   * @param {Array} options.images
   * @param {Number} options.width
   * @param {Number} options.height
   */
  constructor(device, options) {
    this._device = device;
    
    this._width = 4;
    this._height = 4;

    this._image = null;

    if (options) {
      if (options.width !== undefined) {
        this._width = options.width;
      }
      if (options.height !== undefined) {
        this._height = options.height;
      }

      if (options.images && options.images[0]) {
        let ops = {
          image: options.images[0]
        };
        this.updateImage(ops);
      }
    }
  }

  update (options) {
    this.updateImage(options);
  }

  updateImage(options) {
    if (options.image && options.image !== this._image) {
      this._image = options.image;
    }
  }

  destroy () {
    this._image = null;
  }
}