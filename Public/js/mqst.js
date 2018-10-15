/**
 * 设置上拉加载提示
 * @param data      加载数据
 */
$.fn.appendInfiniteLoadData = function(data) {
    var _this = $(this);
    _this.find('.infinite-load-tip').remove();
    _this.append(data).append('<div class="infinite-load-tip fl"><div class="infinite-load-content clear"><i class="fl"></i><span class="fl">正在加载更多的数据~</span></div></div>');
};

/**
 * 设置上拉加载提示
 * @param type      0:仅删除当前提示，1：设置为正在加载提示，2：设置为全部加载完成提示，-1：数据加载失败
 * @param ft        fl:左浮动，fr:右浮动
 */
$.fn.setInfiniteLoadTip = function(type,ft) {
    var _this = $(this);
    _this.find('.infinite-load-tip').remove();
    if(!ft) ft = '';
    if(type == 1) {
        _this.append('<div class="infinite-load-tip '+ft+'"><div class="infinite-load-content clear"><i class="fl"></i><span class="fl">正在加载更多的数据~</span></div></div>');
    } else if(type == 2) {
        _this.append('<div class="infinite-load-tip '+ft+'">已经全部加载完毕~</div>');
    } else if(type == -1) {
        _this.append('<div class="infinite-load-tip '+ft+'">数据加载失败~</div>');
    }
};

/**
 * 设置瀑布流列表上拉加载提示
 * @param type      0:仅删除当前提示，1：设置为正在加载提示，2：设置为全部加载完成提示，-1：数据加载失败
 */
$.fn.setInfiniteFlowLoadTip = function(type) {
    var _this = $(this);
    _this.find('.infinite-flow-load-tip').remove();
    if(type == 1) {
        _this.append('<div class="infinite-flow-load-tip"><div class="infinite-load-content clear"><i class="fl"></i><span class="fl">正在加载更多的数据~</span></div></div>');
    } else if(type == 2) {
        _this.append('<div class="infinite-flow-load-tip">已经全部加载完毕~</div>');
    } else if(type == -1) {
        _this.append('<div class="infinite-flow-load-tip">数据加载失败~</div>');
    }

    var flow_left = parseInt(_this.attr('data-left'));
    var flow_right = parseInt(_this.attr('data-right'));
    _this.find('.infinite-flow-load-tip').css('margin-top',flow_left<flow_right?flow_right:flow_left);
};

/**
 * 设置Swiper瀑布流列表上拉加载提示
 * @param type      0:仅删除当前提示，1：设置为正在加载提示，2：设置为全部加载完成提示，3：数据加载失败
 */
$.fn.setInfiniteSwiperFlowLoadTip = function(type) {
    var _this = $(this);
    _this.find('.infinite-flow-load-tip').remove();
    if(type == 1) {
        _this.append('<div class="infinite-flow-load-tip"><div class="infinite-load-content clear"><i class="fl"></i><span class="fl">正在加载更多的数据~</span></div></div>');
    } else if(type == 2) {
        _this.append('<div class="infinite-flow-load-tip">已经全部加载完毕~</div>');
    } else if(type == -1) {
        _this.append('<div class="infinite-flow-load-tip">数据加载失败~</div>');
    }

    var flow_left = parseInt(_this.attr('data-left'));
    var flow_right = parseInt(_this.attr('data-right'));
    _this.find('.infinite-flow-load-tip').css('margin-top',flow_left<flow_right?flow_right:flow_left);
};

/**
 * 数字前面补0
 * @param number        数字
 * @param length        长度
 * @returns {string}
 */
function prefixInteger(number, length) {
    return (Array(length).join(0)+number).slice(-length);
}

/**
 * 倒计时
 * @param countdownFunction 倒计时每秒调用（直到结束）
 * @param finishFunction    结束时调用
 */
