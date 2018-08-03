$(document).ready(function(){
    $('#file').fileinput({
    language:'zh',
    uploaderUrl:'',
    allowedFileExtensions:['jpg','png'],
    maxFileSize:10000,
    maXFileNum:1,
    showCaption:true,
    dropZoneEnabled:true,
    browseClass:"btn btn-primary",
    showPreview:true,
    showUpload:true
    });
    $('#option-3').attr("checked",'checked');
    $('#option-1').on('change',function(){
        $("#styleimg").attr("src","sumiao.jpeg");
        $('#option-1').removeClass('btn-default').addClass('on');
    });
    $('#option-2').on('change',function(){
        $("#styleimg").attr("src","comic.jpg");

    }).removeClass('btn-default').addClass('on');
    $('#option-3').on('change',function(){
        $("#styleimg").attr("src","vango.jpeg");

    }).removeClass('btn-default').addClass('on');
 }
 )
