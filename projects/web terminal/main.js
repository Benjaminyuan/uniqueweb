window.onload=function(){
    var result;
    var input=document.getElementById("inputarea");
    input.addEventListener("keydown",function(event){
        if(event.keyCode == 13){
            // 
            result=handlecmd(input.value);
            var output = document.getElementById("output");
            var addcontent='<div><span id="username">benjaminfalcon@benjaminfalcon</span>'+
            ':<span class="icon">~</span><span>$ '+input.value+'</span></div>';
            output.innerHTML=output.innerHTML+addcontent;
            input.value='';
        }
    })
    var cmdlist={
        LS:{value:"ls",help:congif.Help.ls},
        RM:{value:"remove",}

    }
};