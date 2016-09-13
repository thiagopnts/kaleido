import {WebGLRenderer, MeshBasicMaterial, SphereGeometry, Mesh} from './three';

export default class Renderer {
  constructor(options) {
    Object.assign(this, options);
    this.renderer = new WebGLRenderer({antialias: false});
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    this.el = this.renderer.domElement;
  }

  setTexture(texture) {
    this.texture = texture;
    this.mesh = this.createMesh();
  }

  setSize(size) {
    this.height = size.height;
    this.width = size.width;
    this.renderer.setSize(size.width, size.height);
  }

  createMesh() {
    this.material = new MeshBasicMaterial({map: this.texture});
    this.geometry = new SphereGeometry(1, 50, 50);
    this.geometry.scale(-1, 1, 1);
    let mesh = new Mesh(this.geometry, this.material);
    return mesh;
  }

  destroy() {
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }

  render(scene, camera, needsUpdate) {
    if (!needsUpdate) return;
    this.renderer.render(scene, camera);
  }
}
