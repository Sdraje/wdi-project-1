var game = game || {};

$(document).ready(init);

function init(){
  game.$pop           = $('body').on('click', '.bubbles', game.popBubble);
  game.$bubbles       = $('.bubbles');
  $main               = $('main');
  game.score          = 0;
  game.seconds        = 30;
  $('#score').html("SCORE " + game.score)
  $('#timer').html(game.seconds + ' SECONDS LEFT ')
  game.swanLake();
  game.interval();
};

game.interval = function interval (){
  setInterval(function(){
    if (game.$bubbles.length > 14) return;
    game.createBubble();
    game.$bubbles  = $('.bubbles');
    $.each(game.$bubbles, game.animateBubble);
  }, 500);
};

// Explode bubble
game.popBubble = function popBubble () {
  game.score += parseInt($(this).attr('value'))
  $('#score').html("SCORE " + game.score)
  var bubblePop = new Audio("sounds/bubblePop.mp3");
  bubblePop.play();
  $(this).remove();
}

/*
 * Animating the movement of the div
 */
 game.animateBubble = function animateBubble(i, array){
  $(array).attr('value', $(array).attr('value')-1);
  $(array).html($(array).attr('value'));

  if ($(array).attr('value') <= 0){
    var bubblePop = new Audio("sounds/bubblePop.mp3");
    bubblePop.play();
    $(array).remove()
    // game.$bubbles.splice(i, 1) --- need to remove bubbles from array (loop still counts them)
    return;
  };

  var newq = game.makeNewPosition();
  var oldq = $(array).offset();
  var speed = game.calcSpeed([oldq.top, oldq.left], newq);
  $(array).animate({ top: newq[0], left: newq[1] }, speed, function(){
    game.animateBubble(i, array);        
  });
};

/*
 * Create a new start position to place a bubble
 */
 game.makeNewPosition = function makeNewPosition(){
  var h  = $('main').height() - 50;
  var w  = $('main').width() - 50;
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);
  
  return [nh,nw];        
}

game.calcSpeed = function calcSpeed(prev, next) {
  var x             = Math.abs(prev[1] - next[1]);
  var y             = Math.abs(prev[0] - next[0]);
  var greatest      = x > y ? x : y;
  var speedModifier = 0.1;
  var speed         = Math.ceil(greatest/speedModifier);
  return speed;

}

game.createBubble = function (){
  var newPosition = game.makeNewPosition();
  $newBubble      = $('<button />', {"class": 'bubbles', 'value': 11});
  $newBubble.css({'top':newPosition[0]+'px', 'left':newPosition[1]+'px'}).appendTo($('main'));
  $newBubble.html($newBubble.attr('value'))
}

game.countdown = setInterval(function(){
  game.seconds--
  $('#timer').html(game.seconds + ' SECONDS LEFT')
  if (game.seconds <= 0) {game.over();}
}, 1000)

game.over = function () {
  var person = prompt ('Game over! Please enter your name:')
  $('#high-scores').append('<li>' + person + " " + game.score + '</li>')
  $('main').empty();
  game.score          = 0;
  game.seconds        = 30;
  $('#score').html("SCORE " + game.score)
  $('#timer').html(game.seconds + ' SECONDS LEFT')

}

game.swanLake = function swanLake(){
  var swanLake = new Audio ("sounds/swanLake.mp3");
  swanLake.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  swanLake.play();
}