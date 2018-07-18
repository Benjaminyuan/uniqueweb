window.onload=function(){
    var result;
    var mydate = new Date();
    var input=document.getElementById("inputarea");
    input.focus();
    var tempjson={};//中间变量 用于提取出一层结构的JSON
    var tempArray=[];
    var tempArray1=[];
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
        CLEAR:{value:"clear"},
        CD:{value:"cd"}
    };
    var handler= function(Storage){
        this.cmd ='';
        this.more=[];//执行命令网页的显示的结果
        this.myStorage=localStorage;
        this.file={
            'Desktop':{'type':'folder','authortiy':'drwxr-xr-x',
                'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'},
            'Secret':{'type':'folder','authortiy':'drwxr-xr-x',
                'size':4096,'lastchange':'Apr-28-17:00','hidden':'ture'},
            'Home':{'type':'folder','authortiy':'drwxr-xr-x',
                'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'},
            'Music':{'type':'folder','authortiy':'drwxr-xr-x',
                'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'}      
        };
        this.temp=JSON.stringify(this.file);
        this.myStorage.setItem('file',this.temp);
        this.myStorage.setItem('Desktop',JSON.stringify({'application':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'}}));
        this.myStorage.setItem('application',JSON.stringify({'vscode':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'},
        'note':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'},
        'projects':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'}}));
        this.myStorage.setItem('Home',JSON.stringify({'Desktop':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'}}));
        this.myStorage.setItem('projects',JSON.stringify({'python':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'},
        'js':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'}}));
        this.myStorage.setItem('Music',JSON.stringify({'rap':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'},
        'pop':{'type':'folder','authortiy':'drwxr-xr-x',
        'size':4096,'lastchange':'Apr-28-17:00','hidden':'false'}}));
        this.pos='~';//当前路径名
        this.posfile=this.file;//文件’指针‘，指向当前目录
    }   
    handler.prototype.handlecmd=function(value){
        var cmdwords = value.trim().split(/\s+/);//处理输入的命令字符串
        console.log(cmdwords);
        switch(cmdwords[0]){
            case cmdlist.LS.value:
                this.ls(cmdwords);
                console.log(cmdwords);
                this.next();
                break;
            case cmdlist.MKDIR.value:
                this.mkdir(cmdwords);
                console.log(cmdwords);
                this.next();
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
            case cmdlist.CD.value:
                this.cd(cmdwords);
                this.next();
                break;
            default:
                this.more=['Commad','not','found!'];
                this.next();
                break;
        }
    };
    handler.prototype.rm = function(cmdwords){
        if(cmdwords.length===2){
            if(cmdwords[1] in this.posfile){
                if(this.pos==='~'){//根目录情况
                    delete this.posfile[cmdwords[1]];
                    console.log(this.posfile)
                this.myStorage.setItem('file',JSON.stringify(this.posfile));
                }
                else{
                    console.log(this.posfile)
                    delete this.posfile[cmdwords];
                this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                }
            }
            else{
                this.more=['folder','not','exist'];
            }
        }
        else if(cmdwords.length===3){

        }
        else{
            this.more=['less','arguement'];
        }
    }
    handler.prototype.cat= function(cmdwords){
        //code
    }
    handler.prototype.echo=function(cmdwords){
        //code
    }
    handler.prototype.mkdir = function(cmdwords){
        if(cmdwords.length===2){
            if(cmdwords[1] in this.posfile){
                this.more = ['folder','exist','already'];
            }else{
                this.posfile[cmdwords[1]]={'type':'folder','authortiy':'drwxr-xr-x',
                'size':'4096','lastchange':`${mydate.toLocaleString().replace(/\/|,/g,'')}`,'hidden':'false'}
                if(this.pos==='~'){
                    this.myStorage.setItem('file',JSON.stringify(this.posfile));
                }
                else{
                    this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                }
            }
         }
        else{
            this.more=['less','arguement'];
        }

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
        let key;
        var key1;
        var tempstring='';
        if(cmdwords.length === 1){
            for(key in this.posfile){
                if(this.posfile[key]['hidden']==='false'){
                    this.more.push(key); 
                }
                console.log(this.more);
            }
        }
        else if(cmdwords[1]=='-l'){
            for(key in this.posfile){
                if(this.posfile[key]['hidden']==='false'){
                    for(key1 in this.posfile[key]){
                    tempstring+=this.posfile[key][key1]+'&emsp;';
                    }
                    this.more.push(tempstring+key); 
                    tempstring=''; 
                    }
                }
            console.log(this.more);
        }
        else if(cmdwords[1]==='-a'){
            for(key in this.posfile){
                if(this.posfile[key]['hidden']==='false'){
                    this.more.push(key); 
                }
                else{
                    this.more.push('.'+key);
                }
                console.log(this.more); 
            }
        }
     };
    handler.prototype.cd=function(cmdwords){
        let i=0;
        let flag=1;
        console.log(cmdwords);
        if(cmdwords.length>1&&cmdwords[1].indexOf('/'))//cd有多层次跳跃
        {
            tempArray=cmdwords[1].split('/');//cd 的文件目录 
            tempArray1 = this.pos.split('/');//位置
            console.log(tempArray);
            if(tempArray[0]==='.'){//形如 ./Desktop的操作处理
                for(i=1;i<tempArray.length;i++){//检查合法性
                    console.log(tempArray[i] in this.posfile);
                    if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
                        console.log(tempArray[i]);
                        this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));    
                    }
                    else if(tempArray[1]!==''){//在./后面有东西但是没有匹配成功时进入
                        this.more=['Error','the','file','not','exist'];
                        flag=0;
                        break;
                    } 
                }
                if(flag&&tempArray[1]!==''){
                    this.pos+=cmdwords[1].replace('.','');//判断是否出现了文件不存在的情况
                }
                flag=1;//重置flag
            }
            else if(tempArray[0]==='..'){
                this.pos=this.pos.replace('/'+tempArray1.pop(),'');//返回上一级
                console.log(this.pos);//调试
                console.log(tempArray1);
                this.posfile = JSON.parse(this.myStorage.getItem(tempArray1[tempArray1.length-1]));//文件指针的位置
                if(tempArray[1]!==''){
                    for(i=1;i<tempArray.length;i++){//向下查找目录
                        if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
                            this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));//文件指针的位置    
                        }
                        else{
                            this.more=['Error','the','folder','not','exist'];
                            flag=0;
                            break;
                        } 
                    }
                    if(flag){//判断是否出现了文件不存在的情况
                        this.pos+=cmdwords[1].replace('..','');
                
                    }
                    flag=1;
                }  
            }
            else{//直接再当前目录下cd的情况
                    for(i=0;i<tempArray.length;i++){//向下查找目录
                        if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
                            this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));//文件指针的位置    
                        }
                    else{
                        this.more=['Error','the','folder','not','exist'];
                        flag=0;
                        break;
                        } 
                    }
                    if(flag){
                    this.pos=this.pos+'/'+cmdwords[1];//判断是否出现了文件不存在的情况
                    }
                    flag=1;//重置flag
            }
        }
        else if(cmdwords.length>1){
            if(cmdwords[1] in this.posfile&&this.posfile[cmdwords[1]]['type']==='folder'){
                this.posfile = JSON.parse(this.myStorage.getItem(cmdwords[1]));//文件指针的位置  
                this.pos+='/'+cmdwords[1];   
            }
            else{
                this.more=['Error','the','folder','not','exist'];
            }
        }
        else{
            this.more=[''];
        }
        

    }
    handler.prototype.clear = function (){
        let output = document.getElementById("output");
        output.innerHTML='';
        input.value='';
    }
    handler.prototype.next = function(){
        let morehtml='';
        for(let i=0;i<this.more.length;i++){
            morehtml+='<span>'+this.more[i]+'&emsp;&emsp;</span>';
        }
        morehtml='<div>'+morehtml+'</div>';
        let output = document.getElementById("output");
        let poshtml=document.getElementById("pos");
        let addcontent='<div><span id="username">benjaminfalcon@benjaminfalcon</span>'+
        ':<span class="icon">'+poshtml.innerHTML+'</span><span>$ '+input.value+'</span></div>'+
        morehtml;
        output.innerHTML=output.innerHTML+addcontent;
        poshtml.innerHTML=this.pos;
        // inputHtml.innerHTML=`<span id="username">benjaminfalcon@benjaminfalcon</span>:<span class="icon">${this.pos}</span><span id="dao">&nbsp;$</span>`+
        // '<input type="text" id="inputarea" autocomplete="off" spellcheck="false">'
        input.value='';
        this.more=[];
    }
    var myhandler = new handler();
    input.addEventListener("keydown",function(event){
        if(event.keyCode == 13){
            myhandler.handlecmd(input.value);
        }
    })
};