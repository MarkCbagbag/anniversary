const intro = document.getElementById("intro");
const login = document.getElementById("login");

document.getElementById("startBtn").onclick = () => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        login.style.opacity = "1";

        login.style.pointerEvents = "auto";

    }, 900);

};

document.getElementById("loginBtn").onclick = () => {

    const name = document.getElementById("love").value.trim().toLowerCase();

    const date = document.getElementById("date").value.trim();

    const error = document.getElementById("error");

    // CHANGE THESE
    const girlfriend = "kimmy";
    const anniversary = "2023";

    if(name === girlfriend && date === anniversary){

        error.style.color = "#8cff8c";

        error.innerHTML = "❤️ Identity Confirmed...";

        setTimeout(()=>{

            window.location.href="verify.html";

        },1800);

    }

    else{

        error.style.color="#ff7373";

        error.innerHTML="That's not quite right... ❤️ Try again.";

    }

}