$.fn.countdown = function(countdownFunction,finishFunction) {
    var obj = $(this);
    var start_timestamp = Math.floor(new Date().getTime()/1000);
    var countdown = parseInt(obj.attr('data-countdown'));
    if(countdown <= 0) {
        obj.attr('data-status','over');
        if(finishFunction && $.isFunction(finishFunction)) finishFunction(obj);
        return;
    }

    startTimer('fn_countdown',function(time) {
        var cur_timestamp = Math.floor(new Date().getTime()/1000);
        var diff_timestamp = cur_timestamp - start_timestamp;
        var new_countdown = countdown - diff_timestamp;
        if(countdownFunction && $.isFunction(countdownFunction)) countdownFunction(obj,new_countdown);
        if(new_countdown <= 0) {
            stopTimer('fn_countdown');
            obj.attr('data-status','over');
            if(finishFunction && $.isFunction(finishFunction)) finishFunction(obj);
        }
    },1000);
};

/**
 * 转盘
 * @param params        参数集
 * params.result        结果项索引
 * params.total         转盘个数
 * params.number        旋转圈数
 * params.half_number    半数（旋转速度开始减慢的第N圈）
 * params.speed         初始速度
 * params.eachFunction  转圈过程执行函数
 * params.stopFunction  转圈停止执行函数
 */
$.turntable = function(id,params) {
    if(params == undefined) params = {};
    if(params.result == undefined) params.result = 0;
    if(params.total == undefined) params.total = 8;
    if(params.number == undefined) params.number = 9;
    if(params.half_number == undefined) params.half_number = parseInt(params.number/2);
    if(params.speed == undefined) params.speed = 200;

    if(params.number < 0) {
        return;
    }

    startTimer('fn_turntable_'+id,function(time) {
        if(params.eachFunction && $.isFunction(params.eachFunction)) params.eachFunction(time);

        if(params.number <= 0 && params.result == time) {
            stopTimer('fn_turntable_'+id);
            if(params.stopFunction && $.isFunction(params.stopFunction)) params.stopFunction();
        }

        if(time <= 0) {
            setTimeout(function() {
                var speed = params.speed-params.speed/5;
                if(params.number <= params.half_number+1) {
                    speed = params.speed+params.speed/3;
                }

                $.turntable(id,{
                    result:         params.result,
                    total:          params.total,
                    number:         params.number-1,
                    half_number:    params.half_number,
                    speed:          speed,
                    eachFunction:   params.eachFunction,
                    stopFunction:   params.stopFunction
                });
            },params.speed);
        }

    },params.speed,params.total);
};

/**
 * 文字滚动
 * @returns {boolean}
 */
$.fn.carousel = function() {
    var _this = $(this);
    if(_this.length == 0) {
        return false;
    }

    var view_number = parseInt(_this.attr('data-view-number'));
    if(_this.find('.carousel-container').length == 0) {
        var container = $('<div class="carousel-container"></div>');
        container.append(_this.html());

        _this.find('p').each(function(index,item) {
            item = $(item);
            if(index < view_number) {
                container.append(item);
            } else {
                return false;
            }
        });

        _this.html(container);
    }

    var container = _this.find('.carousel-container');
    var items = container.find('p');

    var current = parseInt(_this.attr('data-current'));
    if (!current) current = 0;
    var count = items.length;
    if(count <= view_number) {
        return false;
    }

    var carousel_id = $.custom.pageId+'_'+_this.attr('data-id');

    var show_count = count - view_number;
    var each_height = parseInt(_this.offset().height / view_number);

    var interval = _this.attr('data-interval') || 3000;
    var speed = _this.attr('data-speed') || 50;
    setTimeout(function() {
        startTimer(carousel_id,function(time) {
            time = -1-time;
            var each_top = time % each_height;
            if(each_top == 0) {
                ++current;
                if(current == show_count) {
                    current = 0;
                }

                _this.attr('data-current',current);
                if('true' == _this.attr('data-each-pause')) {
                    stopTimer(carousel_id);
                    setTimeout(function() {
                        _this.carousel();
                    },interval);
                }
            }

            var scroll_top = -(current * each_height) - time % each_height;
            container.css({'margin-top':scroll_top});
        },speed);
    },interval);
};

/**
 * 设置页面之间传递的数据
 * @param data
 * @param pageId
 */
function setPageData(data,pageId) {
    pageId = pageId?pageId:$.custom.pageId;
    $.custom.pageData[pageId] = data;
}

