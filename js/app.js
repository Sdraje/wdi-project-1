$(document).ready(function(){
    animateDivA();
    animateDivB();
    $pop = $('div').on('click', popBubble);
});

function popBubble () {
this.remove();
}

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDivA(){
    var newq = makeNewPosition();
    var oldq = $('.a').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.a').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDivA();        
    });
    
};

function animateDivB(){
    var newq = makeNewPosition();
    var oldq = $('.b').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.b').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDivB();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}