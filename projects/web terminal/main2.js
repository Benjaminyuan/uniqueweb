window.onload=function(){
    var result;
    var mydate = new Date();
    var input=document.getElementById("inputarea");
    input.focus();
    var tempJSON={};
    //中间变量 用于提取出一层结构的JSON
    var tempArray=[];
    var tempArray1=[];
    var tempPos='';
    //中间变量 存储当前的this.pos
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
    var Handler= function(Storage){
        this.cmd ='';
        this.output = document.getElementById("output");
        this.inputselector = document.getElementById("input");
        this.more=[];//执行命令网页的显示的结果
        this.myStorage=localStorage;
        this.file={//文件夹数据结构
            'Desktop':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
            'Secret':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'ture'},
            'Home':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
            'Music':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}      
        };
        this.temp=JSON.stringify(this.file);
        this.myStorage.setItem('file',this.temp);
        this.myStorage.setItem('Desktop',JSON.stringify({'application':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}}));
        this.myStorage.setItem('application',JSON.stringify({'vscode':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
        'note':{'type':'file','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
        'projects':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}}));
        this.myStorage.setItem('Home',JSON.stringify({'Desktop':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}}));
        this.myStorage.setItem('projects',JSON.stringify({'python':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
        'js':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}}));
        this.myStorage.setItem('Music',JSON.stringify({'rap':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
            'pop':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}}));
        this.myStorage.setItem('note',JSON.stringify({'content':'go with the wind written by \n '+
         'mixier','size':40,'lastchange':'','authority':'drwxr-xr-x',
            'hidden':'false','type':'file'}))
            //TODO:文件数据结构
        this.pos='~';//TODO:当前路径名
        this.posfile=this.file;//文件’指针‘，指向当前目录
    }   
    Handler.prototype.handlecmd=function(value){
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
                this.cat(cmdwords);
                console.log(cmdwords);
                // this.next();
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
            case '':
                this.next();
                break;
            default:
                this.more=['Commad','not','found!'];
                this.next();
                break;
        }
    };
    Handler.prototype.rm = function(cmdwords){
        if(cmdwords.length===2&&cmdwords[1]!=='-r'){
            if(cmdwords[1] in this.posfile){
                if(this.pos==='~'){//根目录情况
                    delete this.posfile[cmdwords[1]];
                    console.log(this.posfile)
                    this.myStorage.setItem('file',JSON.stringify(this.posfile));
                }
                else{
                    console.log(this.posfile)
                    delete this.posfile[cmdwords[1]];
                    this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                }
            }
            else {
                    this.more=['folder','not','exist'];
            }
        }
        else if(cmdwords.length===2&&cmdwords[1]==='-r'){
                    for(var prop in this.posfile){
                        this.myStorage.removeItem(prop);
                    }
                    this.posfile={};
                    this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
        }
        else{
            this.more=['less','arguement'];
        }
    }
    Handler.prototype.cat= function(cmdwords){
        if(cmdwords.length===2){
            if(cmdwords[1] in this.posfile&&this.posfile[cmdwords[1]]['type']==='file'){
               this.more.push(JSON.parse(this.myStorage.getItem(cmdwords[1]))['content']);
            }
        }
        else if(cmdwords.length===3){
            console.log(cmdwords);
           if(cmdwords[1]==='>'){
            //    if(cmdwords[2] in this.posfile&&this.posfile[cmdwords[2]['type']==='file']){
                   this.addinputarea(cmdwords);
            //    }
           }
        }
        //code
    };
    Handler.prototype.addinputarea= function(cmdwords){
        var textarea=document.createElement("textarea");
        textarea.className='input-area';
        this.inputselector.appendChild(textarea);
        this.inputselector.focus();
        console.log(cmdwords);
    }
    Handler.prototype.echo=function(cmdwords){
        console.log(">" in cmdwords);
        if(!(cmdwords.search('>'))){
            console.log(cmdwords);
            cmdwords.shift();
            this.more=cmdwords;
        }
        //未完成
        else if(cmdwords.indexOf('>')===cmdwords.length-2){
                this.posfile[cmdwords.pop]={'type':'file','authority':'drwxr-xr-x','size':0,
                'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                this.myStorage.setItem(cmdwords[1],JSON.stringify({'type':'file','authority':'drwxr-xr-x',
                'content':cmdwords[1,cmdwords.length-2].join(),'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}));
                if(this.pos==='~'){
                    this.myStorage.setItem('file',JSON.stringify(this.posfile));
                }
                else{
                    this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                }

        }
        //未完成
    };
    Handler.prototype.mkdir = function(cmdwords){
        if(cmdwords.length===2){
            if(cmdwords[1] in this.posfile){
                this.more = ['folder','exist','already'];
            }else{
                this.posfile[cmdwords[1]]={'type':'folder','authority':'drwxr-xr-x',
                'size':'4096','lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
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
    Handler.prototype.cp = function(cmdwords){
        //code
    };
    Handler.prototype.touch = function(cmdwords){
        if(cmdwords.length===2){
            if(cmdwords[1] in this.posfile){
                //code
            }else{
                this.posfile[cmdwords[1]]={'type':'file','authority':'drwxr-xr-x',
                'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                this.myStorage.setItem(cmdwords[1],JSON.stringify({'type':'file','authority':'drwxr-xr-x','content':'',
                'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}));
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
    Handler.prototype.ln = function(cmdword){
        //code
    }
    Handler.prototype.ls= function(cmdwords){
        let key;
        var key1;
        var tempstring='';
        if(cmdwords.length === 1){
            for(key in this.posfile){
                if(this.posfile[key]['hidden']==='false'){
                    this.more.push(key); 
                }
            }
        }
        else if(cmdwords[1]=='-l'){
            for(key in this.posfile){
                if(this.posfile[key]['hidden']==='false'){
                    for(key1 in this.posfile[key]){
                        if(key1!=='hidden')
                        tempstring+=this.posfile[key][key1]+'&emsp;';
                    }
                    this.more.push(tempstring+key+'\n'); 
                    tempstring=''; 
                    }
                }
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
    Handler.prototype.cd=function(cmdwords){
        let i=0;
        let flag=1;
        console.log(cmdwords);
        if(cmdwords.length>1&&cmdwords[1].match(/\//))//cd有多层次跳跃
        {
            tempArray=cmdwords[1].split('/');//cd 的文件目录 
            tempArray1 = this.pos.split('/');//位置
            tempJSON = this.posfile;
            tempPos=this.pos;//暂时存储当前文件信息
            console.log(tempArray);
            if(tempArray[0]==='.'||tempArray[0]==='..'){//形如 ./Desktop的操作处理
                for(i=0;i<tempArray.length;i++){//检查合法性
                    console.log(this.posfile);
                    console.log(tempArray[i] in this.posfile);
                    if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
                        console.log(tempArray[i]);
                        this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));  
                        tempPos+='/'+tempArray[i]; 
                    }
                    else if(tempArray[i]==='..'&&tempPos!='~')
                    {   
                        tempPos=tempPos.replace('/'+tempArray1.pop(),'');//返回上一级
                        console.log(tempPos);//调试
                        console.log(tempArray1);
                        if(tempArray1.length==1){
                            //根目录情况
                            this.posfile = JSON.parse(this.myStorage.getItem('file'));
                        }else{
                            //不在根目录
                            this.posfile = JSON.parse(this.myStorage.getItem(tempArray1[tempArray1.length-1]));
                        }    
                    }
                    else if(tempArray[i]==='.'){
                            //在当前目录，无须改变
                            //调试
                        console.log(tempArray1);
                    }
                    else if(tempArray[i]!==''){
                        //在./后面有东西但是没有匹配成功时进入
                        this.more=['Error','the','file','not','exist'];
                        flag=0;
                        break;
                    } 
                }
                if(flag){
                    this.pos=tempPos;
                    //判断是否出现了文件不存在的情况,该情况为存在
                }
                else{
                    this.posfile=tempJSON;
                    //出现文件不存在的情况
                }
                flag=1;//重置flag
            }
            // else if(tempArray[0]==='..'){
            //     tempPos=tempPos.replace('/'+tempArray1.pop(),'');//返回上一级
            //     console.log(tempPos);//调试
            //     console.log(tempArray1);
            //     this.posfile = JSON.parse(this.myStorage.getItem(tempArray1[tempArray1.length-1]));//文件指针的位置
            //     for(i=1;i<tempArray.length;i++){
            //         //检查合法性
            //         console.log(tempArray[i] in this.posfile);
            //         if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
            //             console.log(tempArray[i]);
            //             this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));    
            //         }
            //         else if(tempArray[i]==='.')
            //         {
            //             //在当前目录，无须改变
            //             console.log(this.pos);//调试
            //             console.log(tempArray1);
                        
            //         }
            //         else if(tempArray[i]!==''){
            //             //在../后面有东西但是没有匹配成功时进入
            //             this.more=['Error','the','file','not','exist'];
            //             flag=0;
            //             break;
            //         } 
            //     }
            //     if(flag&&tempArray[1]!==''){
            //         this.pos+=cmdwords[1].replace('.','');
            //         //判断是否出现了文件不存在的情况
            //     }
            //     else{
            //         this.posfile=tempJSON;
            //         //出现文件不存在的情况
            //     }
            //     flag=1;//重置flag
            //     this.pos=this.pos.replace('/'+tempArray1.pop(),'');//返回上一级
            //     console.log(this.pos);//调试
            //     console.log(tempArray1);
            //     this.posfile = JSON.parse(this.myStorage.getItem(tempArray1[tempArray1.length-1]));//文件指针的位置
            //     if(tempArray[1]!==''){
            //         for(i=1;i<tempArray.length;i++){//向下查找目录
            //             if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
            //                 this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));//文件指针的位置    
            //             }
            //             else{
            //                 this.more=['Error','the','folder','not','exist'];
            //                 flag=0;
            //                 break;
            //             } 
            //         }
            //         if(flag){//判断是否出现了文件不存在的情况
            //             this.pos+=cmdwords[1].replace('..','');
                
            //         }
            //         flag=1;
            //     }  
            // }
            // else{//直接再当前目录下cd的情况
            //         for(i=0;i<tempArray.length;i++){//向下查找目录
            //             if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
            //                 this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));//文件指针的位置    
            //             }
            //         else{
            //             this.more=['Error','the','folder','not','exist'];
            //             flag=0;
            //             break;
            //             } 
            //         }
            //         if(flag){
            //         this.pos=this.pos+'/'+cmdwords[1];//判断是否出现了文件不存在的情况
            //         }
            //         else{
            //             this.posfile=tempJSON;
            //         }
            //         flag=1;//重置flag
            // }
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
    Handler.prototype.clear = function (){
        this.output.innerHTML='';
        input.value='';
    };
    Handler.prototype.next = function(){
        let morehtml='';
        for(let i=0;i<this.more.length;i++){
            morehtml+='<span>'+this.more[i].replace(/\n/,'<br>')+'&emsp;&emsp;</span>';
        }
        morehtml='<div>'+morehtml+'</div>';
        let poshtml=document.getElementById("pos");
        let addcontent='<div><span id="username">benjaminfalcon@benjaminfalcon</span>'+
        ':<span class="icon">'+poshtml.innerHTML+'</span><span>$ '+input.value+'</span></div>'+
        morehtml;
        this.output.innerHTML=this.output.innerHTML+addcontent;
        poshtml.innerHTML=this.pos;
        // inputHtml.innerHTML=`<span id="username">benjaminfalcon@benjaminfalcon</span>:<span class="icon">${this.pos}</span><span id="dao">&nbsp;$</span>`+
        // '<input type="text" id="inputarea" autocomplete="off" spellcheck="false">'
        input.value='';
        this.more=[];
    }
    var myHandler = new Handler();
    input.addEventListener("keydown",function(event){
        if(event.keyCode == 13){
            myHandler.handlecmd(input.value);
        }
    })
};