const bar=document.getElementById("bar");

const percent=document.getElementById("percent");

const message=document.getElementById("message");

const verify=document.querySelector(".verify");

const welcome=document.getElementById("welcome");

let p=0;

const messages=[

"Finding the love of your life... ❤️",

"Searching beautiful memories... 📸",

"Reading Mark's heart... ❤️",

"Counting every smile... 😊",

"Preparing something special... 🎁"

];

message.innerHTML = messages[0];

const timer=setInterval(()=>{

p++;

bar.style.width=p+"%";

percent.innerHTML=p+"%";

if(p==20){

message.innerHTML=messages[1];

}

if(p==40){

message.innerHTML=messages[2];

}

if(p==60){

message.innerHTML=messages[3];

}

if(p==80){

message.innerHTML=messages[4];

}

if(p>=100){

clearInterval(timer);

verify.style.display="none";

welcome.style.display="block";

setTimeout(()=>{

window.location.replace("intro.php");

},3500);

}

},50);