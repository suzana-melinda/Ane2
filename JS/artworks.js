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





const btnMenu = document.querySelector(".menu-btn");
const btnExit = document.querySelector(".exit-btn");
const headerUl = document.getElementById("menu");

btnMenu.addEventListener("click", showNav);


function showNav() {
    headerUl.classList.add("shown");
    btnMenu.classList.add("hidden")
    btnMenu.classList.remove("shown");
    btnExit.classList.remove("hidden");
}

btnExit.addEventListener("click", closeMenu);

function closeMenu() {


    headerUl.classList.remove("shown");
    btnExit.classList.add("hidden");
    btnMenu.classList.remove("hidden");
    btnMenu.classList.remove("shown");
}





/***** Get Data from WP *****/


const link1 = "https://mymmd.dk/Ane/wp-json/wp/v2/artwork?per_page=100&_embed";
window.addEventListener("DOMContentLoaded", getData);




/***** fetch Data *****/

function getData() {

    const urlParams = new URLSearchParams(window.location.search);
    const the_art_id = urlParams.get('art_id');
    const link2 = "https://mymmd.dk/Ane/wp-json/wp/v2/artwork/" + the_art_id + "?per_page=100&_embed";



    if (the_art_id) {
        fetch(link2)
            .then(function (response) {
                return response.json()
            })
            .then(showSingleArtPage)
    } else {
        fetch(link1)
            .then(function (response) {
                return response.json();
            })
            .then(showData);
    }
}




function showData(artWorkArray) {

    artWorkArray.forEach(art => {


        renderArtworkPage(art);





    });

}


function renderArtworkPage(ArtworkPageArray) {

    const template = document.querySelector(".artwork-page").content;

    const copy = template.cloneNode(true);


    copy.querySelector(".artwork-images").src = ArtworkPageArray.cover_image.guid;

    copy.querySelector(".info").textContent = ArtworkPageArray.title.rendered;
    const a = copy.querySelector('a');


    if (a) {
        a.href += ArtworkPageArray.id;

    }

    document.querySelector(".artworkwrapper").appendChild(copy);



}


function showSingleArtPage(art) {


    const template = document.querySelector("template").content;

    const copy = template.cloneNode(true);

    const divArtDescription = copy.querySelector('#art-description');

    copy.querySelector('.top-text > .title').textContent = art.title.rendered;
    copy.querySelector(".short-description").textContent = art.short_description;
    copy.querySelector(".area").textContent = art.place_year;

    copy.querySelector(".topimg").src = art.cover_image.guid;

    copy.querySelector(".long-description").textContent = art.long_description;


    if (art.video) {
        copy.querySelector(".top-movie").src = art.video.guid;
         copy.querySelector(".topimg").style.display = "none";
    } else {
        copy.querySelector(".top-movie").style.display = "none";
        copy.querySelector(".topimg").style.display = "block";

    };




    if (art.portrait_one) {
        copy.querySelector(".portrait1").src = art.portrait_one.guid;
    } else {
        copy.querySelector(".portrait1").style.display = "none";
    }

    if (art.portrait_two) {
        copy.querySelector(".portrait2").src = art.portrait_two.guid;
    } else {
        copy.querySelector(".portrait2").style.display = "none";
    }


    if (art.portrait_three) {
        copy.querySelector(".portrait3").src = art.portrait_three.guid;
    } else {
        copy.querySelector(".portrait3").style.display = "none";
    }


    if (art.portrait_four) {
        copy.querySelector(".portrait4").src = art.portrait_four.guid;
    } else {
        copy.querySelector(".portrait4").style.display = "none";
    }

    if (art.landscape_one) {
        copy.querySelector(".landscape").src = art.landscape_one.guid;
    } else {
        copy.querySelector(".landscape").style.display = "none";
    }

    const imgGalleryParent = copy.querySelector(".img-gallery");

    if (art.gallery_pictures) {
        art.gallery_pictures.forEach(picture => {
            const currentImg = document.createElement("img");
            currentImg.src = picture.guid;


            imgGalleryParent.appendChild(currentImg);

        })
    }

    document.querySelector("#single-art").appendChild(copy);


};
