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

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export class CardNode extends Node {
  constructor(title, text) {
    super();
    this.title = title;
    this.text = text;
  }

  

  _createTextTexture(title, text, size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#fff';

    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Draw title at the top (e.g., y = 10 for some padding)
    ctx.fillText(title, size / 2, 20);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    // Automatic text wrapping
    const maxWidth = size - 20; // padding of 10px on each side
    const lineHeight = 26;
    let x = 10;
    let y = 50;
    
    wrapText(ctx, text, x, y, maxWidth, lineHeight);

    // Create a WebGL texture from the canvas
    const texture = new THREE.Texture(canvas); // If using THREE.js
    texture.needsUpdate = true;
    return texture;
  }

  onRendererChanged(renderer) {

    let textTexture = this._createTextTexture(this.title, this.text);
    let dataUrl = textTexture.image.toDataURL();

    const someTextureURL = '../media/textures/eilenriede-park-2k.png';
    let quad = new QuadNode(dataUrl, 1, true);
    this.addNode(quad);
  }
}

export default CardNode;