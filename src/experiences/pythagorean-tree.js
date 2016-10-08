class PythangoreanTree extends Chaos {
  constructor() {
    super();
    this.maxDepth = 0;
    this.angle = Math.PI / 4;
    this.baseSize = 0;
    this.initialize();
  }
  initialize() {
    this.baseSize = this.height * .2;
    this.draw();
    const actions = {
      space: () => { this.maxDepth++; this.draw() },
      p: () => { this.popImage() },
      c: () => {},
    }
    $('body').on('keyup', event => this.listeners(event, actions));
  }
  draw() {
    this.clear();
    this.context.lineWidth = 2;
    this.context.save();
    this.context.translate(this.width * 0.5, this.height * 0.9);
    // move a bit to the left
    // to ensure the tree is centered
    this.context.translate(-this.baseSize / 2, 0);
    this.drawPyTree(this.maxDepth, this.baseSize, 0);
    this.context.restore();
  }
  drawPyTree(depth, size) {
    this.context.save();
    // draw trunk
    this.drawSquare(size);
    // calculate sizes of two branches
    var branch0Size = size * Math.cos(this.angle);
    var branch1Size = size * Math.sin(this.angle);
    // move to top left of big square.
    // rotate and draw branch 0
    this.context.translate(0, -size);
    this.context.rotate(-this.angle);
    if(depth === 0) {
      this.drawSquare(branch0Size);
    } else {
      this.drawPyTree(depth - 1, branch0Size);
    }
    // move to bottom right of branch 0
    // rotate 90 and draw branch 1
    this.context.translate(branch0Size, 0);
    this.context.rotate(Math.PI / 2);
    if(depth === 0) {
      this.drawSquare(branch1Size);
    } else {
      this.drawPyTree(depth - 1, branch1Size);
    }
    this.context.restore();
  }
  drawSquare(size) {
    this.context.beginPath();
    this.context.rect(0, 0, size, -size);
    this.context.fill();
  }
}
