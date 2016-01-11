$(document).ready(function () {

    $('#add-input-file').on('click', function () {
        
    var form = $('#form-upload');
    var count = form.children('input[type="file"]').length;

    var inputTypeFile = $('<input />');
    inputTypeFile.attr('type', 'file');
    inputTypeFile.attr('name', `file_${count}`);

    form
        .prepend($('<br />'))
        .prepend($('<br />'))
        .prepend(inputTypeFile);
    });
    
});