class Chaos {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.setSize(window.innerWidth, window.innerHeight);
  }
  setSize(width, height) {
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
  }
  clear(color) {
    if (color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.width, this.height);
    } else {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  }
  listeners(event, actions) {
    const { space, p, c } = actions;
    switch(event.keyCode) {
      case 32: // space
        space();
        break;
      case 80: // p
        p();
        break;
      case 67: // c
        c();
      default:
        break;
    }
  };
  remove() {
    const navigation = $('#navigation').clone(true);
    const copy = $(document.body).clone();
    $(copy).children().remove('#navigation');
    $(copy).prepend(navigation);
    $(document.body).remove();
    copy.insertAfter($('head'));
  }
  popImage() {
    let win = window.open('', 'Canvas Image')
    let src = this.canvas.toDataURL('image/png');
    win.document.write(`<img src=${src} width=${this.width} height=${this.height} />`)
  }
}