/**
 * 获取页面之间传递的数据
 * @param pageId
 * @param stet    是否保留（默认不删除）
 * @returns {*}
 */
function getPageData(pageId,stet) {
    var data = $.custom.pageData[pageId]?$.custom.pageData[pageId]:'';
    if(!stet) {delete $.custom.pageData[pageId];}
    return data;
}

/**
 * 字符串转16进制
 * @param s
 * @returns {string}
 */
function stringToHex (s) {
    var r = "0x";
    var hexes = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    for (var i=0; i<s.length; i++) {r += hexes [s.charCodeAt(i) >> 4] + hexes [s.charCodeAt(i) & 0xf];}
    return r;
}

/**
 * 16进制转字符串
 * @param h
 * @returns {string}
 */
function hexToString (h) {
    var r = "";
    for (var i= (h.substr(0, 2)=="0x")?2:0; i<h.length; i+=2) {r += String.fromCharCode (parseInt (h.substr (i, 2), 16));}
    return r;
}

/**
 * 用于把用utf16编码的字符转换成实体字符，以供后台存储
 * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
 * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
 */
function utf16ToEntities(str) {
    var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function(c){
        var H, L, code;
        if (c.length===2) {
            H = c.charCodeAt(0); // 取出高位
            L = c.charCodeAt(1); // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
            return "&#" + code + ";";
        } else {
            return c;
        }
    });
    return str;
}

/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
function checkMobile(mobile){
    var reg = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,1,6,7,8]{1}\d{8}$|^18[\d]{9}$/;
    return reg.test(mobile);
}

/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
function checkEmail(email){
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(email);
}

/**
 * 验证身份证
 * @param id_card
 * @returns {boolean}
 */
function checkIdCard(id_card){
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(id_card);
}

/**
 * 验证银行卡
 * @param bank_account
 * @returns {boolean}
 */
function checkBankCard(bank_account){
    var reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15}|\d{16}|\d{19}|\d{17})$/;
    return reg.test(bank_account);
}

/**
 * 加密（需要先加载aes/aes.min.js文件）
 * @param word
 * @param key
 * @returns {*}
 */
