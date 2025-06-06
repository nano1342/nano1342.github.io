import {Node} from '../core/node.js';
import {Primitive} from '../core/primitive.js';
import {Material} from '../core/material.js';
import {BoxBuilder} from '../geometry/box-builder.js';
// import {TextureLoader} from '../../util/texture-loader.js';
import {PrimitiveStream} from '../geometry/primitive-stream.js';
import {PbrMaterial} from '../materials/pbr.js';

export class CardNode extends Node {
  constructor() {
    super();
    this._textureSize = 1; // Add this line to set a default size
  }

  onRendererChanged(renderer) {
    let stream = new PrimitiveStream();
    let hs = this._textureSize * 0.5;
    stream.clear();
    stream.startGeometry();

    stream.pushVertex(-hs, hs, 0, 0, 0, 0, 0, 1);
    stream.pushVertex(-hs, -hs, 0, 0, 1, 0, 0, 1);
    stream.pushVertex(hs, -hs, 0, 1, 1, 0, 0, 1);
    stream.pushVertex(hs, hs, 0, 1, 0, 0, 0, 1);

    stream.pushTriangle(0, 1, 2);
    stream.pushTriangle(0, 2, 3);

    stream.endGeometry();

    let iconPrimitive = stream.finishPrimitive(renderer);
    let boxMaterial = new PbrMaterial();
    boxMaterial.baseColorFactor.value = [0.9, 0.9, 0.9, 1]; // grey
    this._iconRenderPrimitive = renderer.createRenderPrimitive(
      iconPrimitive,
      boxMaterial
    );
    this.addRenderPrimitive(this._iconRenderPrimitive);
  }
}

export default CardNode;