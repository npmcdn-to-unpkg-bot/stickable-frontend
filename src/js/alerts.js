Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
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
        hideAfter: 5
    });
}

function alertError(message) {
    Messenger().post({
        message: message,
        type: 'error',
        showCloseButton: true
    });
}
