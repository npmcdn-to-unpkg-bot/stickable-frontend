function preventDefault($event) {
    $event.preventDefault();
    $event.stopPropagation();
}

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function setBg($element, url) {
    setTimeout(function() {
        if (iOS) {
            $element.css('background-image', 'url(' + url + ')');
        } else {
            $.backstretch(url);
        }
    }, 1);
}

function clearBg() {
    $('.splash').backstretch('destroy');
    $.backstretch('destroy');
}
