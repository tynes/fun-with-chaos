class Koch extends Chaos {
  constructor() {
    super();
    this.maxDepth = 0;
    this.initialize();
  }
  initialize() {
    this.draw();
    const actions = {
      space: () => { this.maxDepth += 1; this.draw() },
      p: () => { this.popImage() },
    };
    $('body').on('keyup', event => this.listeners(event, actions));
  }
  draw() {
    var p0 = {
      x: this.width * 0.1,
      y: this.height * 0.75
    }
    var p1 = {
      x: this.width * 0.9,
      y: this.height * 0.75
    }

    this.clear();
    this.context.lineWidth = 2;
    this.koch(p0, p1, this.maxDepth);
  }
  koch(p0, p1, depth) {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    // the length of the main segment:
    const dist = Math.sqrt(dx * dx + dy * dy);
    // the length of each sub-segment:
    const unit = dist / 3;
    // the angle of the main segment:
    const angle = Math.atan2(dy, dx);
    let pa;
    let pb;
    let pc;
    // calculate the three intermediate points:
    pa = {
      x: p0.x + Math.cos(angle) * unit,
      y: p0.y + Math.sin(angle) * unit
    };
    pb = {
      x: pa.x + Math.cos(angle - Math.PI / 3) * unit,
      y: pa.y + Math.sin(angle - Math.PI / 3) * unit
    };
    pc = {
      x: p0.x + Math.cos(angle) * unit * 2,
      y: p0.y + Math.sin(angle) * unit * 2
    };
    if (depth === 0) {
      this.context.beginPath();
      this.context.moveTo(p0.x, p0.y);
      this.context.lineTo(pa.x, pa.y);
      this.context.lineTo(pb.x, pb.y);
      this.context.lineTo(pc.x, pc.y);
      this.context.lineTo(p1.x, p1.y);
      this.context.stroke();
    } else {
      this.koch(p0, pa, depth -1);
      this.koch(pa, pb, depth -1);
      this.koch(pb, pc, depth -1);
      this.koch(pc, p1, depth -1);
    } 
  }
}
