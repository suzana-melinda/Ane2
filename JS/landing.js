/********* Calling getData function after the page loaded *********/

window.addEventListener("load", getData);



/***** Get Data from WP *****/

const apiLink = "https://mymmd.dk/Ane/wp-json/wp/v2/artwork?per_page=100&_embed";


/***** Fetch Data *****/

function getData() {

    fetch(apiLink)
        .then(function (response) {
            return response.json();
        })
        .then(loopData);
}


/***** Looping data and sending singleData to showData function *****/

function loopData(data) {
    data.forEach(singleData => {

        showData(singleData);

    });
    changeSlide();
}



/***** Display template with WP Data in the DOM *****/

function showData(singleData) {

    /***** Rendering background images template *****/

    const template = document.querySelector(".landing").content;
    const copy = template.cloneNode(true);

    const currentBg = copy.querySelector(".current-bg");
    currentBg.src = singleData.cover_image.guid
    currentBg.id = singleData.id;
    currentBg.alt = singleData.title.rendered;

    document.querySelector(".bg-container").appendChild(copy);


    /***** Rendering dots template *****/

    const dotsTemplate = document.querySelector(".circles-temp").content;
    const dotsCopy = dotsTemplate.cloneNode(true);

    dotsCopy.querySelector('.dot-title').textContent = singleData.art_name;
    dotsCopy.querySelector('.dot-title').id = singleData.id;
    dotsCopy.querySelector('.circle').id = singleData.id;
    dotsCopy.querySelector(".circle-wrapper").id = singleData.id;




    /***** Inserting singleData ID to the html link href *****/

    const a = dotsCopy.querySelector('a');
    dotsCopy.querySelector(".circle-wrapper").addEventListener("click", changeGalleryBg)

    if (a) {
        a.href += singleData.id;
        a.id = singleData.id;


    }
    document.querySelector(".circles-wrapper").appendChild(dotsCopy);


}

/***** Defining index counter for change slide function *****/

let slideIndex = 0;


/***** Changing background after clikcing event *****/

function changeGalleryBg(e) {

    /***** Fetching background images from the DOM *****/

    let slides = document.querySelectorAll(".current-bg");
    slides.forEach((slide, index) => {

        /***** Showing the matching bg by checking the id *****/

        if (slide.id === e.target.id) {
            slide.style.opacity = "1";

            console.log(index);
            slideIndex = index;

        } else {
            slide.style.opacity = "0";
        }

    })
    /***** Handel links *****/

    titleLinks = document.querySelectorAll(".title-link");
    titleLinks.forEach(link => {

        if (link.id === e.target.id) {
            link.style.visibility = "visible"

        } else {
            link.style.visibility = "hidden"

        }
    });

    /***** Handel titles *****/

    dotsTitles = document.querySelectorAll(".dot-title");
    dotsTitles.forEach(title => {

        if (title.id === e.target.id) {

            title.style.opacity = "1";
        } else {
            title.style.opacity = "0";

        }
    });

    /***** Handel nav dots *****/

    circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {

        if (circle.id === e.target.id) {

            circle.style.background = "white";
        } else {
            circle.style.background = "none";
        }
    });

}





function changeSlide() {

    /***** Fetching background images from the DOM *****/

    let i;
    let slides = document.getElementsByClassName("current-bg");
    for (i = 0; i < slides.length; i++) {

        /***** Hidding all bg images from the DOM *****/

        slides[i].style.backgroundColor = "black";

        slides[i].style.opacity = "0";


    }

    /***** Increasing index counter with 1 *****/

    slideIndex++;

    /***** Resetting index counter to 1 when reaching to the end of the array *****/

    if (slideIndex > slides.length) {
        slideIndex = 1
    }




    /***** Showing the current bg image *****/

    slides[slideIndex - 1].style.opacity = "1";


    /***** Handel links *****/

    titleLinks = document.querySelectorAll(".title-link");
    titleLinks.forEach(link => {

        if (link.id === slides[slideIndex - 1].id) {
            link.style.visibility = "visible"

        } else {
            link.style.visibility = "hidden"

        }
    });

    /***** Handel titles *****/

    dotsTitles = document.querySelectorAll(".dot-title");
    dotsTitles.forEach(title => {

        if (title.id === slides[slideIndex - 1].id) {

            title.style.opacity = "1";


        } else {
            title.style.opacity = "0";



        }
    });


    /***** Handel nav dots *****/

    circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {

        if (circle.id === slides[slideIndex - 1].id) {

            circle.style.background = "white";
        } else {
            circle.style.background = "none";
        }
    });


    /***** Restarting the function to change to the the next bg image *****/

    setTimeout(changeSlide, 5000); // Change bg image every 5 seconds
};
