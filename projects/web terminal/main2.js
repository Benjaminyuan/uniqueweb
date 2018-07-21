window.onload=function(){
    var result;
    var mydate = new Date();
    var tempJSON={};
    //中间变量 用于提取出一层结构的JSON
    var tempArray=[];
    var tempArray1=[];
    var tempPos='';
    var tempPos1='';
    //中间变量 存储当前的this.pos
    var cmdList={
        LS:{value:"ls",support:'ls,ls-a,ls-l,ls-la'},
        RM:{value:"rm",support:'remove file,remove -r folder'},
        MKDIR:{value:"mkdir",support:'mkdir file'},
        TOUCH:{value:"touch",support:'touch'},
        LN:{value:"ln",support:'ln,ln-s'},
        CP:{value:"cp",support:'cp file|folder,cp ./../../folder ./../../folder'},
        CAT:{value:"cat",support:'cat file'},
        ECHO:{value:"echo",support:'echo string'},
        CLEAR:{value:"clear",support:'clear'},
        CD:{value:"cd",support:'cd ../.../'}
    };
    var Handler= function(Storage){
        this.cmd ='';
        this.textarea=document.createElement("textarea");
        this.output = document.getElementById("output");
        this.inputarea=document.getElementById("inputarea");
        this.input = document.getElementById("input");
        this.more=[];//执行命令网页的显示的结果
        this.myStorage=localStorage;
        this.FILE={//文件夹数据结构
            'Desktop':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
            'Secret':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'ture'},
            'Home':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
            'Music':{'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}      
        };
        this.temp=JSON.stringify(this.FILE);
        this.myStorage.setItem('file',this.temp);
        this.myStorage.setItem('Desktop',JSON.stringify({'application':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'}}));
        this.myStorage.setItem('application',JSON.stringify({'vscode':{'type':'folder','authority':'drwxr-xr-x',
            'size':4096,'lastchange':'2018/7/18 下午3:36:13','hidden':'false'},
        'note':{'type':'file','pointer':'note','authority':'drwxr-xr-x',
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
         'mixier','size':40,'lastchange':'','authority':'drwxr-xr-x','ln':['note'],
            'hidden':'false','type':'file'}))
            //当前只有一个指向note文件
            //TODO:文件数据结构 ln属性的值是一个数组，表示指向其位置的指针，第一项是储存在localStorage的项。
        this.pos='~';//TODO:当前路径名
        this.posfile=this.FILE;//文件’指针‘，指向当前目录
    }   
    Handler.prototype.handlecmd=function(value){
        var cmdWords = value.trim().split(/\s+/);//处理输入的命令字符串
        console.log(cmdWords);
        switch(cmdWords[0]){
            case cmdList.LS.value:
                this.ls(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.MKDIR.value:
                this.mkdir(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.TOUCH.value:
                this.touch(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.LN.value:
                this.ln(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.CP.value:
                this.cp(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.RM.value:
                this.rm(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.CAT.value:
                this.cat(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.ECHO.value:
                this.echo(cmdWords);
                console.log(cmdWords);
                this.next();
                break;
            case cmdList.CLEAR.value:
                this.clear();
                console.log(cmdWords);
                break;
            case cmdList.CD.value:
                this.cd(cmdWords);
                this.next();
                break;
            case '':
                this.next();
                break;
            case '--help':
                this.help();
                this.next();
                break;
            default:
                this.more=['Commad','not','found!'];
                this.next();
                break;
        }
    };
    Handler.prototype.help= function(){
        var key;
        var key2;
        var tempString;
        for(key in cmdList){
            for(key2 in cmdList[key]){
                tempString+=key2+':'+cmdList[key][key2]+'\n';
            }
            this.more.push('\n'+key+':'+tempString+'\n\n');
            tempString='';
        }
    }
    Handler.prototype.rm = function(cmdWords){
        if(cmdWords.length===2&&cmdWords[1]!=='-r'){
            if(cmdWords[1] in this.posfile){
                if(this.pos==='~'){
                    //根目录情况
                    delete this.posfile[cmdWords[1]];
                    console.log(this.posfile)
                    this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
                }
                else{
                    console.log(this.posfile)
                    delete this.posfile[cmdWords[1]];
                    this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                }
            }
            else {
                    this.more=['folder','not','exist'];
            }
        }
        else if(cmdWords.length===2&&cmdWords[1]==='-r'){
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
    Handler.prototype.cat= function(cmdWords){
        if(cmdWords.length===2){
            //cat filename 的情况
            if(cmdWords[1] in this.posfile&&this.posfile[cmdWords[1]]['type']==='file'){
               this.more.push(JSON.parse(this.myStorage.getItem(cmdWords[1]))['content']);
            }
            else if(cmdWords[1] in this.posfile&&this.posfile[cmdWords[1]]['type']==='file-ln'){
                this.more.push(JSON.parse(this.myStorage.getItem(this.posfile[cmdWords[1]]['pointer']))['content']);
            }
            else{
                this.more=['file','not','exist']
            }
        }
        else if(cmdWords.length===3){
            // cat > filename 的形式 UNDO
            console.log(cmdWords);
            console.log(cmdWords[1]==='>');
           if(cmdWords[1]==='>'){
                console.log((cmdWords[2] in this.posfile));
                console.log(this.posfile[cmdWords[2]]['type']==='file')
                if((cmdWords[2] in this.posfile)&&this.posfile[cmdWords[2]]['type']==='file'){
                    this.more.push('\n'+this.addinputarea(cmdWords));
                    //获取用户信息
                    console.log(this.more);
                   tempJSON=JSON.parse(this.myStorage.getItem(cmdWords[2]));
                   tempJSON['content']=this.more[this.more.length-1];
                   this.myStorage.setItem(cmdWords[2],JSON.stringify(tempJSON));
                   //移除输入文本框
                    this.input.removeChild(this.textarea);
                }
                else if((cmdWords[2] in this.posfile)&&this.posfile[cmdWords[2]['type']==='file-ln']){
                    this.more.push(cmdWords);
                    this.more.push('\n'+this.addinputarea(cmdWords));
                     //获取用户信息，更新存储
                    tempJSON=JSON.parse(this.myStorage.getItem(this.posfile[cmdWords[2]]['pointer']['content']));
                    tempJSON['content']=this.more[this.more.length-1];
                    this.myStorage.setItem(this.posfile[cmdWords[2]]['pointer']['content'],JSON.stringify(tempJSON));
                    //移除输入文本框
                    this.input.removeChild(this.textarea);
                 }//UNDO
           }
        }
        //code
    };
    Handler.prototype.addinputarea= function(cmdWords){
        this.textarea.id='input-area';
        this.input.appendChild(this.textarea);
        this.textarea.focus();
        var flag=1;
        console.log(flag);
        while(flag){
        this.textarea.addEventListener("keydown",event =>{
            while(event.ctrlKey&&event.keyCode==67){
                console.log('debug');
                flag=0;
                return this.textarea.value;
            }
        });
     }
        console.log(cmdWords);
    }
    Handler.prototype.echo=function(cmdWords){
        console.log(cmdWords.indexOf('>'));
        if(cmdWords.indexOf('>')===-1){
            console.log(cmdWords);
            cmdWords.shift();
            this.more=cmdWords;
        }
        else if(cmdWords.indexOf('>')===cmdWords.length-2){
            console.log()
            if(cmdWords[cmdWords.length-1].indexOf('/')===-1){
                console.log(cmdWords.slice(1,length-2));
                this.posfile[cmdWords[cmdWords.length-1]]={'type':'file','authority':'drwxr-xr-x','size':0,
                'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                this.myStorage.setItem(cmdWords[cmdWords.length-1],JSON.stringify({'type':'file','authority':'drwxr-xr-x',
                'content':cmdWords.slice(1,length-2).join(' '),'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}));
                if(this.pos==='~'){
                    this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
                }
                else{
                    this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                }
            }else if(cmdWords[cmdWords.length-1].match(/([\.|\.\.|\w]\/)+/)){
                    //需要cd的情况
                    tempArray=cmdWords[cmdWords.length-1].split('/');
                    tempArray.pop();
                    this.more=[''];
                    nowFile=this.posfile;
                    nowPosition=this.pos;
                    console.log(tempArray);
                    console.log(tempArray.join('/'));
                    this.cd(['cd',tempArray.join('/')]);
                    console.log(this.more[0]==='');
                    console.log(this.more);
                    if(this.more[0]===''){
                        this.posfile[cmdWords[cmdWords.length-1].split('/').pop()]={'type':'file','authority':'drwxr-xr-x','size':0,
                        'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                        this.myStorage.setItem(cmdWords[cmdWords.length-1].split('/').pop(),JSON.stringify({'type':'file','authority':'drwxr-xr-x',
                        'content':cmdWords.slice(1,length-2).join(' '),'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}));
                        if(this.pos==='~'){
                            this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
                        }
                        else{
                            this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                        }
                        this.more=[];
                    }else{
                        this.more=['folder','not','exist'];
                    }
                    this.pos=nowPosition;
                    this.posfile=nowFile;
            }

        }
        else{
            this.more=['Command','not','found'];
        }
    };
    Handler.prototype.mkdir = function(cmdWords){
        if(cmdWords.length===2){
            if(cmdWords[1] in this.posfile){
                this.more = ['folder','exist','already'];
            }else{
                this.posfile[cmdWords[1]]={'type':'folder','authority':'drwxr-xr-x',
                'size':4096,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                if(this.pos==='~'){
                    this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
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
    Handler.prototype.cp = function(cmdWords){
        var nowPosition=this.pos;
        var nowFile = this.posfile;
        //调用this.cd()会改变this.pos,this.posfile
        //所以要先保存当前目录信息
        if(cmdWords.length===3&&cmdWords[1] in this.posfile){
            //cp file|folder folder 形式
            this.more=[""];
            this.cd(['cd',cmdWords[2]]);
            //寻找转移目录是否存在
            console.log(nowPosition===this.posifile);
            console.log(this.more[0]==='');
            console.log(this.more);
            if(this.more[0]===''){//判断是否存在
            this.posfile[cmdWords[1]]=nowFile[cmdWords[1]];
            //更新目录信息
            tempArray= this.pos.split('/');
            this.myStorage.setItem(tempArray[tempArray.length-1],JSON.stringify(this.posfile));
            }
            else{
            this.more=['target-folder','not','exist'];
            }     
        }
        else if(cmdWords.length===4){
            //cp -r /../../folder /../.../folder 形式
            if(cmdWords[1]==='-r'){
                this.more[0]='';
                this.cd(['cd',cmdWords[2]]);
                //寻找目标目录1是否存在
                console.log(this.more);
                console.log(this.more[0]==='');
                if(this.more[0]===''){
                //目标目录1存在时进入
                //先存储目标目录1的信息,然后使this相关的目录信息指向当前目录
                    tempPos1= this.pos;
                    console.log(this.pos);
                    this.pos=nowPosition;
                    this.posfile=nowFile;
                //--------------------------------
                //寻找目标目录2是否存在
                    this.cd(['cd',cmdWords[3]]);
                    console.log(this.more[0]==='');
                    if(this.more[0]===''){
                        //存在时进入
                        //获取目标文件夹-1的相关信息
                        tempArray=tempPos1.split('/');
                        console.log(tempArray);
                        if(tempArray.length==2){
                            //上一级为根目录情况
                            tempJSON = JSON.parse(this.myStorage.getItem('FILE'));
                        }else{
                            //上一级不为根目录
                            tempJSON = JSON.parse(this.myStorage.getItem(tempArray[tempArray.length-2]));
                        } 
                        //--------------------------------------
                        //将信息存入目标目录-2
                            console.log(tempJSON);
                            console.log(tempArray[tempArray.length-1]);
                            this.posfile[tempArray[tempArray.length-1]]=tempJSON[tempArray[tempArray.length-1]];
                            console.log(this.posfile);
                            this.myStorage.setItem(this.pos.split('/').pop(),JSON.stringify(this.posfile));
                        //----------------------------------------------
                    }

                }
                else{
                this.more=['target-folder-1','not','exist'];
                }  
            }
        }
        else{
            this.more=['file','not','exist'];
        }
        //目录指针修复
        this.pos=nowPosition;
        this.posfile=nowFile;
        this.more=[];//美化输出。。。
    };
    Handler.prototype.touch = function(cmdWords){
        if(cmdWords.length===2){
            if(cmdWords[1] in this.posfile){
                //code
            }else{
                this.posfile[cmdWords[1]]={'type':'file','pointer':cmdWords[1],'authority':'drwxr-xr-x','pointer':cmdWords[1],
                'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                this.myStorage.setItem(cmdWords[1],JSON.stringify({'type':'file','authority':'drwxr-xr-x','ln':[cmdWords[1]],'content':'',
                'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}));
                if(this.pos==='~'){
                    this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
                }
                else{
                    tempArray= this.pos.split('/');
                    this.myStorage.setItem(tempArray[tempArray.length-1],JSON.stringify(this.posfile));
                }
            }
         }
        else if(cmdWords.length===1){
            this.more=['less','arguement'];
        }
        else if(cmdWords.length>=3){
            this.more=['too','much','arguement'];
        }
    };
    Handler.prototype.ln = function(cmdWords){
        if(cmdWords.length===3&&!(cmdWords[2] in this.posfile)){
            //创建硬链接
            console.log(cmdWords[1]  in this.posfile);
            if(cmdWords[1] in this.posfile&&this.posfile[cmdWords[1]]['type']==='file'){
                //更新当前文件目录
                this.posfile[cmdWords[2]]={'type':'file-ln','pointer':cmdWords[1],'authority':'drwxr-xr-x',
                'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                if(this.pos==='~'){
                    this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
                }
                else{
                    tempArray= this.pos.split('/');
                    this.myStorage.setItem(tempArray[tempArray.length-1],JSON.stringify(this.posfile));
                    tempArray='';
                }
                //-------------------------------------------------------------------
                //更新文件的指针数量
                console.log(this.myStorage.getItem(cmdWords[1]));
                tempJSON= JSON.parse(this.myStorage.getItem(cmdWords[1]));
                tempJSON['ln'].push(cmdWords[2]);
                this.myStorage.setItem(cmdWords[1],tempJSON.stringify);
                tempJSON={};
                //----------------------------------------------------------------------
            }
            else{
                this.more=['file','not','exist'];
            }
        }
        else if(cmdWords.length===4&&cmdWords[1]==='-s'){
            if(cmdWords[2] in this.posfile&&this.posfile[cmdWords[2]]['type']==='file'){
                //更新当前文件目录
                this.posfile[cmdWords[3]]={'type':'ln-s','pointer':cmdWords[2],
                'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                if(this.pos==='~'){
                    this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
                }
                else{
                    tempArray= this.pos.split('/');
                    this.myStorage.setItem(tempArray[tempArray.length-1],JSON.stringify(this.posfile));
                    tempArray='';
                }
            }else if(cmdWords[2] in this.posfile&&this.posfile[cmdWords[2]]['type']==='file-ln'){
                this.posfile[cmdWords[3]]={'type':'ln-s','pointer':this.posfile[cmdWords[2]]['pointer'],
                'size':0,'lastchange':`${mydate.toLocaleString().replace(/,/g,'')}`,'hidden':'false'}
                if(this.pos==='~'){
                    this.myStorage.setItem('FILE',JSON.stringify(this.posfile));
                }
                else{
                    tempArray= this.pos.split('/');
                    this.myStorage.setItem(tempArray[tempArray.length-1],JSON.stringify(this.posfile));
                    tempArray='';
                }
                
            }
        }else{
            this.more=['Please','check','your','arguement'];
        }
};
    Handler.prototype.ls= function(cmdWords){
        let key;
        var key1;
        var tempstring='';
        if(cmdWords.length === 1){
            for(key in this.posfile){
                if(this.posfile[key]['hidden']==='false'){
                    this.more.push(key); 
                }
            }
        }
        else if(cmdWords[1]=='-l'){
            this.more.push('');
            for(key in this.posfile){
                if(this.posfile[key]['hidden']==='false'){
                    for(key1 in this.posfile[key]){
                        if(key1!=='hidden'&&key1!=='ln'&&key1!=='pointer')
                        //排除无须输出的内容
                        tempstring+=this.posfile[key][key1]+'&emsp;';
                    }
                    this.more.push(tempstring+key+'\n'); 
                    tempstring=''; 
                    }
                }
        }
        else if(cmdWords[1]==='-a'){
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
        else if(cmdWords[1]==='-la'){
            this.more.push('');
            //为了对齐。。。。
            for(key in this.posfile){
                for(key1 in this.posfile[key]){
                    if(key1!=='hidden'&&key1!=='ln'&&key1!=='pointer')
                    //排除无须输出的内容
                    tempstring+=this.posfile[key][key1]+'&emsp;';
                }
                if(this.posfile[key]['hidden']==='false'){
                    this.more.push(tempstring+key+'\n'); 
                    tempstring=''; 
                }
                else{
                    this.more.push(tempstring+'.'+key+'\n'); 
                    tempstring=''; 
                }
                console.log(this.more); 
            }  
        }
        else{
            this.more=['please','check','your','arguement'];
        }   
     };
    Handler.prototype.cd=function(cmdWords){
        let i=0;
        var flag=1;
        console.log(cmdWords);
        if(cmdWords.length>1&&cmdWords[1].match(/\//))//cd有多层次跳跃
        {
            tempArray=cmdWords[1].split('/');//cd 的文件目录 
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
                            this.posfile = JSON.parse(this.myStorage.getItem('FILE'));
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
                tempPos='';
                tempJSON={};
                flag=1;//重置flag
            }
            else{//直接再当前目录下cd的情况
                    tempJSON= this.posfile;
                    if(tempArray[0]==='~'){
                        //如果输入绝对路径，那么先修改目录指针
                        this.posfile=JSON.parse(this.myStorage.getItem('FILE'));
                        tempPos='~';
                        for(i=1;i<tempArray.length;i++){
                            //向下查找目录
                            if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
                                this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));//文件指针的位置 
                                tempPos+='/'+tempArray[i];    
                            }
                            else if(tempArray[i]!==''){
                            this.more=['Error','the','folder','not','exist'];
                            flag=0;
                            }
                        }

                    }
                    else{
                        for(i=0;i<tempArray.length;i++){
                            //向下查找目录
                            if(tempArray[i] in this.posfile&&this.posfile[tempArray[i]]['type']==='folder'){
                                this.posfile = JSON.parse(this.myStorage.getItem(tempArray[i]));//文件指针的位置 
                                tempPos+='/'+tempArray[i];    
                            }
                            else if(tempArray[i]!==''){
                            this.more=['Error','the','folder','not','exist'];
                            flag=0;
                            }
                        }
                    }
                    if(flag===1){
                        this.pos=tempPos;
                    }
                    else{
                        this.posfile=tempJSON;
                    }
                    tempPos='';
                    tempJSON={};
                    flag=1;//重置flag
            }
        }
        else if(cmdWords.length>1){
            if(cmdWords[1] in this.posfile&&this.posfile[cmdWords[1]]['type']==='folder'){
                this.posfile = JSON.parse(this.myStorage.getItem(cmdWords[1]));//文件指针的位置  
                this.pos+='/'+cmdWords[1];   
            }
            else{
                this.more=['the','folder','not','exist'];
            }
        }
        else{
            this.more=[''];
        }
        

    }
    Handler.prototype.clear = function (){
        this.output.innerHTML='';
        this.inputarea.value='';
    };
    Handler.prototype.next = function(){
        let morehtml='';
        for(let i=0;i<this.more.length;i++){
            morehtml+='<span>'+this.more[i].replace(/\n/,'<br>')+'&emsp;&emsp;</span>';
        }
        morehtml='<div>'+morehtml+'</div>';
        let poshtml=document.getElementById("pos");
        let addcontent='<div><span id="username">benjaminfalcon@benjaminfalcon</span>'+
        ':<span class="icon">'+poshtml.innerHTML+'</span><span>$ '+this.inputarea.value+'</span></div>'+
        morehtml;
        this.output.innerHTML=this.output.innerHTML+addcontent;
        poshtml.innerHTML=this.pos;
        // inputHtml.innerHTML=`<span id="username">benjaminfalcon@benjaminfalcon</span>:<span class="icon">${this.pos}</span><span id="dao">&nbsp;$</span>`+
        // '<input type="text" id="inputarea" autocomplete="off" spellcheck="false">'
        this.inputarea.value='';
        this.more=[];
    }
    
    var myHandler = new Handler();
    myHandler.inputarea.focus();
    myHandler.inputarea.addEventListener("keydown",function(event){
        if(event.keyCode == 13){
            myHandler.handlecmd(myHandler.inputarea.value);
        }
    })
};