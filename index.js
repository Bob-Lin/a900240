var cvs,
    ctx,
    mid = {
      x:0,
      y:0
    };


function Load()
{
  var body = document.getElementsByTagName('body')[0];
  
  body.style.margin = 0;
  body.style.padding = 0;
  body.style.overflow = 'hidden';
  
  cvs = document.createElement('Canvas');
  ctx = cvs.getContext('2d');
  
  body.appendChild(cvs);
  
  Resize();
}


function Draw()
{
  var blurAmt, x, y;
  
  DrawBackground();
  
  blurAmt = 1;
  
  for(x = -1; x < 2; x += 2)
  {
    for(y = -1; y < 2; y += 2)
    {
      DrawPlanet(0.2, x * blurAmt, y * blurAmt);
    }
  }
  
  blurAmt = 0.5;
  
  for(x = -1; x < 2; x += 2)
  {
    for(y = -1; y < 2; y += 2)
    {
      DrawPlanet(0.5, x * blurAmt, y * blurAmt);
    }
  }
  
  DrawPlanet(1);
}

function DrawBackground()
{
  ctx.fillStyle = 'rgb(18,19,22)';
  ctx.fillRect(0,0,cvs.width,cvs.height);
}

function DrawPlanet(alpha, offsetX, offsetY)
{  
  offsetX = (offsetX) ? offsetX : 0;
  offsetY = (offsetY) ? offsetY : 0;
  
  ctx.save();
  
  ctx.beginPath();
  
  var posX = offsetX + mid.x,
      posY = offsetY + mid.y,
      r = mid.x/4;
  
  ctx.arc(
    posX, 
    posY,
    r,
    0,
    Math.PI * 2  
  );
  
  ctx.closePath();
  
  console.log(posX, posY, r);
  
  ctx.clip();
  
  ctx.fillStyle = 'rgba(48,208,208,' + alpha + ')';
  ctx.fillRect(0,0,cvs.width,cvs.height);
  
  ctx.beginPath();
  
  ctx.moveTo(
    offsetX + mid.x - mid.x/4, 
    offsetY + mid.y - mid.x/4);
  ctx.bezierCurveTo(
    offsetX + mid.x - mid.x/4, offsetY + mid.y - mid.x/4, 
    offsetX + mid.x + mid.x/8, offsetY + mid.y - mid.x/8, 
    offsetX + mid.x, offsetY + mid.y);
  ctx.bezierCurveTo(
    offsetX + mid.x - mid.x/6, offsetY + mid.y + mid.x/8,
    offsetX + mid.x, offsetY + mid.y + mid.x/8,
    offsetX + mid.x - mid.x/4, offsetY + mid.y + mid.x/4);
  
  ctx.closePath();
  
  ctx.fillStyle = 'rgba(160,232,64,' + alpha + ')';
  ctx.fill();
  
  ctx.beginPath();
  
  ctx.moveTo(
    offsetX + mid.x + mid.x/4, 
    offsetY + mid.y - mid.x/8);
  ctx.bezierCurveTo(
    offsetX + mid.x + mid.x/16, offsetY + mid.y - mid.x/8, 
    offsetX + mid.x + mid.x/16, offsetY + mid.y, 
    offsetX + mid.x + mid.x/8, offsetY + mid.y + mid.x/16);
  ctx.bezierCurveTo(
    offsetX + mid.x + mid.x/4, offsetY + mid.y + mid.x/6,
    offsetX + mid.x, offsetY + mid.y + mid.x/6,
    offsetX + mid.x + mid.x/4, offsetY + mid.y + mid.x/4);
  
  ctx.closePath();
  
  ctx.fillStyle = 'rgba(160,232,64,' + alpha + ')';
  ctx.fill();  
  
  ctx.beginPath();
  
  ctx.moveTo(
    offsetX + mid.x - mid.x/4, 
    offsetY + mid.y - mid.x/4);
  ctx.bezierCurveTo(
    offsetX + mid.x + mid.x/32, offsetY + mid.y - mid.x/4.2, 
    offsetX + mid.x - mid.x/6, offsetY + mid.y - mid.x/4.8, 
    offsetX + mid.x, offsetY + mid.y - mid.x/4.8);
  ctx.bezierCurveTo(
    offsetX + mid.x + mid.x/16, offsetY + mid.y - mid.x/4.8,
    offsetX + mid.x + mid.x/4, offsetY + mid.y - mid.x/4.2,
    offsetX + mid.x + mid.x/6, offsetY + mid.y - mid.x/4);
  
  ctx.closePath();
  
  ctx.fillStyle = 'rgba(224,232,232,' + alpha + ')';
  ctx.fill();
  
  var grd = ctx.createLinearGradient(
    offsetX,
    offsetY + mid.y,
    cvs.width + offsetX,
    offsetY + mid.y + mid.x/16);
  
  grd.addColorStop(0, 'rgba(0,0,0,0.25)');
  grd.addColorStop(0.3, 'rgba(0,0,0,0.25)');
  grd.addColorStop(0.4, 'rgba(0,0,0,0)');
  grd.addColorStop(0.5, 'rgba(0,0,0,0.25)');
  grd.addColorStop(0.6, 'rgba(0,0,0,0.55');
  grd.addColorStop(0.7, 'rgba(0,0,0,0.75');
  
  ctx.fillStyle = grd;
  
  ctx.fillRect(0,0,cvs.width,cvs.height);
    
  ctx.restore();
}

function Resize()
{
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
  
  mid.x = cvs.width/2;
  mid.y = cvs.height/2;
  
  Draw();
}

window.addEventListener('resize', Resize, false);
window.addEventListener('load', Load, false);
