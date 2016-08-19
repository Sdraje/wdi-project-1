// startGame

// Bubble constructor
// new Bubble(x, y, timer)

// pickRandomPlaceOnScreen

// createBubble

// animateBubble

// clickOnBubble

// popBubble

// increaseScore

// decreaseTimer

// decreaseBubbleTimer

// decreaseLives

// gameOver



















var game = game || {};

$(document).ready(init);

function init(){
  $pop                = $('body').on('click', '.a', popBubble);
  game.$DivA          = $('.a');
  $main               = $('main');
  game.score          = 0;

  game.changeInterval = function (){
    (game.$DivA.length*2000) + 1000
  }

  $.each(game.$DivA, animateDivA);

  setInterval(function(){
    game.$DivA = $('.a');
    if (game.$DivA.length > 9) return;

    var posx    = (Math.random() * ($main.width() - 50)).toFixed();
    var posy    = (Math.random() * ($main.height() - 50)).toFixed();
    $newDiv     = $('<div />', {"class": 'a', 'value': 10});
    game.$DivA  = $('.a');
    $newDiv.css({'left':posx+'px', 'top':posy+'px'}).appendTo($main);
    $newDiv.html($newDiv.attr('value'))
    // $pop        = game.$DivA.on('click', popBubble);
    
    $.each(game.$DivA, animateDivA);
  }, 1000);
};

function popBubble () {
  console.log('this value', $(this).attr('value'))
  game.score += parseInt($(this).attr('value'))
  console.log('gamescore', game.score)
  $('#score').html("SCORE " + game.score)
  $(this).remove();
}

/*
 * Create a new start position to place a bubble
 */
function makeNewPosition(){
  var h  = $('main').height() - 50;
  var w  = $('main').width() - 50;
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);
  
  return [nh,nw];        
}

/*
 * Animating the movement of the div
 */
function animateDivA(i, array){
  // Explode bubble
  setInterval(function(){
    $(array).attr('value', $(array).attr('value')-1);
    $(array).html($(array).attr('value'));

    if ($(array).attr('value') <= 0){
      $(array).remove(); 
    }
  }, 2000)
  
  // setTimeout (function(){$(array).remove()}, 10000)--------------working
  var newq = makeNewPosition();
  var oldq = $(array).offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);

  $(array).animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDivA(i, array);        
  });
};

function calcSpeed(prev, next) {
  var x             = Math.abs(prev[1] - next[1]);
  var y             = Math.abs(prev[0] - next[0]);
  var greatest      = x > y ? x : y;
  var speedModifier = 0.1;
  var speed         = Math.ceil(greatest/speedModifier);
  return speed;

}