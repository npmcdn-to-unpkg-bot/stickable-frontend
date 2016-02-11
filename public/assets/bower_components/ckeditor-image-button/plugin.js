/**
 * CKEditor Image Button Plugin
 *
 * Provides a simple way to upload images to the editor.
 */
(function () {
    'use strict';

    var pluginPath = CKEDITOR.plugins.getPath('imagebutton');

    var ImageButtonPlugin = function (editor) {
        this.editor = editor;
        this.uploadUrl = editor.config.imageUploadUrl ? editor.config.imageUploadUrl : editor.config.uploadUrl;
    };

    ImageButtonPlugin.prototype = {

        /**
         * When the user clicks the button on the toolbar.
         */
        onClick: function () {

            var self = this;

            // Remove an existing form if there is one
            var oldForm = document.getElementById('cke-image-button-form');
            if (oldForm !== null) {
                oldForm.parentNode.removeChild(oldForm);
            }

            // Create the form
            var container = document.createElement('div');
            container.id = 'cke-image-button-form';
            //container.setAttribute('style', "display:none");
            container.innerHTML = '<form enctype="multipart/form-data">' +
                '<input type="file" multiple="multiple" id="cke-image-button-file" />' +
                '<input type="submit">' +
                '</form>';
            document.getElementsByTagName('body')[0].appendChild(container);

            var fileInput = document.getElementById('cke-image-button-file');

            // When files are chosen
            fileInput.addEventListener(
                'change',
                function () {

                    var fileCount = fileInput.files.length;
                    if (fileCount < 1) {
                        return;
                    }

                    // Time is used to identify the loading spinner(s)
                    var batch = new Date().valueOf();

                    for (var i = 0; i < fileCount; i++) {

                        var file = fileInput.files[i];

                        // Add loading spinner
                        self.insertLoadingImage(batch, i);

                        // Create POST data
                        var formData = new FormData();
                        formData.append('upload', file);

                        // Send the image to server
                        self.uploadImage(batch, i, formData);
                    }
                }
            );

            fileInput.click();
        },

        /**
         * On successful upload
         *
         * @param batch
         * @param i
         * @param result
         */
        onUploaded: function (batch, i, result) {
            this.replaceLoadingImage(batch, i, result.url);
            this.editor.showNotification('Image successfully uploaded.', 'success');
        },

        /**
         * On upload error
         *
         * @param batch
         * @param i
         * @param result
         */
        onFailedUpload: function (batch, i, result) {
            this.removeLoadingImage(batch, i);
            this.editor.showNotification(result.message, 'warning');
        },

        insertLoadingImage: function (batch, i) {
            var html = '<p class="cke-image-button-loader" id="cke-image-button-tmp-' + batch + '-' + i + '"><img src="' + pluginPath + 'icons/loading.gif" /></p>';
            var element = CKEDITOR.dom.element.createFromHtml(html);
            this.editor.insertElement(element);
            this.editor.fire('change');

            return element;
        },

        removeLoadingImage: function (batch, i) {
            this.editor.editable().findOne('#cke-image-button-tmp-' + batch + '-' + i).remove();
            this.editor.fire('change');
        },

        insertImage: function (url) {
            var html = '<p><img src="' + url + '" class="cke-image-button-image" /></p>';
            var element = CKEDITOR.dom.element.createFromHtml(html);
            this.editor.insertElement(element);
            this.editor.fire('change');

            return element;
        },

        replaceLoadingImage: function (batch, i, url) {
            var html = '<p><img src="' + url + '" class="cke-image-button-image" /></p>';
            var image = CKEDITOR.dom.element.createFromHtml(html);

            var loader = this.editor.editable().findOne('#cke-image-button-tmp-' + batch + '-' + i);

            image.replace(loader);
            this.editor.fire('change');

            return image;
        },

        uploadImage: function (batch, i, data, successCallback, errorCallback) {

            var self = this;

            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {

                    var result = JSON.parse(xhr.responseText);

                    if (xhr.status === 200) {
                        self.onUploaded(batch, i, result);
                    } else {
                        self.onFailedUpload(batch, i, result);
                    }
                }
            };

            xhr.open('POST', this.uploadUrl, true);
            xhr.send(data);
        }
    };

    CKEDITOR.plugins.add('imagebutton', {
        lang: [
            'en'
        ],
        init: function (editor) {
            var plugin = new ImageButtonPlugin(editor);

            editor.addCommand('imagebutton', {
                exec: function () {
                    plugin.onClick();
                }
            });
            editor.ui.addButton('imagebutton', {
                label: 'Upload Image(s)',
                icon: pluginPath + 'icons/button.png',
                command: 'imagebutton'
            });
        }
    });

})();
