class SimpleShape extends Chaos {
  constructor() {
    super();
    this.maxDepth = 0;
    this.numShapes = 3;
    this.angles = [
      0,                // 0 degrees
      Math.PI * 2 / 3,  // 120 degrees
      Math.PI * 4 / 3   // 240 degrees
    ];
    this.size = 0;
    this.dist = 0;
    this.scaleFactor = .6;
    this.initialize();
  }
  initialize() {
    this.size = this.height / 8;
    this.dist = this.size * 1.5;
    this.draw();
    const actions = {
      space: () => { this.maxDepth += 1; this.draw(); },
      p: () => { this.popImage(); },
      c: () => { this.clear(); this.maxDepth = -1 },
    }
    $('body').on('keyup', event => this.listeners(event, actions));
  }
  draw() {
    this.clear();
    this.context.save();
    this.context.translate(this.width * 0.5, this.height * 0.5);
    this.drawShape();
    this.iterate(this.maxDepth);
    this.context.restore();
  }
  iterate(depth) {
    for (let i = 0; i < this.numShapes; i++) {
      this.context.save();
      this.context.rotate(this.angles[i]);
      this.context.translate(this.dist, 0);
      this.context.scale(this.scaleFactor, this.scaleFactor);
      this.drawShape();
      if (depth > 0) {
        this.iterate(depth - 1);
      }
      this.context.restore();
    }
  }
  drawShape() {
    this.context.fillStyle = "rgba(0, 0, 0, .5)";
    this.context.beginPath();
    this.context.arc(0, 0, this.size, 0, Math.PI * 2, false);
    this.context.fill();
  }
}
