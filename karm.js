
const canvas = document.querySelector ('canvas');
const c = canvas.getContext ('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionsMap= []
for (let i=0; i< collisions.length; i +=280){
   collisionsMap.push(collisions.slice(i, 280 + i))
}
class Boundary{
   static width=12
   static height=12
   constructor ({position}){
      this.position = position
      this.width = 12
      this.height= 12
   }
   draw(){
      c.fillStyle = 'rgba(255, 0, 0, 0.0)'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
   }c
}
const boundaries=[]
const offset= {
   x:-2000,
   y:-975
}
collisionsMap.forEach((row, i )=>{
   row.forEach((symbol, j ) =>{
      if(symbol>0)
      boundaries.push(new Boundary({position:{
         x: j * Boundary.width + offset.x,
         y: i * Boundary.height + offset.y
      }
   })
   )
 })
})
console.log(boundaries)

const image = new Image();
image.src ='./images/type5 (1).png';
const playerImage = new Image();
playerImage.src = './images/Front.PNG';
const playerUp = new Image();
playerUp.src = './images/Back.png';
const playerLeft = new Image();
playerLeft.src = './images/Left.png';
const playerRight = new Image();
playerRight.src = './images/Right.png';

class Sprite {
   constructor({ position, velocity, image, frames={max:1}, sprites}) {
      this.position= position;
      this.image = image;
      this.frames = {...frames, val:0, elasped:0};
      this.image.onload=()=>{
         this.width = this.image.width/this.frames.max;
         this.height = this.image.height
         
      }
      this.moving=false
      this.sprites=sprites
   }
   draw(){
      c.drawImage(
         this.image,
         this.frames.val*this.width,
         0,
         this.image.width/this.frames.max,
         this.image.height,
         this.position.x,
         this.position.y,
         this.image.width/this.frames.max,
         this.image.height
         );
         if(!this.moving) return
         if(this.frames.max>1){
            this.frames.elasped++
         }
         if(this.frames.elasped%10===0){
         if (this.frames.val<this.frames.max-1) this.frames.val++
         else this.frames.val=0
         }
      
   }
}
const player = new Sprite({
   position:{
      x: canvas.width/2 -370 /2, 
      y:canvas.height- 142/0.8
   },
   image: playerImage,
   frames:{
      max:4
   },
   sprites:{
      up: playerUp,
      left:playerLeft,
      right: playerRight,
      down: playerImage,
   }
})
const background = new Sprite ({
   position: {
    x:offset.x,
    y:offset.y
   },
   image: image

});


const keys = {
   w: {
      pressed:false
   },
   a: {
      pressed:false
   },
   s: {
      pressed:false
   },
   d: {
      pressed:false
   },
};
const knock1Button =document.getElementsByClassName("Knock1");
const modal =document.getElementsByClassName("popup");
const movables=[background,...boundaries,...modal]
function rectangularCollision({rectangle1, rectangle2 }){
return(rectangle1.position.x +player.width>=rectangle2.position.x 
    && rectangle1.position.x<=rectangle2.position.x+rectangle2.width
    && rectangle1.position.y<=rectangle2.position.y+rectangle2.height
    && rectangle1.position.y+player.height>= rectangle2 .position.y
)
}
 function animate(){
   window.requestAnimationFrame(animate);
   background.draw();
   boundaries.forEach(boundary =>{
    boundary.draw()
 })
      player.draw()
     let moving= true
     player.moving=false
       if (keys.w.pressed && lastKey==='w'){
         player.moving=true
         player.image=player.sprites.up
         for( let i= 0; i<boundaries.length; i++){
         const boundary= boundaries[i]
       if(
            rectangularCollision({
               rectangle1: player,
               rectangle2: {...boundary, position:{
                  x:boundary.position.x,
                  y:boundary.position.y+4
               }
            }
            })
         ) {
            console.log('colliding')
            moving= false
            break
         }
   }
   if(moving)
   movables.forEach(movable=>
      {movable.position.y+=4})
   }else if (keys.a.pressed && lastKey==='a'){
      player.moving=true
      player.image=player.sprites.left
      for( let i= 0; i<boundaries.length; i++){
         const boundary= boundaries[i]
       if(
            rectangularCollision({
               rectangle1: player,
               rectangle2: {...boundary, position:{
                  x:boundary.position.x+4,
                  y:boundary.position.y
               }
            }
            })
         ) {
            console.log('colliding')
            moving= false
            break
         }
   }
   if(moving)     
      movables.forEach(movable=>
         {movable.position.x+=4}
         )
   }
     else if (keys.s.pressed && lastKey==='s'){
      player.moving=true
      player.image=player.sprites.down
      for( let i= 0; i<boundaries.length; i++){
         const boundary= boundaries[i]
       if(
            rectangularCollision({
               rectangle1: player,
               rectangle2: {...boundary, position:{
                  x:boundary.position.x,
                  y:boundary.position.y-4
               }
            }
            })
         ) {
            console.log('colliding')
            moving= false
            break
         }
   }
   if(moving)
      movables.forEach(movable=>
         {movable.position.y-=4}
         )
   }
     else if (keys.d.pressed && lastKey==='d'){
      player.moving=true
      player.image=player.sprites.right
      for( let i= 0; i<boundaries.length; i++){
         const boundary= boundaries[i]
       if(
            rectangularCollision({
               rectangle1: player,
               rectangle2: {...boundary, position:{
                  x:boundary.position.x-4,
                  y:boundary.position.y
               }
            }
            })
         ) {
            console.log('colliding')
            moving= false
            break
         }
   }
   if(moving)
      movables.forEach(movable=>
         {movable.position.x-=4}
         )
   }
 }
 animate();
 
let lastKey =''
 window.addEventListener('keydown',(e)=>{
   console.log(e.key);
   switch(e.key){
      case'w':
      keys.w.pressed = true;
      lastKey='w';
      break;
      case'a':
      keys.a.pressed = true;
      lastKey='a';
      break;
      case's':
      keys.s.pressed = true;
      lastKey='s';
      break;
      case'd':
      keys.d.pressed = true;
      lastKey='d';
      break;
   }
 });

 window.addEventListener('keyup',(e)=>{
   console.log(e.key);
   switch(e.key){
      case'w':
      keys.w.pressed = false;
      break;
      case'a':
      keys.a.pressed = false;
      break;
      case's':
      keys.s.pressed = false;
      break;
      case'd':
      keys.d.pressed = false;
      break;
   };
 });
 
 