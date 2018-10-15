/**
 * 页面事件回调
 * @param prefix
 * @param e
 * @param id
 * @param page
 * @returns {boolean}
 */
function mqstPageCall(prefix, e, id, page) {
    try {
        var func = eval(prefix+id);
        if (typeof func === 'function') {
            func.call(this, e, id, page);
            return true;
        } else {
            return false;
        }
    } catch(ev) {
        return false;
    }
}

/**
 * 数组删除特定元素
 * @param val
 */
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 阻止冒泡
 * @param e
 */
function stopPropagation(e) {
    e = e || window.event;
    if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}

/**
 * 判断对象是否是字符串
 * @returns {boolean}
 */
$.fn.isString = function() {
    return Object.prototype.toString.call(this) === "[object String]";
};

/**
 * 长按事件
 * @param fn
 * @param time
 */
$.fn.longPress = function(fn,time) {
    if(!time) time = 2000;
    var timeout = undefined;
    var $this = this;
    for(var i = 0;i<$this.length;i++){
        $this[i].addEventListener('touchstart', function(event) {
            var obj = $(this);
            obj.addClass('active');
            timeout = setTimeout(function(){fn(obj)},time);  //长按时间超过Xms，则执行传入的方法
        }, false);
        $this[i].addEventListener('touchend', function(event) {
            var obj = $(this);
            obj.removeClass('active');
            clearTimeout(timeout);  //长按时间少于Xms，不会执行传入的方法
        }, false);
    }
};

/**
 * 开关
 * @param callback  回调函数
 */
$.fn.disjunctor = function(callback) {
    var _this = $(this);
    var input_checkbox = _this.siblings('input[type="checkbox"]');
    if(input_checkbox.hasClass('checked')) {
        input_checkbox.attr('checked','checked').val('true');
    } else {
        input_checkbox.removeAttr('checked').val('false');
    }
    _this.off('click').on('click', function (e) {
        var checked = !input_checkbox.hasClass('checked');
        if(checked) {
            input_checkbox.addClass('checked');
        } else {
            input_checkbox.removeClass('checked');
        }

        input_checkbox.val(checked.toString());
        if(callback && $.isFunction(callback)) callback(checked);
    });
};

/**
 * 存放对 msui 的 config，需在 zepto 之后 msui 之前加载
 */
$.config = {
    // 路由功能开关过滤器，返回 false 表示当前点击链接不使用路由
    routerFilter: function($link) {
        // 某个区域的 a 链接不想使用路由功能
        if ($link.is('.disable-router a')) {
            return false;
        }

        return true;
    }
};

/**
 * 翻页动画类型（ui库中提取为全局库）
 * @type {{leftToRight: string, rightToLeft: string}}
 */
var DIRECTION = {
    leftToRight: 'from-left-to-right',
    rightToLeft: 'from-right-to-left',
    direct: 'direct'
};

/**
 * 自定义全局变量
 */
$.custom = {
    pageObj         :   null, //当前页面对象
    pageId          :   0, //当前页面ID
    pageData        :   {}, //存储页面数据
    backFlag        :   false, //是否是回退
    curDirection    :   DIRECTION.rightToLeft, //翻页动画类型
    ajaxStatus      :   false, //ajax状态
    remRadix        :   0,  //rem单位的基数
    correctPages    :   [], //需要调整的页面
    timerList       :   [],  //定时器列表
    timerTime       :   [],  //定时器对应执行次数
    infiniteLoading :   false,  //上拉加载flag
    fixedTabTop     :   [],  //固定TAB栏相对顶部的距离
    scrollTop       :   0, //滚动位置，native滚动需要
    supportVWVH     :   false, //是否支持VW,VH单位
    toggleTabTop    :   0, //滚动时TAB栏切换
    photoBrowser    :   null, //当前图片浏览器对象
    address         :   {}, //选择地址
    addressCallback :   null,  //选择地址后回调
    calendar_opened_flag    :   false,  //日期选择器打开标识
    cur_inner_scroll        :   null  //当前内容滚动对象
};

//获取设备宽度
function getScreenWidth() {
    var w = $(window).width();
    if(w <= 0) {
        w = window.screen.width;
    }
    return w;
}

//获取设备高度
function getScreenHeight() {
    var h = $(window).height();
    if(h <= 0) {
        h = window.screen.height;
    }
    return h;
}

/**
 * 重新设置REM基数
 */
function resetHtmlFontSize() {
    $.custom.remRadix = getScreenWidth()*20/375;
    $('html').css('font-size',$.custom.remRadix);
}

resetHtmlFontSize();

$(window).resize(function(){
    resetHtmlFontSize();
});

