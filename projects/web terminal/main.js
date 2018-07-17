window.onload=function(){
    var result;
    var input=document.getElementById("inputarea");
    input.focus();
    var cmdlist={
        LS:{value:"ls",},
        RM:{value:"remove",},
        MKDIR:{value:"mkdir",},
        TOUCH:{value:"touch"},
        LN:{value:"ln"},
        CP:{value:"cp"},
        RM:{value:"rm"},
        CAT:{value:"cat"},
        ECHO:{value:"echo"},
        CLEAR:{value:"clear"}
    }
    var handler= function(){
        this.cmd = '';
    }
    handler.prototype.handlecmd=function(value){
        var cmdwords = value.trim().split(/\s+/);
        console.log(cmdwords);
        switch(cmdwords[0]){
            case cmdlist.LS.value:
                this.ls(cmdwords);
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.MKDIR.value:
                this.mkdir();
                console.log(cmdwords);
                this.next;
                break;
            case cmdlist.TOUCH.value:
                this.touch(cmdwords);
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.LN.value:
                this.ln(cmdwords);
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.CP.value:
                this.cp();
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.RM.value:
                this.rm(cmdwords);
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.CAT.value:
                this.cat();
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.ECHO.value:
                this.echo(cmdwords);
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.CLEAR.value:
                this.clear();
                console.log(cmdwords);
                break;
            default:
                this.next();
                break;
        }
    };
    handler.prototype.rm = function(cmdwords){
        //code
    }
    handler.prototype.cat= function(cmdwords){
        //code
    }
    handler.prototype.echo=function(cmdwords){
        //code
    }
    handler.prototype.mkdir = function(cmdwords){
        //code

    };
    handler.prototype.cp = function(cmdwords){
        //code
    };
    handler.prototype.touch = function(cmdwords){
        //code
    }
    handler.prototype.ln = function(cmdword){
        //code
    }
    handler.prototype.ls= function(cmdwords){
        if(cmdwords.length === 1){
            //code
        }
        else if(cmdwords[1]=='-a'){
            console.log(cmdwords[1]);
        }
        else{
            //code
        }
    };
    handler.prototype.clear = function (){
        let output = document.getElementById("output");
        output.innerHTML='';
        input.value='';
    }
    handler.prototype.next = function(){
         let output = document.getElementById("output");
         let addcontent='<div><span id="username">benjaminfalcon@benjaminfalcon</span>'+
        ':<span class="icon">~</span><span>$ '+input.value+'</span></div>';
        output.innerHTML=output.innerHTML+addcontent;
        input.value='';
    }
    var myhandler = new handler();
    input.addEventListener("keydown",function(event){
        if(event.keyCode == 13){
            myhandler.handlecmd(input.value);
        }
    })
};