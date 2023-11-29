function showPage(pageId) {
    var pages = document.getElementsByClassName('page');
    var dashboardButton = document.getElementById('dashboardButton');

    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
        
        // if (showItem(pages[i].id) == false && pages[i].id === "Dashboard") {
        //     dashboardButton.style.display = 'none';
        //     console.log('adsf')
        // }
    }

    setTimeout(function () {
        document.getElementById(pageId).style.display = 'block';
        
        // if (pageId === "Dashboard" && showItem(pageId)) {
        //     dashboardButton.style.display = 'block';
        // }
    }, 0);

    return false;
}


function showItem(item) {
    const blacklistUntilLoggedIn = ["Dashboard"];
    if (blacklistUntilLoggedIn.includes(item)) {
        const uuid = localStorage.getItem('uuid');

        if (uuid) {
            return true;
        }
    }
    return false;
}

function sleep(s = 0) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}
