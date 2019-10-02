function pushHistory() {
    const pages = [
        //"home",
        "coverletter",
        "biography",
        "employment",
        "education",
        "portfolio",
        "diplomas",
        "references"
    ];

    if (!window.isAutoScroll) {
        pages.forEach((page) => {
            const pageElement = document.querySelector(`#page_${page}`);
            if (
                pageElement
                &&
                window.scrollY - pageElement.offsetTop >= 0
                &&
                window.scrollY - pageElement.offsetTop <= 80
            ) {
                if (!window.historyList) {
                    window.historyList = [];
                }
                if (window.historyList.length === 0 || historyList[historyList.length - 1] !== page) {
                    window.historyList.push(page);
                    window.history.pushState("", page, `/${page !== "home" ? page : ""}`);

                    let pageTitle = page[0].toUpperCase() + page.slice(1);
                    if (pageTitle === "Home") {
                        pageTitle = "Curriculum Vitae";
                    }
                    window.setPageTitle(pageTitle);
                    document.title = document.title.replace(/((\w+\s?){2}).*/, `$1 - ${pageTitle}`);
                }
            }
        })
    }
}

document.addEventListener("scroll", function () {
    //pushes the scroll markers to history for back and forth navigation
    pushHistory();
})
alert("asd")