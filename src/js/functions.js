function preventDefault($event) {
    $event.preventDefault();
    $event.stopPropagation();
}

function initQuill(id) {
    var editor = new Quill(id);
    editor.addModule('toolbar', { container: '#toolbar' });
    return editor;
}
