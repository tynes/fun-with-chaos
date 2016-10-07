class RandomSquare extends Chaos {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    const actions = {
      space: () => this.draw(),
      p: () => this.popImage(),
      c: () => this.clear(),
    }
    $('body').on('keyup', event => this.listeners(event, actions))
  }

  draw() {
    var x = Math.random() * (this.width - 100),
      y = Math.random() * (this.height - 100),
      w = 20 + Math.random() * 100,
      h = 20 + Math.random() * 100,
      r = Math.floor(Math.random() * 256),
      g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256);
    this.context.fillStyle = `rgb(${r},${g},${b})`;
    this.context.fillRect(x, y, w, h);
  }
}
