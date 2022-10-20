// these are the variables you can use as inputs to your algorithms
console.log(fxhash)   // the 64 chars hex number fed to your algorithm
// console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function 
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }

// this code writes the values to the DOM as an example
// const container = document.createElement("div")
// container.innerText = `
//   random hash: ${fxhash}\n
//   some pseudo random values: [ ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()},... ]\n
// `
//document.body.prepend(container)


let svg = document.querySelector("svg");
let ele = []
let elements = ['#blank', '#singleeye', '#eyenose', '#foot', '#hand', '#chest', '#boob','#d','#bikini'];
let elementsname = ['eyenose', 'foot', 'hand', 'chest','boob','d','bikini','singleeye', 'blank', 'blank', 'blank', 'blank'];
let x = parseInt(fxrand()*9)+3;
let y = 3;
if (x===3){y=parseInt(fxrand()*8)+4;} 
else{y=parseInt(fxrand()*9)+3;}
let viewBox = `0 0 ${210*x} ${210*y}`;
let colorbg = "#eee"; //whit
let colorfill = '#111'; //black
let color='white';
if(fxrand()<0.125){
  colorbg="#111";
  colorfill="#eee";
  color='black';
}
let blankcount = 0;
let sumofus = 0;
let eletype = 8;

window.onload = function(){
  init();
}

function init() {
    elements.map(function(selector) {
    var ref = selector.replace(/[\.#]/g, '');
    ele[ref] = document.querySelector(selector);
  })

  svg.setAttribute('viewBox', viewBox);
  svg.style.background = colorbg;

  if(x===3||y===3){ 
    if(x+y<9){
      eletype = 8; //one blank 
    }else{eletype = 9};
  
  }else{  eletype = 12; //4 blank
  }
  genparts();
  console.log(sumofus);

}
function eyeopen(){
 
  svg.querySelectorAll('.gen .iris').forEach(element => {
     element.setAttribute('visibility','visible');
  });
  svg.querySelectorAll('.gen .eyeline').forEach(element => {
     element.setAttribute('visibility','hidden');
    });
  svg.querySelectorAll('.gen .pupil').forEach(element => {
    element.setAttribute('visibility','visible');
  });
}

function eyeclose(){
 
  svg.querySelectorAll('.gen .iris').forEach(element => {
    element.setAttribute('visibility','hidden');
 });
 svg.querySelectorAll('.gen .eyeline').forEach(element => {
    element.setAttribute('visibility','visible');
   });
 svg.querySelectorAll('.gen .pupil').forEach(element => {
   element.setAttribute('visibility','hidden');
 });
}


function genparts(){

  for(let i = 1 ;i<x-1 ; i++){
    for(let j = 1; j<y-1; j++){
        if(blankcount/((x-2)*(y-2))>0.66){
        eletype=8;
      }
      let newbodypart = ele[elementsname[parseInt(fxrand()*eletype)]].cloneNode(true);
      let dx = 210*i;
      let dy = 210*j
      let rotate = 90*parseInt(fxrand()*4);
      let sx =1 , sy = 1;
      let cx = 105, cy = 105;
      let sdx = 0, sdy = 0;
      if (fxrand()<0.5){sx=-1; sdx = cx*(1-sx)  }
      if (fxrand()<0.5){sy=-1; sdy = cy*(1-sy) }
      newbodypart.setAttribute('transform',`translate(${dx},${dy}) rotate(${rotate} ${cx} ${cy}) matrix(${sx} 0 0 ${sy} ${sdx} ${sdy})`);
      newbodypart.setAttribute('visibility','visible');
      newbodypart.setAttribute('class','gen');
      var allNodes = newbodypart.querySelectorAll('*');
      allNodes.forEach(function(subelement) {
        if(subelement.getAttribute('fill') !="none"){ subelement.setAttribute('fill', colorfill); }
        if(subelement.getAttribute('stroke') !="none"){ subelement.setAttribute('stroke', colorfill); }
    });
      svg.appendChild(newbodypart);

      if(newbodypart.getAttribute('id')=='blank'){
        blankcount++;
      }
      
    }
  }

}

let count = 0;
function animation(){
  if(count % 300 === 0){
     eyeclose();
   }
  if(count % 308 === 0){
     eyeopen();
     count = 0;
   }
  requestAnimationFrame(animation);
  count++;
}
animation();


window.$fxhashFeatures = {
  "X": `${x-2}`,
  "Y": `${y-2}`,
  "color": `${color}`
}