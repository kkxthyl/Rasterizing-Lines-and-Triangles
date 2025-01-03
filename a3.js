
import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw line

  let dx = parseFloat(x2-x1);
  let dy = parseFloat(y2-y1); 
  let distance; 

  if (Math.abs(dx) > Math.abs(dy)){
    distance = parseFloat(Math.abs(dx)); 
  }
  else{
    distance = parseFloat(Math.abs(dy));
  }

  let increaseX = parseFloat(dx / distance); 
  let increaseY = parseFloat(dy / distance); 
  let X = x1; 
  let X2 = x2;
  let Y = y1; 
  let Y2 = y2;

  //console.log("distance", distance);
  //console.log("r1 r2", v1, v2);

  for (let i = 0; i <= distance; i++){
    
    if (dy == 0){
      if (dx <= 0 ){
        let fraction = 1-(i/distance);
        this.setPixel(Math.floor(X2), Math.floor(Y), [r1 + ((r2 - r1) * fraction), g1 + ((g2 - g1) * fraction), b1 + ((b2 - b1) * fraction)]);
        //console.log("if if", X2, x1, fraction);
        X2 += Math.abs(increaseX); 
        Y += increaseY;
      }

      else{
        let fraction = i/distance;
        this.setPixel(Math.floor(X), Math.floor(Y), [r1 + ((r2 - r1) * fraction), g1 + ((g2 - g1) * fraction), b1 + ((b2 - b1) * fraction)]);
        //console.log("if else", X, x2);
        X += increaseX; 
        Y += increaseY;
      }
    }

    else{
      if (dy <= 0){
        let fraction = 1-(i/distance);
        this.setPixel(Math.floor(X), Math.floor(Y2), [r1 + ((r2 - r1) * fraction), g1 + ((g2 - g1) * fraction), b1 + ((b2 - b1) * fraction)]);
        //console.log("else if", Y2, y1);
        X += increaseX;
        Y2 -= increaseY;
      }

      else{
        let fraction = i/distance;
        this.setPixel(Math.floor(X),  Math.floor(Y), [r1 + ((r2 - r1) * fraction), g1 + ((g2 - g1) * fraction), b1 + ((b2 - b1) * fraction)]);
        //console.log("else else", Y, y2, 1-fraction);
        X += increaseX;
        Y += increaseY;
      }

    }
    
  }
  
}


// take 3 vertices defining a solid triangle and rasterize to framebuffer
Rasterizer.prototype.drawTriangle = function(v1, v2, v3) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;

  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw triangle

  //create bounding box for pixel testing 
  const xmin = Math.ceil(Math.min(x1, x2, x3));
  const xmax = Math.ceil(Math.max(x1, x2, x3));
  const ymin = Math.ceil(Math.min(y1, y2, y3));
  const ymax = Math.ceil(Math.max(y1, y2, y3));


  //for each pixel in the box, test to see if it is inside the triangle 
  for (let i = xmin; i <= xmax; i++){
    for (let j = ymin; j <= ymax; j++){

      let p = [i, j];
      if (this.pointIsInsideTriangle(v1, v2, v3, p)){
        //console.log("in");
        this.barycentricCoordinates(v1, v2, v3, p); 
      }
      else{
        //console.log("out");
      }

    }
  }
  
  this.drawLine(v1, v2); 
  this.drawLine(v2, v3);
  this.drawLine(v1, v3);
  
}

