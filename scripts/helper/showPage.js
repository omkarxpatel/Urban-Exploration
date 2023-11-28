function showPage(pageId) {
    // loading(0.5);
    // sleep(0.5)
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    setTimeout(function () {
        document.getElementById(pageId).style.display = 'block';
    }, 0); // change 0 to interval time

    return false;
}

function loading(time = 0) {
    var loaderWrapper = document.getElementsByClassName("loader-wrapper")[0];
    loaderWrapper.style.display = 'block';
    loaderWrapper.style.opacity = 1;

    sleep(time)
        .then(() => {
            loaderWrapper.style.opacity = 0;
            return sleep(0.5);
        })
        .then(() => {
            loaderWrapper.style.display = 'none';
        });
}

function sleep(s = 0) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

document.addEventListener("DOMContentLoaded", function () {
    var loaderWrapper = document.getElementsByClassName("loader-wrapper")[0];
    loaderWrapper.style.display = 'none';
    loading(1);
});
