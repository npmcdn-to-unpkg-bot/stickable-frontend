Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-top messenger-on-center',
    theme: 'flat',
    //messageDefaults: {
    //    //hideAfter: 5
    //}
};

function alertSuccess(message) {
    Messenger().post({
        message: message,
        type: 'success',
        showCloseButton: true,
        hideAfter: 3
    });
}

function alertError(message) {
    Messenger().post({
        message: message,
        type: 'error',
        showCloseButton: true,
        hideAfter: 3
    });
}
