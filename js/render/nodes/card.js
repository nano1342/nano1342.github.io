import {Node} from '../core/node.js';
import {Primitive} from '../core/primitive.js';
import {Material} from '../core/material.js';
import {BoxBuilder} from '../geometry/box-builder.js';
// import {TextureLoader} from '../../util/texture-loader.js';
import {PrimitiveStream} from '../geometry/primitive-stream.js';
import {PbrMaterial} from '../materials/pbr.js';
import {SevenSegmentText} from './seven-segment-text.js';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { QuadNode } from './quad-texture.js';

export class CardNode extends Node {
  constructor() {
    super();
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

  _createTextTexture(text, size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size / 2, size / 2);

    // Create a WebGL texture from the canvas
    const texture = new THREE.Texture(canvas); // If using THREE.js
    texture.needsUpdate = true;
    return texture;
  }

  onRendererChanged(renderer) {

    let textTexture = this._createTextTexture('text texture');
    let dataUrl = textTexture.image.toDataURL();

    const someTextureURL = '../media/textures/eilenriede-park-2k.png';
    let quad = new QuadNode(dataUrl, 1, true);
    this.addNode(quad);

    this.addNode(this._sevenSegmentNode);
    this._sevenSegmentNode.text = "ABCD";
  }
}

export default CardNode;