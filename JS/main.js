

/********* Smooth scroll arrow section *********/

scroll = document.getElementById("scroll");
window.onscroll = function () {
    scrollDisplay()
};




function scrollDisplay() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scroll.style.display = "block";
    } else {
        scroll.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


/********* Toggle menu buttons section *********/



const menuBtn = document.querySelector(".menu-btn");
const exitBtn = document.querySelector(".exit-btn");
const headerUl = document.getElementById("menu");

menuBtn.addEventListener("click", showMenu);


function showMenu() {
    headerUl.classList.add("shown");
    menuBtn.classList.add("hidden")
    menuBtn.classList.remove("shown");
    exitBtn.classList.remove("hidden");
}

exitBtn.addEventListener("click", closeMenu);

function closeMenu() {


    headerUl.classList.remove("shown");
    exitBtn.classList.add("hidden");
    menuBtn.classList.remove("hidden");
    menuBtn.classList.remove("shown");
}



