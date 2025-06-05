import {Node} from '../core/node.js';
import {Primitive} from '../core/primitive.js';
import {Material} from '../core/material.js';
import {BoxBuilder} from '../geometry/box-builder.js';
// import {TextureLoader} from '../../util/texture-loader.js';

export class CardNode extends Node {
  /**
   * Creates a card (flat box) node.
   * @param {Object} options
   * @param {number} [options.width=1]
   * @param {number} [options.height=1.5]
   * @param {number} [options.depth=0.05]
   * @param {Array|number} [options.color=[1,1,1,1]] - RGBA color or hex
   * @param {string} [options.texture=null] - URL to texture image
   */
  constructor({
    width = 1,
    height = 1.5,
    depth = 0.05,
    color = [1, 1, 1, 1],
    position = [0, 0, 0]
  } = {}) {
    super();

    // Build box geometry
    const builder = new BoxBuilder(width, height, depth);
    const primitive = new Primitive(builder);

    // Create material
    let matOptions = {};
    matOptions.baseColorFactor = color;
    
    const material = new Material(matOptions);

    primitive.material = material;
    this.addPrimitive(primitive);

    // Set position
    this.translation = position;
  }
}

export default CardNode;