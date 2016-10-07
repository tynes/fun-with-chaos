$(() => {
  // invoke current function here
  var current = new Sierpinksi();

  const updateView = (current, next) => {
    current.remove();
    current = new next();
  }

  $('#random-square').click(() => updateView(current, RandomSquare));
  $('#sierpinski').click(() => updateView(current, Sierpinksi));

});
