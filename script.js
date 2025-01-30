let score = 0;
let hp = 5;
let totalClicks = 0;
let successfulClicks = 0;
let diffIncreasement = 3;

let diff = 1;
let miss = 0
let fool = 0;
let time = 0;
let myTimer = setInterval(mytime, 1);

function mytime(){
    time++;
}

let isFirstTime = true;
let isHovering = false;
let isFooled = false;
let isPaused = false;

const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const scoreFailedDisplay = document.getElementById('scoreFail');
const hpDisplay = document.getElementById('hp');
const clickAccuracyDisplay = document.getElementById('clickAccuracy');
const correctAccuracyDisplay = document.getElementById('correctAccuracy');
const fooledDisplay = document.getElementById('fool');
const failedDisplay = document.getElementById('fail');
const container = document.getElementById('game-container');

let width  = circle.style.width;
let height = circle.style.height;

const maxX = container.clientWidth - 300;
const maxY = container.clientHeight - 300;

function spawnCircle() {
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    circle.style.transform = `translate(${randomX}px, ${randomY}px)`;

    for(let x = 1; x <= diff; x++){
        let otherFake = document.getElementById(`fake${x}`);

        let fakerandomX = Math.random() * maxX;
        let fakerandomY = Math.random() * maxY;

        otherFake.style.transform = `translate(${fakerandomX}px, ${fakerandomY}px)`;
    }
}

circle.addEventListener('mouseenter', () => {
    isHovering = true;
});

circle.addEventListener('mouseleave', () => {
    isHovering = false;
});

const fake = document.getElementById('fake1');
fake.addEventListener('mouseenter', () => {
    isFooled = true;
});
fake.addEventListener('mouseleave', () => {
    isFooled = false;
});

document.addEventListener('click' , () =>{
    if(!isPaused){
        if(isFirstTime){
            isFirstTime = !isFirstTime;

            for(let x = 1; x <= diff; x++){
                let otherFake = document.getElementById(`fake${x}`);
                otherFake.style.border = '2px solid #ffffff';
            }
        }

        if(isHovering && (time > 100)){
            addClick();
            spawnCircle();

            time = 0;
        }else if(isFooled && (time > 100)){
            getFool();

            if(hp<=0){
                failScreen();
            }
        }
        else{
            miss++;
            totalClicks++;
        }

        if(!isFooled){
            diffCircle();
        }

        updateDisplay();
    }   
});

document.addEventListener('keydown', (event) => {
    if(!isPaused){
        if(((event.key == 'q') || (event.key == 'w'))){
            if(isFirstTime){
                isFirstTime = !isFirstTime;
        
                for(let x = 1; x <= diff; x++){
                    let otherFake = document.getElementById(`fake${x}`);
                    otherFake.style.border = '2px solid #ffffff';
                }
            }

            if(isHovering && (time > 100)){
                addClick();
                spawnCircle();
    
                time = 0;
            }
            else if(isFooled && (time > 100)){
                getFool();
    
                if(hp<=0){
                    failScreen();
                }
            }else{
                miss++;
                totalClicks++;
            }
    
            if(!isFooled && isHovering){
                diffCircle();
            }
    
            updateDisplay();
            
        }
    }
});

//For pause screen
document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
        isPaused = !isPaused;
        const pauseScreen = document.getElementById('pauseScreen');
        if (isPaused) {
            pauseScreen.classList.remove('hidden');
            container.style.opacity = 0.4;
        } else {
            pauseScreen.classList.add('hidden');
            container.style.opacity = 1;
        }
    }

    if (isPaused) {
        if (event.key === 'r') {
            overlay('gameScene.html');
        } else if (event.key === 'h') {
            overlay('mainMenu.html');
        }
    }
});

function overlay(href){
    const overlay = document.getElementById('overlay');
    overlay.classList.add('active');
  
    setTimeout(() => {
        window.location.href = href;
    }, 500);
}

function diffCircle(){
    if((score % diffIncreasement == 0) && score != 0){
        diffIncreasement *= 5;
        diff++
        addFake();
        isFirstTime = !isFirstTime;
    }

    let difficulty = (1/diff);

    for(let x = 1; x <= diff; x++){
        let otherFake = document.getElementById(`fake${x}`);
        otherFake.style.transition = `${difficulty}s`;
    }
    
    circle.style.transition = `${difficulty}s`;
}

function updateDisplay() {
    scoreDisplay.textContent = score;
    fooledDisplay.textContent = fool;
    hpDisplay.textContent = hp;
    
    calculateAccuracy();
}

function calculateAccuracy() {
    const clickaccuracy = totalClicks == 0 ? 0 : (successfulClicks / totalClicks) * 100;
    clickAccuracyDisplay.textContent = clickaccuracy.toFixed(2) + '%';

    const countaccuracy = (score == 0) ? 0 : (score / (score + fool)) * 100;
    correctAccuracyDisplay.textContent = countaccuracy.toFixed(2) + '%';
}

function addClick(){
    score++;
    successfulClicks++;
    totalClicks++;
}

function getFool(){
    fool++;
    hp--;
}

function addFake() {
    var div = document.createElement("div");
    div.className = "fake noshowcursor";
    div.id = `fake${diff}`;
    document.getElementById("game-container").appendChild(div);

    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    div.style.transform = `translate(${randomX}px, ${randomY}px)`;

    div.addEventListener('mouseenter', () => {
        isFooled = true;
    });
    div.addEventListener('mouseleave', () => {
        isFooled = false;
    });
}

function failScreen(){
    container.style.backgroundColor = '#ff0000';

    for(let x = 1; x <= diff; x++){
        let otherFake = document.getElementById(`fake${x}`);
        otherFake.style.opacity = 0;
    }

    circle.style.opacity = 0;
    failedDisplay.style.opacity = 1;
    scoreFailedDisplay.style.opacity = 1;
    scoreFailedDisplay.textContent = `Score : ${score}`;
}

spawnCircle();
updateDisplay();