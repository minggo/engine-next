import { Pool } from 'memop';
import { vec2 } from 'vmath';

var _pool;
var _dataPool = new Pool(() => {
  return {
    x: 0.0,
    y: 0.0,
    u: 0.0,
    v: 0.0
  };
}, 128);

export default class RenderData {
  constructor () {
    this._data = [];

    this._pivotX = 0;
    this._pivotY = 0;
    this._width = 0;
    this._height = 0;

    this.vertexCount = 0;
    this.indiceCount = 0;

    this.uvDirty = true;
    this.vertDirty = true;
  }

  get dataLength () {
    return this._data.length;
  }

  set dataLength (length) {
    this._data.length = length;
    for (let i = 0; i < length; i++) {
      if (!this._data[i]) {
        this._data[i] = _dataPool.alloc();
      }
    }
  }

  updateSizeNPivot (width, height, pivotX, pivotY) {
    if (width !== this._width || 
        height !== this._height ||
        pivotX !== this._pivotX ||
        pivotY !== this._pivotY) 
    {
      this._width = width;
      this._height = height;
      this._pivotX = pivotX;
      this._pivotY = pivotY;
      this.vertDirty = true;
    }
  }
  
  static alloc () {
    return _pool.alloc();
  }

  static free (data) {
    if (data instanceof RenderData) {
      for (let i = data.length-1; i > 0; i--) {
        _dataPool.free(data._data[i]);
      }
      data._data.length = 0;
      data.uvDirty = true;
      data.vertDirty = true;
      _pool.free(data);
    }
  }
}

_pool = new Pool(() => {
  return new RenderData();
}, 32);