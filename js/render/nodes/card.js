import {Node} from '../core/node.js';
import {Primitive} from '../core/primitive.js';
import {Material} from '../core/material.js';
import {BoxBuilder} from '../geometry/box-builder.js';
// import {TextureLoader} from '../../util/texture-loader.js';
import {PrimitiveStream} from '../geometry/primitive-stream.js';
import {PbrMaterial} from '../materials/pbr.js';
import {SevenSegmentText} from './seven-segment-text.js';

export class CardNode extends Node {
  constructor() {
    super();
    this._textureSize = 1; // Add this line to set a default size
    this._sevenSegmentNode = new SevenSegmentText();
    // Hard coded because it doesn't change:
    // Scale by 0.075 in X and Y
    // Translate into upper left corner w/ z = 0.02
    this._sevenSegmentNode.matrix = new Float32Array([
      0.075, 0, 0, 0,
      0, 0.075, 0, 0,
      0, 0, 1, 0,
      -0.3625, 0.3625, 0.02, 1,
    ]);
  }

  onRendererChanged(renderer) {
    let stream = new PrimitiveStream();
    let hs = this._textureSize * 0.5;
    stream.clear();
    stream.startGeometry();

    stream.pushVertex(-hs,  hs, 0, 0, 0, 0, 0, 1);
    stream.pushVertex(-hs, -hs, 0, 0, 1, 0, 0, 1);
    stream.pushVertex( hs, -hs, 0, 1, 1, 0, 0, 1);
    stream.pushVertex( hs,  hs, 0, 1, 0, 0, 0, 1);

    stream.pushTriangle(0, 1, 2);
    stream.pushTriangle(0, 2, 3);



    stream.endGeometry();

    let primitive = stream.finishPrimitive(renderer);
    let material = new PbrMaterial();
    material.baseColorFactor.value = [0.9, 0.9, 0.9, 1]; // grey
    this._iconRenderPrimitive = renderer.createRenderPrimitive(
      primitive,
      material
    );
    this.addRenderPrimitive(this._iconRenderPrimitive);

    this.addNode(this._sevenSegmentNode);
    this._sevenSegmentNode.text = "ABCD";
  }
}

export default CardNode;