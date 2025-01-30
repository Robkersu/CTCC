const main = document.getElementById('main');
let time = 0;
let myTimer = setInterval(mytime, 1);
let myTimer2 = setInterval(mainCircle, 650);
let isScaledUp = false;
let isHoveringMain = false;

main.addEventListener('mouseenter', () => {
  time = 0;
  isHoveringMain = true;

  main.style.transform = 'scale(1.05) translate(-50%, -50%)';
  isScaledUp = !isScaledUp;
});

main.addEventListener('mouseleave', () => {
  time = 0;
  isHoveringMain = false;

  main.style.transform = 'scale(1.0) translate(-50%, -50%)';
  isScaledUp = !isScaledUp;
});

function mytime(){
  time++;
}

function mainCircle(){
  if(!isHoveringMain && time > 350){
    if (isScaledUp) {
      main.style.transform = 'scale(1.0) translate(-50%, -50%)';
    } else {
      main.style.transform = 'scale(1.05) translate(-50%, -50%)';
    }
    isScaledUp = !isScaledUp;
  }
}