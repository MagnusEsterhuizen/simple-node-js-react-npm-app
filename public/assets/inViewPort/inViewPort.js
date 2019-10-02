function inViewPort(element) {
    var _this = element;
    var scrollTop = window.scrollY
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var elementOffset = element.getBoundingClientRect();
    var offset = {
        top: elementOffset.top,
        right: elementOffset.left + _this.offsetWidth,
        left: elementOffset.left,
        bottom: elementOffset.top + _this.offsetHeight,
    }
    var extra = arguments[1] || {};
    if (!extra.hasOwnProperty("top")) {
        extra.top = 0;
    }
    if (!extra.hasOwnProperty("right")) {
        extra.right = 0;
    }
    if (!extra.hasOwnProperty("bottom")) {
        extra.bottom = 0;
    }
    if (!extra.hasOwnProperty("left")) {
        extra.left = 0;
    }

    var viewPort = {
        top: scrollTop + extra.top,
        right: windowWidth + extra.right,
        bottom: scrollTop + windowHeight + extra.bottom,
        left: 0 + extra.left
    }

    var element = {
        top: offset.top,
        right: offset.left + _this.offsetWidth,
        bottom: offset.top + _this.offsetHeight,
        left: offset.left
    }

    console.log("viewPort", viewPort);
    console.log("element", element);
    if (
        (
            //**inside viewport
            viewPort.top <= element.bottom &&
            viewPort.right >= element.left &&
            viewPort.bottom >= element.top &&
            viewPort.left <= element.right
        )
        ||
        (
            //**covers viewport
            viewPort.top >= element.top &&
            viewPort.right <= element.right &&
            viewPort.bottom <= element.bottom &&
            viewPort.left >= element.left
        )
    ) {
        return true;
    }
    else {
        return false;
    }
}