Rasterizer.prototype.barycentricCoordinates = function(v1,v2,v3,p){

  const [x0, y0, [r1, g1, b1]] = v1;
  const [x1, y1, [r2, g2, b2]] = v2;
  const [x2, y2, [r3, g3, b3]] = v3;
  const [px,py] = p;

  /*
  let a0 = (y1-y0)*px + (x0-x1)*py + (x0*y1 - x1*y0);
  let a1 = (y2-y1)*px + (x1-x2)*py + (x1*y2 - x2*y1);
  let a2 = (y0-y2)*px + (x2-x0)*py + (x0*y2 - x2*y0);
  */

  let a0 = Math.abs((px*(y1-y2) + x1*(y2-py) + x2*(py-y1))/2);
  let a1 = Math.abs((px*(y0-y2) + x0*(y2-py) + x2*(py-y0))/2);
  let a2 = Math.abs((px*(y1-y0) + x1*(y0-py) + x0*(py-y1))/2);

  let area = a0+a1+a2;

  console.log(a0, a1, a2, area); 

  let u = a0/area; 
  let v = a1/area; 
  let w = a2/area; 

  let pr = (u*r1) + (v*r2) + (w*r3); 
  let pg = (u*g1) + (v*g2) + (w*g3); 
  let pb = (u*b1) + (v*b2) + (w*b3); 

  this.setPixel(Math.floor(px), Math.floor(py), [pr, pg, pb]);
}



Rasterizer.prototype.pointIsInsideTriangle = function(v1,v2,v3,p) {
  const [x0, y0, [r1, g1, b1]] = v1;
  const [x1, y1, [r2, g2, b2]] = v3;
  const [x2, y2, [r3, g3, b3]] = v2;
  const [px,py] = p;
  
  /*
  let w1Top = x0*(y2-y0) + (py - y0)*(x2-x0) - px*(y2-y0); 
  let w1Bot = (y1-y0)*(x2-x0) - (x1-x0)*(y2-y0); 
  let w1 = w1Top / w1Bot; 

  let w2Top = py - y0 - w1*(y1-y0); 
  let w2Bot = y2-y0; 
  let w2 = w2Top / w2Bot; 
  */

  let w1 =   (x0*(y2-y0) + (py - y0)*(x2-x0) - px*(y2-y0)) / ((y1-y0)*(x2-x0) - (x1-x0)*(y2-y0));
  let w2 = (py - y0 - w1*(y1-y0)) / (y2-y0);
  
  if ((w1 >= 0) && (w2 >= 0) && (w1 +w2 <= 1)){
    return true; 
  }

  return false; 
  
}

////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  
  "v,5,5,0.5,0.1,0.7;",
  "v,58,55,0.1,0.0,1.0;",
  "v,5,55,0.0,0.0,0.0;",
  "v,58,5,0.0,0.0,0.0;",
  "t,0, 1, 2;",
  "t,0, 1, 3;",
  
  "v,15,45,1.0,1.0,1.0;",
  "v,25,45,1.0,1.0,1.0;",
  "v,30,28,0.0,0.0,0.8;",
  "t,6,4,5;",

  "v,50,45,1.0,1.0,1.0;",
  "v,40,45,1.0,1.0,1.0;",
  "v,35,28,0.0,0.0,0.8;",
  "t,9,7,8;",

  "v,32,20,0.6,0.6,0.6;",
  "v,32,35,0.3,0.0,0.0;",
  "l,10,11;",

  "v,28,12,0.0,0.0,0.0;",
  "v,28,35,0.0,0.0,0.0;",
  "l,12,13;",

  "v,36,12,0.0,0.0,0.0;",
  "v,36,35,0.0,0.0,0.0;",
  "l,14, 15;",

  "v,32,30,0.0,0.0,0.8;",
  "v,38,8,0.3,0.0,0.0;",
  "v,25,8,0.3,0.0,0.0;",
  "t,18,16,17;",
  

  /*
  original:
  "v,10,10,1.0,0.0,0.0;",
  "v,52,52,0.0,1.0,0.0;",
  "v,52,10,0.0,0.0,1.0;",
  "v,10,52,1.0,1.0,1.0;",
  "t,0,1,2;",
  "t,0,3,1;",
  "v,10,10,1.0,1.0,1.0;",
  "v,10,52,0.0,0.0,0.0;",
  "v,52,52,1.0,1.0,1.0;",
  "v,52,10,0.0,0.0,0.0;",
  "l,4,5;",
  "l,5,6;",
  "l,6,7;",
  "l,7,4;"
  */
].join("\n");


// DO NOT CHANGE ANYTHING BELOW HERE
export { Rasterizer, Framebuffer, DEF_INPUT };
