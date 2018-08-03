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
    $('#btn-label-3').removeClass('btn-default').addClass('on');
    $('#option-1').on('change',function(){
        $("#styleimg").attr("src","sumiao.jpeg");
        $('#btn-label-1').removeClass('btn-default').addClass('on').siblings()
        .removeClass('on')
        .addClass('btn-default');
    });
    $('#option-2').on('change',function(){
        $("#styleimg").attr("src","comic.jpg");
        $('#btn-label-2').removeClass('btn-default').addClass('on').siblings()
        .removeClass('on')
        .addClass('btn-default');

    }).removeClass('btn-default').addClass('on');
    $('#option-3').on('change',function(){
        $("#styleimg").attr("src","vango.jpeg");
        $('#btn-label-3').removeClass('btn-default').addClass('on').siblings()
        .removeClass('on')
        .addClass('btn-default');

    }).removeClass('btn-default').addClass('on');
 }
 )
