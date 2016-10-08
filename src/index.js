$(() => {
  // initialize application here
  $('#random-square').addClass('selected');
  var current = new RandomSquare();

  const renderView = (current, next) => {
    current.remove();
    current = new next();
  };

  const handleSelect = e => {
    $('.selected').removeClass('selected');
    $(e.target).addClass('selected');
  };

  const updateView = (current, next, context) => {
    handleSelect(context);
    renderView(current, next);
  }

  $('#random-square').click(e => updateView(current, RandomSquare, e));
  $('#sierpinski').click(e => updateView(current, Sierpinksi, e));
  $('#koch').click(e => updateView(current, Koch, e));
  $('#simple-shape').click(e => updateView(current, SimpleShape, e));
  $('#basic-tree').click(e => updateView(current, BasicTree, e));
});
