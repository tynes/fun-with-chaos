class BasicTree extends Chaos {
  constructor() {
    super();
    this.maxDepth = 0;
    this.angles = [
        -Math.PI / 4,
        Math.PI / 4
      ];
    this.baseSize = 0;
    this.initialize();
  }
  initialize() {
    this.baseSize = this.height * .8;
    this.draw();
    const actions = {
      space: () => { this.maxDepth++; this.draw() },
      p: () => { this.popImage() },
      c: () => {},
    };
    $('body').on('keyup', event => this.listeners(event, actions));
  }
  draw() {
    this.clear();
    this.context.save();
    this.context.translate(this.width * 0.5, this.height * 0.9);
    this.drawTree(this.maxDepth, this.baseSize, 0);
    this.context.restore();
  }
  drawTree(depth, size, angle) {
    // draw trunk
    this.context.save();
    this.context.rotate(angle);
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -size / 2);
    this.context.stroke();
    this.context.translate(0, -size / 2);
    if(depth === 0) {
      // we're done. draw branches.
      this.drawBranch(size / 2, this.angles[0]);
      this.drawBranch(size / 2, this.angles[1]);
    } else {
      // more iteration to be done.
      // draw two mini trees instead of branches.
      this.drawTree(depth - 1, size / 2, this.angles[0]);
      this.drawTree(depth - 1, size / 2, this.angles[1]);
  }
    this.context.restore();
  }
  drawBranch(size, angle) {
    this.context.save();
    this.context.rotate(angle);
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -size);
    this.context.stroke();
    this.context.restore();
  }
}
