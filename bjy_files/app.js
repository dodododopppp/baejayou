//상단바
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#topbar').outerHeight();

//캔버스
var width = window.innerWidth,
  height = 140+(window.innerWidth)*(297/1000),
  stars = createStars(width, height, 75),
  canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
let counter = 0, time = 0;


document.addEventListener('scroll', function() {

  didScroll = true;
  var ScrollValue = document.documentElement.scrollTop;

  if(height<ScrollValue){
    document.getElementById("topbar").style = "background-color: white;" ;
    document.getElementById("logo").src = "bjy_files/image/mainlogo_black.png" ;

    var parts = document.getElementsByClassName("Part");
    for ( var i=0; i<parts.length; i++){
      var part = parts.item(i);
      part.style.color = "black";
    }
    
  }else{
    document.getElementById("topbar").style = "background-color: rgba(0, 0, 0, 0.8);" ;
    document.getElementById("logo").src = "bjy_files/image/mainlogo_white.png" ;
        
    var parts = document.getElementsByClassName("Part");
    for ( var i=0; i<parts.length; i++ ){
      var part = parts.item(i);
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
  if(width>=1000){
    document.getElementById("archiving_github").style =
      "display:inline-block; width:40%; height:410px; margin:20px 5% 75px 7%;";
    document.getElementById("archiving_blog").style =
      "display:inline-block; width:40%; height:410px; margin:20px 7% 75px 0;";
  }else{
    document.getElementById("archiving_github").style =
      "margin:50px auto; width:80%; height:410px;";
    document.getElementById("archiving_blog").style =
      "margin:50px auto; width:80%; height:410px;";
  }

  if(width>=1250) document.getElementById("aboutpart").style.paddingLeft = (width-1080)/3 + "px";
  else if(width>=815) document.getElementById("aboutpart").style.paddingLeft = (width-720)/2 + "px";
  else document.getElementById("aboutpart").style.paddingLeft = (width-360)/2 + "px";
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

//슬라이드

let slider = document.querySelector(".slider")
let innerSlider = document.querySelector(".slider-inner")
let pressed = false
let startx
let x

var flag = 1;
var Projectimg = document.getElementsByClassName("projectimg");
for (var i = 0; i < Projectimg.length; i++) {
  Projectimg[i].addEventListener('mouseover',  function() {
    console.log(0);
    flag = 0;
  });
  Projectimg[i].addEventListener('mouseout',  function() {
    console.log(1);
    flag = 1;
  });
}

slider.addEventListener("mousedown", e => {
  if(!flag)return;
  pressed = true
  startx = e.offsetX - innerSlider.offsetLeft
  slider.style.cursor = "grabbing"
})

slider.addEventListener("mouseenter", () => {
  if(!flag)return;
  slider.style.cursor = "grab"
})

slider.addEventListener("mouseup", () => {
  if(!flag)return;
  slider.style.cursor = "grab"
})

window.addEventListener("mouseup", () => {
  if(!flag)return;
  pressed = false
})

slider.addEventListener("mousemove", e => {
  if(!flag)return;
  if (!pressed) return
  e.preventDefault()
  x = e.offsetX

  innerSlider.style.left = `${x - startx}px`
  checkboundary()
})

function checkboundary() {
  let outer = slider.getBoundingClientRect()
  let inner = innerSlider.getBoundingClientRect()

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0px"
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`
  }
}
