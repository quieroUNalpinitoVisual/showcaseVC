let dim= 3;
let cube 
const width = 600;
const height = 600;
var easycam;

function make3DArray(x,y,z){
  let arr = new Array(x);
  for(let i=0; i<arr.length; i++){
    arr[i] = new Array(y);
    for (let j=0; j< arr[i].lenght; j++){
      arr[i][j] = new Array(z);
    }
  }
  return arr;
}


function setup() {
  // fix for EasyCam to work with p5 v0.7.2
  Dw.EasyCam.prototype.apply = function(n){
    var o = this.cam;
    n = n || o.render,
    n && (this.getPosition(this.camEye),this.camLat = this.getCenter(this.camLat))
 
}}