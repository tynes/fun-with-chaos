class Sierpinksi extends Chaos {
  constructor() {
    super();
    this.size;
    this.maxDepth = 0;
    this.initialize();
  }
  initialize() {
    this.size = this.height * 0.5;
    this.draw();
    const actions = {
      space: () => { this.maxDepth += 1; this.draw() },
      p: () => { this.popImage() },
      c: () => { this.clear(); this.maxDepth = -1 }
    }
    $('body').on('keyup', event => this.listeners(event, actions));
  }
  draw() {
    this.clear();
    this.context.save();
    this.context.translate(this.width * 0.5,
                              this.height * 0.6);
    this.context.scale(this.size, this.size);
    this.drawTriangle(this.maxDepth);
    this.context.restore();
  }
  drawTriangle(depth) {
    var angle = -Math.PI / 2;
    if(depth === 0) {
      this.context.beginPath(); // move to top point of triangle 
      this.context.moveTo(Math.cos(angle),
                             Math.sin(angle));
      angle += Math.PI * 2 / 3;
      // draw line to lower right point
      this.context.lineTo(Math.cos(angle),
                             Math.sin(angle));
      // draw line to final point
      angle += Math.PI * 2 / 3;
      this.context.lineTo(Math.cos(angle), Math.sin(angle));
      // fill will close the shape
      this.context.fill();
    } else {
      // draw the top triangle
      this.context.save();
      this.context.translate(Math.cos(angle) * 0.5,
                                Math.sin(angle) * 0.5);
      this.context.scale(0.5, 0.5);
      this.drawTriangle(depth - 1);
      this.context.restore();
      // draw the lower right triangle
      angle += Math.PI * 2 / 3;
      this.context.save();
      this.context.translate(Math.cos(angle) * 0.5,
                                Math.sin(angle) * 0.5);
      this.context.scale(0.5, 0.5);
      this.drawTriangle(depth - 1);
      this.context.restore();
      // draw the lower left triangle
      angle += Math.PI * 2 / 3;
      this.context.save();
      this.context.translate(Math.cos(angle) * 0.5,
                                Math.sin(angle) * 0.5);
      this.context.scale(0.5, 0.5);
      this.drawTriangle(depth - 1);
      this.context.restore();
    }
  }
}