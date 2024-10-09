let gameSeq = [];
let userSeq = [];
let colors = ["red","blue","green","purple"];

let started = false;
let level =0;
let h3 = document.querySelector("h3");
let body = document.querySelector("body");
let currIdx =-1;

document.addEventListener("keypress",function(){
    if (started == false) {
        console.log("Game started")
        started = true;
        levelUp();
    }
});
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}
function flashButton(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function levelUp(){
    level++;
    currIdx=-1;
    h3.innerText = `Level ${level}`;
    //choose random button
    let randomidx = Math.floor(Math.random() * 3);
    let randomcolor = colors[randomidx];
    let randombtn = document.querySelector(`.${randomcolor}`);
    setTimeout(() => {
        flashButton(randombtn);
    }, 250); 
    gameSeq.push(randomcolor);
    userSeq=[];
}
function exit(){
    started =false;
    h3.innerHTML=`Game over! Your score is ${level-1}.<br>Press any key to try again.</br>`;
    level=0;
    body.classList.add("backgroundflash");
    setTimeout(() => {
        body.classList.remove("backgroundflash");
    }, 300);
    gameSeq = [];
}
function check(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(idx==level-1 ){
            // currIdx=-1;
            levelUp();
            return;           
        }
    }else{
        exit();
    }
}

function clickedButton(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    currIdx++;
    check(currIdx);    
}
let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click",clickedButton);
}