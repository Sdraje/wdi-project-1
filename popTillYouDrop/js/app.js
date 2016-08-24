var game = game || {};

$(document).ready(init);

function init(){
  game.$newHighScore   = $('#newHighScore').val('');
  game.$pause          = $('#timer').on('click', game.pause);
  game.$pop            = $('body').on('mouseover', '.bubbles', game.popBubble);
  game.$bubbles        = $('.bubbles');
  game.$main           = $('main');
  game.$score          = $("#score");
  game.$timer          = $("#timer");
  game.defaultSeconds  = 30;
  game.numberOfBubbles = 30;
  game.startScore      = 0;

  // game.rideOfTheValkyries();
  game.swanLake();
  game.openCan();
  game.createModal("startModal");
  game.setupModalEvents();
};

game.createModal = function startModal(id){
  var modal = $('[data-remodal-id='+id+']').remodal();
  modal.open();
  $('#newHighScore').focus();
}

game.setupModalEvents = function setupModalEvent(){
  $(document).on('confirmation', '.remodal', function () {
    game.$newHighScore   = $('#newHighScore').val();
    if (game.$newHighScore.length > 1){
    $('#high-scores').append('<li>' + game.$newHighScore + " " + game.score + '</li>');
    $('#newHighScore').val('');
  }
    game.startCountdown();
    game.startMakingBubbles();
  });
}

game.startMakingBubbles = function startMakingBubbles(){
  game.score = game.startScore;
  game.$score.html("SCORE " + game.score)

  game.bubbleInterval = setInterval(function(){
    if (game.over)

    game.$bubbles = $('.bubbles');
    if (game.$bubbles.length > game.numberOfBubbles) return;
    
    game.createBubble();
    $.each(game.$bubbles, game.animateBubble);
  }, 500);
};

game.stopMakingBubbles = function startMakingBubbles(){
  game.$bubbles       = [];
  game.bubbleInterval = clearInterval(game.bubbleInterval);
}

// Explode bubble
game.popBubble = function popBubble () {
  game.score += parseInt($(this).attr('value'));
  game.$score.html("SCORE " + game.score);

  var bubblePop = new Audio("sounds/bubblePop.mp3");
  bubblePop.play();
  $(this).remove();
}

/*
 * Animating the movement of the div
 */
game.animateBubble = function animateBubble(i, bubble){
  $(bubble).attr('value', $(bubble).attr('value')-1);
  $(bubble).html($(bubble).attr('value'));

  if ($(bubble).attr('value') <= 0){
    var bubblePop = new Audio("sounds/bubblePop.mp3");
    bubblePop.play();
    $(this).remove();
    return;
  };

  var newq = game.makeNewPosition();
  var oldq = $(bubble).offset();
  var speed = game.calcSpeed([oldq.top, oldq.left], newq);
  
  $(bubble).animate({ top: newq[0], left: newq[1] }, speed, function(){
    if (game.$bubbles.length === 0) return;  
  });
};

/*
 * Create a new start position to place a bubble
 */
game.makeNewPosition = function makeNewPosition(){
  var h  = game.$main.height() - 50;
  var w  = game.$main.width() - 50;
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
  $newBubble      = $('<button />', {"class": 'bubbles', 'value': 10});
  $newBubble.css({'top':newPosition[0]+'px', 'left':newPosition[1]+'px'}).appendTo(game.$main);
  $newBubble.html($newBubble.attr('value'))
}

game.startCountdown = function(){
  game.seconds = game.defaultSeconds;
  game.$timer.html(game.seconds + ' SECONDS LEFT')

  game.countdown = setInterval(function(){
    game.seconds--
    game.$timer.html(game.seconds + ' SECONDS LEFT')
    if (game.seconds <= 0) return game.over();
  }, 1000)
}

game.clearCountdown = function(){
  game.countdown = clearInterval(game.countdown);
}

game.over = function () {
  game.clearCountdown();
  game.stopMakingBubbles();
  game.$main.empty();
  game.createModal("endModal");
  }

game.swanLake = function swanLake(){
  var swanLake = new Audio ("sounds/swanLake.mp3");
  swanLake.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  swanLake.play();
}

// game.rideOfTheValkyries = function rideOfTheValkyries(){
//   var rideOfTheValkyries = new Audio ('sounds/rideOfTheValkyries.mp3');
//   rideOfTheValkyries.addEventListener('ended', function(){
//     this.currentTime = 0;
//     this.play();
//   }, false);
//   rideOfTheValkyries.play();
// }

game.openCan = function openCan(){
  var canOpen = new Audio ("sounds/canOpen.mp3");
  canOpen.play();
}

game.pause = function pause(){
  alert('Paused!');
}