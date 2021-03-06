import { RecyclePool } from 'memop';

const _clearColor = [0, 0, 0, 1];

class Base {
  /**
   * @param {gfx.Device} device
   * @param {Object} opts
   */
  constructor(device, opts) {
    this._device = device;
    this._opts = opts;
    this._stage2fn = {};

    this._drawItemsPools = new RecyclePool(() => {
      return {
        model: null,
        node: null,
      };
    }, 100);
  }

  _registerStage(name, fn) {
    this._stage2fn[name] = fn;
  }

  _reset() {
    this._drawItemsPools.reset();
  }

  _render(view, scene) {
    const device = this._device;
    let stage = view._stages[0];

    // reset transform to camera
    let ctx = device._ctx;
    let mat = camera._viewProj;
    ctx.setTransform(mat.m00, mat.m01, mat.m04, mat.m05, mat.m12, mat.m13);
    device.setViewport(0, 0, camera._rect.w, camera._rect.h);
    device.clear(_clearColor);

    // get all draw items
    let allDrawItems = this._drawItemsPools.alloc();
    allDrawItems.reset();

    for (let i = 0; i < scene._models.length; ++i) {
      let model = scene._models.data[i];
      let drawItem = allDrawItems.add();
      model.extractDrawItem(drawItem);
    }

    // render only the default stage
    let fn = this._stage2fn[stages[0]];
    fn(view, allDrawItems);
  }

  _draw(item) {
    const device = this._device;
    const ctx = device._ctx;

    item.model.draw(ctx);
  }
}

export default {
  Base
};