function aesEncrypt(word,key) {
    if(!key) {
        key = CryptoJS.enc.Utf8.parse(MY_VAR['AES_KEY']);
    }
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @param key
 * @returns {*}
 */
function aesDecrypt(word,key) {
    if(!key) {
        key = CryptoJS.enc.Utf8.parse(MY_VAR['AES_KEY']);
    }
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/**
 *  置顶事件初始化
 */
function fixedTop() {
    var page = $.custom.pageObj;
    page.find('.fixed-top').off('click').on('click', function() {
        var content = $.getFixedTopContent();
        content.scrollTop(0,800);
        $.toggleFixedTop();
    });
}

/**
 * pie初始化事件
 */
function pieInit() {
    var page = $.custom.pageObj;
    var id = $.custom.pageId;

    //var modal_overlay = page.find('.modal-overlay');
    //modal_overlay.children().off('click').on('click', function(e) {
    //    stopPropagation(e);
    //});
    //
    ////禁止滚动
    //page.find('.modal-overlay,.disable-touch-move').off('touchmove').on("touchmove", function(e) {
    //    e.preventDefault();
    //}, false);

    //选择地区
    if('address_provinces' == id) {
        $.custom.address.complete = false;
        page.find('.provinces-item').off('click').on('click', function () {
            var obj = $(this);
            $.custom.address.province_id = obj.attr('data-id');
            $.custom.address.province_name = obj.html();
            $.custom.address.province_code = obj.attr('data-code');
            if(1 == $.custom.address.layered) {
                $.custom.address.complete = true;
                $.router.back();
            } else {
                $.router.loadPage(obj.attr('data-href'));
            }
        });
    } else if('address_citys' == id) {
        page.find('.citys-item').off('click').on('click', function () {
            var obj = $(this);
            $.custom.address.city_id = obj.attr('data-id');
            $.custom.address.city_name = obj.html();
            $.custom.address.city_code = obj.attr('data-code');
            if(2 == $.custom.address.layered) {
                $.custom.address.complete = true;
                $.custom.correctPages.push('address_provinces');
                $.router.back(-2);
            } else {
                $.router.loadPage(obj.attr('data-href'));
            }
        });
    } else if('address_districts' == id) {
        page.find('.districts-item').off('click').on('click', function () {
            var obj = $(this);
            $.custom.address.district_id = obj.attr('data-id');
            $.custom.address.district_name = obj.html();
            $.custom.address.district_code = obj.attr('data-code');
            $.custom.address.complete = true;
            $.custom.correctPages.push('address_provinces','address_citys');
            $.router.back(-3);
        });
    }

    fixedTop();
    $.initFixedTabTop();
    $.refreshScroller();
    closeSuperShade();
}

/**
 * 生成URL
 * @param action
 * @param method
 * @param params     参数（对象：{id:23,number:34}；字符串：'/id/23/number/34'）
 * @returns string URL
 */
function createUrl(action,method,params) {
    var url = MY_SERVER['DOMAIN_PATH']+action+'/'+method;
    var param_str = '';
    if(params) {
        if($.isPlainObject(params)) {
            $.each(params, function(key, value) {
                param_str +=  '/'+key+'/'+encodeURI(encodeURI(value));
            });
        } else {
            param_str = params;
        }
    }

    return url+param_str+'.html';
}

/**
 * 跳转页面
 */
function loadPage(action,method,param,direction) {
    var url = createUrl(action,method,param);
    if(hasOpenModal()) {
        closeModal();
        setTimeout(function() {$.router.loadPage(url,direction);},500);
    } else {
        $.router.loadPage(url,direction);
    }
}

/**
 * 写cookie
 * @param name
 * @param value
 */
function setCookie(name,value) {
    var Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}

/**
 * 读cookie
 * @param name
 * @returns {*}
 */
function getCookie(name) {
    var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/**
 * 写cookie（mqst）
 * @param name
 * @param value
 */
function setMqstCookie(name,value) {
    setCookie('mqst_'+name,value);
}

/**
 * 读cookie（mqst）
 * @param name
 * @returns {*}
 */
function getMqstCookie(name) {
    return getCookie('mqst_'+name);
}

/**
 * 插入历史链接
 * @param url
 * @param state
 * @param title
 */
function pushHistoryUrl(url,state,title) {
    history.pushState(state?state:{}, title?title:'', url);
}

/**
 * 开启定时器
 * @param id        定时器ID
 * @param func      函数名（使用无参数函数，如果有参数的使用匿名函数）
 * @param delay     延时时间
 * @param time     执行次数
 * 例子：startTimer('abc',function(){alert('abc')},3000,3);
 */
function startTimer(id, func, delay, time) {
    stopTimer(id);

    if(time == undefined) time = -1;
    exec_timer(time-1);
    function exec_timer(time) {
        $.custom.timerTime[id] = time;
        $.custom.timerList[id] = setTimeout(function(){exec_timer(time-1)},delay);

        func(time);
        if(time == 0) {
            stopTimer(id);
        }
    }
}

/**
 * 停止定时器
 * @param id    定时器ID（‘-’表示停止所有定时器）
 * 例子：stopTimer('abc');
 */
function stopTimer(id) {
    if(id) {
        if('-' == id) {
            $.custom.timerList = [];
            $.each($.custom.timerList,function(index,item) {
                clearTimeout($.custom.timerList[index]);
                $.custom.timerTime[index] = 0;
            });
        } else {
            clearTimeout($.custom.timerList[id]);
            $.custom.timerTime[id] = 0;
        }
    }
}

/**
 * 格式化倒计时时间
 * @param countdown
 * @returns {{hour: string, minute: string, second: string}}
 */
function splitCountdown(countdown) {
    var day = Math.floor(countdown/86400);
    countdown = countdown%86400;
    var hour = Math.floor(countdown/3600);
    countdown = countdown%3600;
    var minute = Math.floor(countdown/60);
    countdown = countdown%60;
    var second = countdown;
    return {day:day,hour:prefixInteger(hour,2),minute:prefixInteger(minute,2),second:prefixInteger(second,2)};
}

/**
 * 跳转到首页
 */
function goHome() {
    $.router.loadPage(getMqstCookie('sq_index_url'),DIRECTION.leftToRight);
    $.router._deleteCache('-');
}

/**
 * 回退函数
 */
function goBack() {
    var page = $.custom.pageObj;

    //关闭日期选择器
    if(hasOpenPicker()) {
        closePicker();
        return;
    }

    //关闭图片浏览器
    if(hasOpenPhotoBrowser()) {
        closePhotoBrowser();
        return;
    }

    //有超级modal则关闭超级modal
    if(hasOpenSuperModal()) {
        $.closeSuperModal();
        return;
    }

    //有modal则关闭modal
    if(hasOpenModal(page)) {
        try {
            var func = eval('pcm_'+page.attr('id'));
            if (typeof func === 'function'){
                func.call(this, page);
            }
        } catch(ev) {
            closeModal();
        }

        return;
    }

    //顶层页面处理
    if(page.attr('data-top-floor') == 'true') {
        return;
    }

    try {
        var func = eval('pbb_'+$.custom.pageId);
        if (typeof func === 'function'){
            var result = func.call(this, page);
            if(!result) {
                return false;
            }
        }
    } catch(ev) {}

    $.router.back();
}

/**
 * 设置用户ID
 * @param user_id
 */
function setUserId(user_id) {
    setMqstCookie('sq_user_id',user_id);
}

/**
 * 获取用户ID
 * @returns {number}
 */
function getUserId() {
    return parseInt(getMqstCookie('sq_user_id'));
}

/**
 * 是否登陆
 * @param options login_flag    未登录时是否跳转到登录页面（默认跳转）
 * @returns {*}
 */
function isLogin(options) {
    options = options || {};
    var userId = getUserId();
    if (userId > 0) {
        return userId;
    } else {
        if(options.login_flag) {
            loadPage('Login','index');
        }

        return false;
    }
}

/**
 * 根据经纬度获取百度地图信息
 * @param latitude      纬度
 * @param longitude     经度
 * @param success       成功后回调
 */
function getBaiduMapInfo(latitude,longitude,success) {
    var map_ak = MY_VAR['BAIDU_MAP_AK'];
    if(!map_ak) return false;

    $.ajax({
        type: 'GET',
        url: 'http://api.map.baidu.com/geocoder/v2/',
        data: {
            output      :   'json',
            ak          :   map_ak,
            location    :   latitude+','+longitude
        },
        dataType: 'jsonp',
        success: function(data) {
            //返回结果状态值， 成功返回0
            //{"status":0,"result":{"location":{"lng":118.99999999999997,"lat":25.99999999086784},"formatted_address":"福建省福州市永泰县","business":"","addressComponent":{"country":"中国","country_code":0,"province":"福建省","city":"福州市","district":"永泰县","adcode":"350125","street":"","street_number":"","direction":"","distance":""},"pois":[],"poiRegions":[],"sematic_description":"后山垄西85米","cityCode":300}}
            if(data.status == 0) {
                if(data.result.addressComponent.country == '中国') {
                    success(data.result);
                }
            }
        }
    });
}

/**
 * 通用异步加载数据（不防抖）
 * @param url
 * @param params
 * @param beforeSendFunction
 * @param successFunction
 * @param errorFunction
 * @param completeFunction
 */
function ajaxData(url, params, beforeSendFunction, successFunction, errorFunction, completeFunction) {
    if(!url) {
        console.log('请求链接不能为空！');
        return;
    }

    params['ajax_i'] = 1;
    $.ajax({
        type    :   'POST',
        url     :   url,
        data    :   params,
        beforeSend  : function(xhr, settings) {
            if(beforeSendFunction) {
                beforeSendFunction(xhr, settings);
            }
        },
        success     : function(data, status, xhr) {
            if(!checkLogin(data)) {
                return false;
            }

            if(successFunction) {
                successFunction(data, status, xhr);
            }

            setTimeout(function(){$.lazyLoad()},100);

        },
        error       : function (xhr, status, err) {
            if(errorFunction) {
                errorFunction(xhr, status, err);
            }
        },
        complete    : function (xhr, status) {
            if(completeFunction) {
                completeFunction(xhr, status);
            }
        }
    });
}

/**
 * 通用异步加载数据（防抖）
 * @param url
 * @param params
 * @param beforeSendFunction
 * @param successFunction
 * @param errorFunction
 * @param completeFunction
 */
function loadAjaxData(url, params, beforeSendFunction, successFunction, errorFunction, completeFunction) {
    if(!url) {
        console.log('请求链接不能为空！');
        return;
    }

    if($.custom.ajaxStatus) {
        //setTimeout(function(){loadAjaxData(url, params, beforeSendFunction, successFunction, errorFunction, completeFunction)},1000);
        return false;
    }

    $.custom.ajaxStatus = true;
    ajaxData(url, params, beforeSendFunction, successFunction, function (xhr, status, err) {

        setTimeout(function(){loadAjaxData(url, params, beforeSendFunction, successFunction, errorFunction, completeFunction)},800);

        //$.confirm('网络异常，是否重新加载~',
        //    {title:'错误',
        //        buttonOk:{text:'确定',callback:function() {
        //            setTimeout(function(){loadAjaxData(url, params, beforeSendFunction, successFunction, errorFunction, completeFunction)},500);
        //        }},
        //        buttonCancel:{text:'返回',callback:function() {
        //            goBack();
        //        }}
        //    });
    }, function (xhr, status) {
        if(completeFunction) {
            completeFunction(xhr, status);
        }
        $.custom.ajaxStatus = false;
    });
}

/**
 * pi初始化页面数据
 * @param e
 * @param id
 * @param page
 * @param url
 * @param params
 * @param success
 */
function piInitData(e, id, page, url, params, success) {
    if($.inArray(id, $.custom.correctPages) > -1 || page.attr('data-load-status') != 'over') {
        ajaxData(url, params, function(xhr, settings) {

        }, function (data, status, xhr) {
            data = checkContentData(data);
            if(!data) return;
            success(data, status, xhr);
            //setTimeout(function(){$.lazyLoad();},100);
            mqstPageCall('pie_', e, id, page);
            pieInit();
            page.attr('data-load-status','over');
            $.custom.correctPages.remove(id);
        }, function (xhr, status, err) {
            $.alert('网络连接失败，请检查网络后重试~', '提示!', function () {
                //goBack();
                //piInitData(e, id, page, url, params, success);
            });
        });
    }
}

/**
 * 验证是否登录
 * @param data
 * @returns {boolean}
 */
function checkLogin(data) {
    if (data.s == -99999) {
        if(hasOpenModal() || hasOpenSuperModal()) {
            closeModal();
            setTimeout(function(){loadPage('Login','index');},500);
        } else {
            loadPage('Login','index');
        }

        return false;
    }

    return true;
}

/**
 * 验证内容数据
 * @param data
 * @returns {*}
 */
function checkContentData(data) {
    if(data.s < 0) {
        if(!checkLogin(data)) {
            return false;
        }

        $.alert(data.m);
        return false;
    } else {
        return data.c;
    }
}

/**
 * 打开toast
 * @param tip       提示内容
 * @param duration  延时多久消失
 */
function openToast(tip,duration) {
    var page = $.custom.pageObj;
    var toast = page.find('.super-toast');
    if(toast.length > 0) {
        closeToast(toast, function() {newToast();});
    } else {
        newToast();
    }

    function newToast() {
        var new_toast = $('<div class="super-toast">'+(tip?tip:'请稍等...')+'</div>');
        page.append(new_toast);
        new_toast.velocity({opacity: 1},{'easing': 'linear','duration': 300});
        setTimeout(function(){closeToast(new_toast);},duration||2000);
    }
}

/**
 * 关闭toast
 * @param toast
 * @param callback
 */
function closeToast(toast,callback) {
    if(!toast) {
        toast = $.custom.pageObj.find('.super-toast');
    }

    if(toast.length > 0) {
        toast.velocity({opacity: 0},{'easing': 'linear','duration': 300,'complete':function(){
            $(this).remove();
            if(callback && $.isFunction(callback)) callback();
        }});
    }
}

/**
 * 打开底部TIP
 * @param tip
 */
function openSuperTip(tip) {
    $('.super-tip').html(tip?tip:'正在加载数据，请稍等...').show().velocity({bottom: 0},{'easing': 'linear','duration': 300});
}

/**
 * 关闭底部TIP
 */
function closeSuperTip() {
    $('.super-tip').velocity({bottom: '-1rem'},{'easing': 'linear','duration': 300,'complete':function(){$(this).hide();}});
}

/**
 * 是否有打开的透明遮罩
 * @returns {boolean}
 */
function hasSuperShade() {
    if($('.super-shade').attr('data-status') == 'show') {
        return true;
    } else {
        return false;
    }
}

/**
 * 打开透明遮罩
 */
function openSuperShade() {
    $('.super-shade').attr('data-status','show').show().on("touchmove", function(e) {
        e.preventDefault();
    }, false);
}

/**
 * 关闭透明遮罩
 */
function closeSuperShade() {
    $('.super-shade').attr('data-status','hide').hide().off('touchmove');
}

/**
 * 是否有打开的modal
 * @param page
 * @returns {boolean}
 */
function hasOpenModal(page) {
    if(!page) page=$.custom.pageObj;
    var item = page.find('.modal-overlay-visible').attr('data-item');
    if(item) {
        return item;
    }
    return false;
}

/**
 * 是否有打开的超级modal
 * @returns {boolean}
 */
function hasOpenSuperModal() {
    var item = $('.super-modal-overlay.modal-overlay-visible').attr('data-item');
    if(item) {
        return item;
    }
    return false;
}

/**
 * 打开modal
 * @param className     关联的内部元素类名
 */
function openModal(className) {
    var page = $.custom.pageObj;
    $.openModal(page.find('.modal-overlay').attr('data-item',className), function () {
        page.find('.'+className).show();
    });
}

/**
 * 关闭modal
 */
function closeModal() {
    var page = $.custom.pageObj;
    var modal = page.find('.modal-overlay');
    page.find('.'+modal.attr('data-item')).hide();
    $.closeModal(modal);
}

/**
 * 是否有打开的日期选择器
 * @returns {boolean}
 */
function hasOpenPicker() {
    var picker = $('.picker-modal.modal-in');
    if(picker.length > 0) {
        return true;
    } else {
        return false;
    }
}

//关闭日期选择器
function closePicker(picker) {
    if(!picker) {
        picker = $('.picker-modal.modal-in');
    }
    if(picker.length > 0) {
        if($.custom.calendar_opened_flag) {
            $.custom.calendar_opened_flag = false;
            $.closeSuperModal();
            $.closeModal(picker);
        }
    }
}

/**
 * 是否有打开的图片浏览器
 * @returns {boolean}
 */
function hasOpenPhotoBrowser() {
    if($.custom.photoBrowser) {
        return true;
    } else {
        return false;
    }
}

/**
 * 打开图片浏览器
 * @param params
 * @param index     当前索引
 */
function openPhotoBrowser(params,index) {
    if(!index) index = 0;
    $.custom.photoBrowser = $.photoBrowser(params);
    $.custom.photoBrowser.open(index);
}

/**
 * 关闭图片浏览器
 */
function closePhotoBrowser() {
    $.custom.photoBrowser.close();
    $.custom.photoBrowser = null;
}

/**
 * 获取swiper操作对象
 * @param className
 * @param page
 * @returns {*}
 */
function getSwiper(className,page) {
    if(!page) page=$.custom.pageObj;
    var swiper = page.find('.'+className);
    if (swiper.length === 0) {
        return null;
    } else {
        return swiper[0].swiper;
    }
}

/**
 * 预加载文件
 * @param files
 */
function preloadFiles(files) {
    $.each(files, function(index, item){
        new Image().src = item;
    })
}

/**
 * 打开地址选择器
 * example:
 *      openAddress(function(e, id, page, adr) {
            page.find('.top-search input').val(adr.province_name+' '+adr.city_name+' '+adr.area_name);
        });
 */
function openAddress(options,callback) {
    options = options || {};
    $.custom.address.layered = options.layered || 3;
    if($.isFunction(callback)) $.custom.addressCallback = callback;
    loadPage('Address','provinces');
}




