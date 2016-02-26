function preventDefault($event) {
    $event.preventDefault();
    $event.stopPropagation();
}

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function setBg($element, url) {
    setTimeout(function() {
        if (url) {
            $element.removeClass('dark-bg');
            if (iOS) {
                $element.css('background-image', 'url(' + url + ')');
            } else {
                $.backstretch(url);
            }
        } else {
            $element.addClass('dark-bg');
        }
    }, 1);
}

function clearBg() {
    $('.splash').backstretch('destroy');
    $.backstretch('destroy');
}
