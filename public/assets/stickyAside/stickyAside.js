let sticky = false;
let goingDown = true;
const extra = 112;

function resetAside_xs() {
    const aside = document.querySelector("aside > div");
    const scrollTop = window.scrollY;

    if (window.innerWidth < 600) {
        aside.style.position = "relative";
        aside.style.top = "48px";
        aside.style.bottom = "auto";
    }
    else {
        sticky = false;
        goingDown = false;
        aside.style.position = "relative";
        aside.style.top = `${scrollTop}px`;
        aside.style.bottom = "auto";
    }
}

function getMaxScrollY() {
    const limit = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    return limit;
}

let prevScrollTop = 0;

function stickyAside() {
    if (window.innerWidth > 600) {
        const aside = document.querySelector("aside > div");
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollTop <= 0) {
            sticky = false;
            goingDown = true;
            aside.style.position = "relative";
            //aside.style.top = `${scrollTop + windowHeight - aside.offsetHeight - extra}px`;
            aside.style.top = 0;
            aside.style.bottom = "auto";
        }
        else if (scrollTop >= getMaxScrollY()) {
            sticky = false;
            goingDown = false;
            aside.style.position = "relative";
            aside.style.top = getMaxScrollY();
            aside.style.bottom = "auto";
        }
        else if (prevScrollTop < scrollTop) {
            //down
            if (sticky === false && aside.offsetTop + aside.offsetHeight < scrollTop + windowHeight - extra) {
                sticky = true;
                aside.style.position = "fixed";
                aside.style.top = "auto";
                aside.style.bottom = "24px";
            }
            else if (sticky === true && goingDown === false) {
                sticky = false;
                goingDown = true;
                aside.style.position = "relative";
                aside.style.top = `${scrollTop}px`;
                aside.style.bottom = "auto";
            }
        }
        else if (prevScrollTop > scrollTop) {
            //up
            if (sticky === false && aside.offsetTop > scrollTop) {
                sticky = true;
                aside.style.position = "fixed";
                aside.style.top = "88px";
                aside.style.bottom = "auto";
            }
            else if (sticky === true && goingDown === true) {
                sticky = false;
                goingDown = false;
                aside.style.position = "relative";
                aside.style.top = `${scrollTop + windowHeight - aside.offsetHeight - extra}px`;
                aside.style.bottom = "auto";
            }
        }
        prevScrollTop = scrollTop;
    }
    else {
        resetAside_xs();
    }
}

function setupAside(count) {
    if (count > 0) {
        count--;
        stickyAside();
        setTimeout(() => setupAside(count), 1000);
    }
}

document.addEventListener("scroll", function () {
    //makes the aside sticky
    stickyAside();
})

window.addEventListener("resize", function () {
    //reset aside for eXstra Small (xs < 600px) screens
    resetAside_xs();
})