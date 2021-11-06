//상단바
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#topbar').outerHeight();

document.addEventListener('scroll', function() {

  didScroll = true;
  var ScrollValue = document.documentElement.scrollTop;

  if(600<ScrollValue){
    document.getElementById("topbar").style = "background-color: white;" ;
    document.getElementById("logo").src = "bjy_files/image/mainlogo_black.png" ;

    var parts = document.getElementsByClassName("Part");
    for ( var i=0; i<parts.length; i++ ){
      var  part = parts.item(i);
      part.style.color = "black";
    }
    
  }else{
    document.getElementById("topbar").style = "background-color: black" ;
    document.getElementById("logo").src = "bjy_files/image/mainlogo_white.png" ;
        
    var parts = document.getElementsByClassName("Part");
    for ( var i=0; i<parts.length; i++ ){
      var  part = parts.item(i);
      part.style.color = "white";
    }

  }
    
});

setInterval(function() {

    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }

}, 250);

function hasScrolled() {

  var st = $(this).scrollTop();
  if(Math.abs(lastScrollTop - st) <= delta) return;
  if (st > lastScrollTop && st > navbarHeight){
    $('#topbar').removeClass('nav-down').addClass('nav-up');
  } else {
    if(st + $(window).height() < $(document).height()) 
      $('#topbar').removeClass('nav-up').addClass('nav-down');
  }
  lastScrollTop = st;

}

//캔버스

var width = window.innerWidth,
  height = window.innerHeight,
  stars = createStars(width, height, 75),
  canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
let counter = 0, time = 0;

window.onresize = function() {
  history.go(0);
}

//별
function random(max) {
  return Math.floor(Math.random() * max);
}

function createStars(width, height, spacing) {

  const stars = [];

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const star = {
        x: x + random(spacing),
        y: y + random(spacing),
        r: Math.random() * 1.0
      };
      stars.push(star);
    }
  }
  return stars;

}

function fillCircle(ctx, x, y, r, fillStyle) {

  ctx.beginPath(),
  ctx.fillStyle = fillStyle,
  ctx.arc(x, y, r, 0, Math.PI * 2),
  ctx.fill();

}

function getOpacity(factor) {

  const opacityIncrement = 0.6 * Math.abs(Math.sin(factor)),
    opacity = 0.1 + opacityIncrement;
  return opacity;

}

function render() {

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  stars.forEach(function (star, i) {
    const factor = counter * i,
        x = star.x,
        y = star.y,
        opacity = getOpacity(factor),
        randomColor = Math.floor((Math.random()*360)+1);
    fillCircle(ctx, x, y, star.r, `hsla(${randomColor}, 20%, 80%)`); 
  });

  counter++;
  requestAnimationFrame(render);

}

function newY(x) {
  return Math.pow(x - width / 2, 2) / 9000 + height / 2 + 1
}

canvas.width = width,
canvas.height = height,
render();
