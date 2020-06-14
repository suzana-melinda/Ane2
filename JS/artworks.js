window.addEventListener("DOMContentLoaded", getData);

/***** Get Data from WP *****/


const apiLink = "https://mymmd.dk/Ane/wp-json/wp/v2/artwork?per_page=100&_embed";




/***** Fetch Data *****/

function getData() {

    /***** Getting gallery id from the URL parameters *****/

    const urlParams = new URLSearchParams(window.location.search);
    const the_art_id = urlParams.get('art_id');
    const singleGalleryApiLink = "https://mymmd.dk/Ane/wp-json/wp/v2/artwork/" + the_art_id + "?per_page=100&_embed";


    if (the_art_id) {

        /***** If there is an id in the URL parameters, we are in the single gallery page so we will call showGallery function and fetch the data from singleGalleryApiLink  *****/

        fetch(singleGalleryApiLink)
            .then(function (response) {
                return response.json()
            })
            .then(showGallery)
    } else {

        /***** If not then we are in artwork page and we will call loopData function and fetch the data from the original apiLink  *****/

        fetch(apiLink)
            .then(function (response) {
                return response.json();
            })
            .then(loopData);
    }

}


/***** Looping data and sending singleData to showData function *****/

function loopData(data) {

    data.forEach(singleData => {

        showData(singleData);

    });

}


/***** Display template with WP Data in the DOM *****/

function showData(singleData) {

    const template = document.querySelector(".artwork-page").content;

    const copy = template.cloneNode(true);


    copy.querySelector(".artwork-images").src = singleData.cover_image.guid;

    copy.querySelector(".info").textContent = singleData.title.rendered;


    /***** Inserting singleData ID to the html link href *****/

    const a = copy.querySelector('a');
    if (a) {
        a.href += singleData.id;

    }

    document.querySelector(".artworkwrapper").appendChild(copy);



}





function showGallery(art) {


    /***** Display single gallery template with WP Data in the DOM *****/

    const template = document.querySelector("template").content;

    const copy = template.cloneNode(true);

    const divArtDescription = copy.querySelector('#art-description');

    copy.querySelector('.top-text > .title').textContent = art.title.rendered;
    copy.querySelector(".short-description").textContent = art.short_description;
    copy.querySelector(".area").textContent = art.place_year;

    copy.querySelector(".topimg").src = art.cover_image.guid;

    copy.querySelector(".long-description").textContent = art.long_description;

    /***** Check if there is a video in WP data and displying image instead *****/

    if (art.video) {
        copy.querySelector(".top-movie").src = art.video.guid;
                copy.querySelector(".top-movie").poster = art.cover_image.guid;

        copy.querySelector(".topimg").style.display = "none";

    } else {
        copy.querySelector(".top-movie").style.display = "none";
        copy.querySelector(".topimg").style.display = "block";

    };



    /***** Removing images with empty src and assignning existing src from WP to img elements in the DOM *****/

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
        document.querySelector("footer").style.display = "flex";


};
