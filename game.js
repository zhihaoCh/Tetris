function Game() {
    var _this = this;
    this.play = true;
    this.frame = 650;
    this.lastFrame = 0;
    this.CDCode = 700;//方块生成速度
    this.frame1 = 0;
    this.lastFrame1 = 0;
    this.CDCode1 = 40;//方块移动间隔
    this.frame2 = 0;
    this.lastFrame2 = 0;
    this.CDCode2 = 3;//连续操作时间间隔
    this.drop = new Drop();
    this.render = function () {
        if (_this.frame >= _this.lastFrame + _this.CDCode){
            _this.drop.createDrop();
            _this.lastFrame = _this.frame;
        }
        if (_this.drop.dead == true){
            _this.frame = _this.lastFrame + _this.CDCode;
        }
    };
    this.update = function(){
        if (_this.play == true){
            _this.frame++;
            _this.frame1++;
            _this.frame2++;
            _this.render();
            _this.updateShape();
            if (_this.frame1 >= _this.lastFrame1 + _this.CDCode1){
                _this.drop.update();
                _this.lastFrame1 = _this.frame1;
            }
            window.requestAnimationFrame(_this.update);
        }
    };
    this.updateShape = function () {
        //键盘方向控制方块运动
            document.onkeydown = function (e) {
                _this.frame-=10;
                _this.frame1-=3;
                if (_this.frame2 >= _this.lastFrame2 + _this.CDCode2){
                if (e.keyCode == 37){
                    _this.drop.dropList.forEach(function (val) {
                        if (val[0]> 0 && val[2]> 0 && val[4]> 0 && val[6]> 0){
                            //保证移动不会移动到已经存在的方块上
                            if (_this.drop.wrapper[val[1]][--val[0]]==0&&_this.drop.wrapper[val[3]][--val[2]]==0&&_this.drop.wrapper[val[5]][--val[4]]==0&&_this.drop.wrapper[val[7]][--val[6]]==0) {
                                /*val[0]-=1;
                                val[2]-=1;
                                val[4]-=1;
                                val[6]-=1;*/
                                console.log(666);
                                _this.drop.draw();
                            }
                        }
                    })
                }
                if (e.keyCode == 38){
                    _this.drop.dropList.forEach(function (val) {
                        console.log(_this.drop.wrapper);
                        console.log(_this.drop.temp);
                        console.log(val);
                        var temp0 = val[0];//x1
                        var temp1 = val[1];//y1
                        var temp2 = val[2];//x2
                        var temp3 = val[3];//y2
                        var temp6 = val[6];//x4
                        var temp7 = val[7];//y4
                        if (val[4] - temp1 + val[5]>=0&&val[4] - temp1 + val[5]<10&&val[4] - temp3 + val[5]>=0&&val[4] - temp3 + val[5]<10&&val[4] - temp7 + val[5]>=0&&val[4] - temp7 + val[5]<10)//保证变换后横坐标不会超出边界
                        {
                            if (val[5] + temp0 - val[4]<15&&val[5] + temp2 - val[4]<15&&val[5] + temp6 - val[4]<15){
                                //保证图形变换后纵坐标不会超出边界
                                if (_this.drop.wrapper[val[5] + temp0 - val[4]][val[4] - temp1 + val[5]]==0&&_this.drop.wrapper[val[5] + temp2 - val[4]][val[4] - temp3 + val[5]]==0&&_this.drop.wrapper[val[5]][val[4]]==0&&_this.drop.wrapper[val[5] + temp6 - val[4]][val[4] - temp7 + val[5]] == 0) {
                                    val[0] = val[4] - temp1 + val[5];
                                    val[1] = val[5] + temp0 - val[4];
                                    val[2] = val[4] - temp3 + val[5];
                                    val[3] = val[5] + temp2 - val[4];
                                    val[6] = val[4] - temp7 + val[5];
                                    val[7] = val[5] + temp6 - val[4];
                                    _this.drop.draw();
                                }
                            }
                        }
                    })
                }
                if (e.keyCode == 39){
                    _this.drop.dropList.forEach(function (val) {
                        if (val[0]< 9 && val[2]< 9 && val[4]< 9 && val[6]< 9) {
                            if (_this.drop.wrapper[val[1]][val[0]+1]==0&&_this.drop.wrapper[val[3]][val[2]+1]==0&&_this.drop.wrapper[val[5]][val[4]+1]==0&&_this.drop.wrapper[val[7]][val[6]+1]==0) {
                                val[0]+=1;
                                val[2]+=1;
                                val[4]+=1;
                                val[6]+=1;
                                _this.drop.draw();
                            }
                        }
                    })
                }
                if (e.keyCode == 40){
                    _this.drop.dropList.forEach(function (val) {
                        if (val[1]<_this.drop.temp[val[0]]&&val[3]<_this.drop.temp[val[2]]&&val[5]<_this.drop.temp[val[4]]&&val[7]<_this.drop.temp[val[6]]) {
                            _this.drop.updatePos();
                            _this.drop.draw();
                        }
                    })
                }
                    _this.lastFrame2 = _this.frame2;
            }
        }
    };
}
function Drop() {
    var _this = this;
    this.drop = null;
    this.dead = false;
    this.dropList = [];
    this.wrapper = [];
    this.temp = [];
    this.level= 0;
    this.score = 0;
    /*this.color;
    this.color1 = ['purple','blue','green','gray','pink','orange','yellow'];*/
    for (var i = 0;i < 10;i++){
        _this.temp.push(15);
    }
    for(var i = 0;i < 16; i++){
        _this.wrapper[i] = [];
        for(var j = 0;j < 10; j++){
            _this.wrapper[i][j] = 0;
        }
    }
    this.update = function () {
        _this.updatePos();
        _this.draw();
    };
    this.createDrop = function () {
        _this.dead = false;
        //var kind = 1;
        var kind = Math.floor(Math.random()*7);
        switch (kind) {
            case 0:_this.drop = [3,0,4,0,3,1,4,1];break;//_this.color = _this.color1[0];
            case 1:_this.drop = [3,0,3,1,3,2,4,2];break;//_this.color = _this.color1[1];
            case 2:_this.drop = [3,0,3,1,3,2,3,3];break;//_this.color = _this.color1[2];
            case 3:_this.drop = [4,0,3,1,4,1,4,2];break;//_this.color = _this.color1[3];
            case 4:_this.drop = [4,0,4,1,3,2,4,2];break;//_this.color = _this.color1[4];
            case 5:_this.drop = [3,0,4,0,4,1,5,1];break;//_this.color = _this.color1[5];
            case 6:_this.drop = [4,0,5,0,3,1,4,1];break;//_this.color = _this.color1[6];
        }
        this.dropList.push(_this.drop);
    };
    this.draw = function () {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        _this.dropList.forEach(function (val) {
            ctx.beginPath();
            ctx.rect(val[0]*25,val[1]*25,25,25);
            ctx.rect(val[2]*25,val[3]*25,25,25);
            ctx.rect(val[4]*25,val[5]*25,25,25);
            ctx.rect(val[6]*25,val[7]*25,25,25);
            ctx.fillStyle = /*_this.color;*/'#'+ Math.random().toString(16).substr(-6);//落下前颜色随机
            ctx.strokeStyle = 'red';
            ctx.fill();
            ctx.stroke();
        });
        for (var i = 0;i < 16;i++){
            for (var j = 0;j < 10;j++){
                if (_this.wrapper[i][j] == 1){
                    ctx.beginPath();
                    ctx.rect(j*25,i*25,25,25);
                    ctx.fillStyle = 'aqua';//落下后固定颜色
                    ctx.strokeStyle = 'red';
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    };
    function top() {
        _this.dropList.forEach(function (array) {
            for (var i = 15;i >= 0;i--){
                if (_this.wrapper[i][array[0]] == 1){
                    _this.temp[array[0]] = Math.min(_this.temp[array[0]],i-1);
                }
                if (_this.wrapper[i][array[2]] == 1){
                    _this.temp[array[2]] = Math.min(_this.temp[array[2]],i-1);
                }
                if (_this.wrapper[i][array[4]] == 1){
                    _this.temp[array[4]] = Math.min(_this.temp[array[4]],i-1);
                }
                if (_this.wrapper[i][array[6]] == 1){
                    _this.temp[array[6]] = Math.min(_this.temp[array[6]],i-1);
                }
            }
        });
    }
    this.updatePos = function () {
        _this.dropList.forEach(function (val,index) {
            val[1]+=1;
            val[3]+=1;
            val[5]+=1;
            val[7]+=1;
            if (val[1]>=_this.temp[val[0]]|| val[3]>=_this.temp[val[2]]|| val[5]>=_this.temp[val[4]]|| val[7]>=_this.temp[val[6]]) {
                _this.dead = true;
                _this.wrapper[_this.drop[1]][_this.drop[0]] = 1;
                _this.wrapper[_this.drop[3]][_this.drop[2]] = 1;
                _this.wrapper[_this.drop[5]][_this.drop[4]] = 1;
                _this.wrapper[_this.drop[7]][_this.drop[6]] = 1;
                top();
                _this.dropList.splice(index,1);
                //满行得分
                for (var i = 0;i <16 ;i++){
                    _this.level = 0;
                    for (var j = 0;j <10;j++){
                        if (_this.wrapper[i][j]==1){
                            _this.level++;
                        }
                        if (_this.level == 10){
                            for (var k = i;k >=0;k--){
                                _this.wrapper[k] = _this.wrapper[k-1];
                            }
                            _this.wrapper[0] = [0,0,0,0,0,0,0,0,0,0];
                            _this.score += 1;
                            span.innerHTML = _this.score;
                            for (var l =0;l < 10;l++){
                                if (_this.temp[l]<i){
                                    _this.temp[l]+=1;
                                }
                            }
                        }
                    }
                }
            }
            for (var i = 0;i < 10;i++){
                if (_this.temp[i] <= 0){
                    endGame();
                }
            }
        });
    };
}