const cursor = document.querySelector('.cursor');

const positionElement = (event)=> {
  const mouseY = event.clientY;
  const mouseX = event.clientX;
   
  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}

window.addEventListener('mousemove', positionElement);