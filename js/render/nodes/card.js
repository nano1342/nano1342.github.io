import Node from '../node.js';

class CardNode extends Node {
    constructor({
        width = 1,
        height = 1.5,
        depth = 0.05,
        color = 0xffffff,
        texture = null,
        position = { x: 0, y: 0, z: 0 }
    } = {}) {
        super();

        // Create geometry and material
        const geometry = new THREE.BoxGeometry(width, height, depth);
        let material;
        if (texture) {
            const tex = new THREE.TextureLoader().load(texture);
            material = new THREE.MeshBasicMaterial({ map: tex });
        } else {
            material = new THREE.MeshBasicMaterial({ color });
        }

        // Create mesh
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, position.y, position.z);

        // Add mesh to this node's object3D
        this.object3D.add(this.mesh);
    }
}

export default CardNode;