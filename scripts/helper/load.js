export async function loading(time = 0) {
    var loaderWrapper = document.getElementsByClassName("loader-wrapper")[0];
    loaderWrapper.style.display = 'block';
    loaderWrapper.style.opacity = 1;

    await sleep(time);
    loaderWrapper.style.opacity = 0;
    await sleep(0.5);
    loaderWrapper.style.display = 'none';
}



document.addEventListener("DOMContentLoaded", function () {
    loading(1);
});
