/**
 * 1、所有页面中会使用到的事件均应该定义在module.js文件中（路径：Public/js/module.js）；
 * 2、module.js文件中不建议定义超出以下事件范围的事件函数；
 * 3、module.js文件中不建议在事件函数外定义全局变量；
 * 4、如需自行扩展事件，请仔细阅读源码后，在需要的位置使用mqstPageCall函数进行扩展；
*
 * 下面是事件命名规范说明：
 * [id]：页面中class="page"的属性id的值；
 * [sid]：页面中class="swiper-container"的属性data-id的值；
 * [mid]：所属模块ID；
 * [act]：操作功能名称；
*
 * 事件定义：
 * pas_[id]：新页面的DOM插入当前页面之后，动画执行之前（参数：e, id, page）；
 * pae_[id]：新页面动画执行完毕（参数：e, id, page）；
 * bps_[id]：页面切换前触发，该事件在pas前，该事件之后会做一些额外的处理才触发pas事件（参数：e, id, page）；
 * pi_[id]：新页面中的组件初始化完毕，该事件只使用函数piInitData进行异步页面初始化，不做事件绑定，所有事件绑定工作均交给pie事件（参数：e, id, page）；
 * pie_[id]：新页面中的组件初始化完毕后页面中操作执行事件全部均写在这里（参数：e, id, page）；
 * infinite_[id]：上滑加载事件（参数：e, id, page）；
 * pse_[id]：native滚动方式时，手指抬起后会每秒执行一次，共5次，注意在本函数内做严谨的逻辑判断，不然会影响性能，一般用于swiper内联页面的上滑加载操作；js滚动方式时，会在滚动停止时执行一次（参数：page）；
 * spc_[id]_[sid]：轮播图点击事件（参数：swiper, e, page）；
 * sptre_[id]_[sid]：轮播图过渡结束时触发事件（参数：swiper, page）；
 * pbb_[id]：goBack函数在执行$.router.back之前会调用该事件，如果返回值为false则不会继续执行$.router.back（参数：page）；
 * pcm_[id]：goBack函数中在关闭自定义MODAL事件时的自定义事件，取代goBack函数中的closeModal操作，一般用于在关闭自定义MODAL时，还原MODAL中的内容（参数：page）；
 * custom_[mid]_[act]：自定义函数；
 */

function pie_demo_event(e, id, page) {
    page.find('.btn_event_1').off('click').on('click', function () {
        loadPage('Demo','eventTest1');
    });

    page.find('.btn_event_2').off('click').on('click', function () {
        loadPage('Demo','eventTest2');
    });
}

function pas_demo_event_test1(e, id, page) {
    alert('事件：pas，页面id：'+id);
}

function pae_demo_event_test1(e, id, page) {
    alert('事件：pae，页面id：'+id);
}

function bps_demo_event_test1(e, id, page) {
    alert('事件：bps，页面id：'+id);
}

function pi_demo_event_test1(e, id, page) {
    alert('事件：pi，页面id：'+id);
    //这里没有执行函数piInitData，则不会继续执行pie事件
}

function pie_demo_event_test1(e, id, page) {
    alert('事件：pie，页面id：'+id);
}

function pas_demo_event_test2(e, id, page) {
    alert('事件：pas，页面id：'+id);
}

function pae_demo_event_test2(e, id, page) {
    alert('事件：pae，页面id：'+id);
}

function bps_demo_event_test2(e, id, page) {
    alert('事件：bps，页面id：'+id);
}

function pi_demo_event_test2(e, id, page) {
    piInitData(e, id, page,createUrl('Demo','eventTest2InitData'), {param:'initdata'}, function (data, status, xhr) {
        alert('事件：pi，页面id：'+id);
        page.find('.init_data').html(data.param);
    });
}

function pie_demo_event_test2(e, id, page) {
    alert('事件：pie，页面id：'+id);
}

function pie_demo_toast(e, id, page) {
    page.find('.btn_toast_1').off('click').on('click', function () {
        openToast('我是toast提示~');
    });

    page.find('.btn_toast_2').off('click').on('click', function () {
        openToast('我是toast提示，我会显示5秒钟~',5000);
    });

    page.find('.btn_tip_3').off('click').on('click', function () {
        openSuperTip('我是底部提示~');

        setTimeout(function(){
            closeSuperTip();    //关闭底部提示
        },2000);
    });
}

function pie_demo_dialog(e, id, page) {
    page.find('.btn_alert_1').off('click').on('click', function () {
        $.alert('我是弹出提示~');
    });

    page.find('.btn_alert_2').off('click').on('click', function () {
        $.alert('<p>我是第一行提示~</p><p>我是第二行提示~</p><p>我是第三行提示~</p>');
    });

    page.find('.btn_alert_3').off('click').on('click', function () {
        $.alert('我是弹出提示~',{title:'我是标题'});
    });

    page.find('.btn_alert_4').off('click').on('click', function () {
        var _this = $(this);
        $.alert('点击“我知道了”后，按钮文字会变成“你已经知道了”',{title:'我是标题',button:{text:'我知道了',callback:function() {
            _this.addClass('button-success').html('你已经知道了');
        }}});
    });

    page.find('.btn_confirm_1').off('click').on('click', function () {
        $.confirm('我是弹出提示~');
    });

    page.find('.btn_confirm_2').off('click').on('click', function () {
        $.confirm('<p>我是第一行提示~</p><p>我是第二行提示~</p><p>我是第三行提示~</p>');
    });

    page.find('.btn_confirm_3').off('click').on('click', function () {
        $.confirm('我是弹出提示~',{title:'我是标题'});
    });

    page.find('.btn_confirm_4').off('click').on('click', function () {
        var _this = $(this);
        $.confirm('<p>点击“好的”，按钮文字会变成“你点了好的”</p><p>点击“不好”，按钮文字会变成“你点了不好”</p>',
            {title:'我是标题',
                buttonOk:{text:'好的',callback:function() {
                    _this.removeClass('button-light').addClass('button-warning').html('你点了好的');
                }},
                buttonCancel:{text:'不好',callback:function() {
                    _this.removeClass('button-warning').addClass('button-light').html('你点了不好');
                }}
            });
    });
}

function pie_demo_preloader(e, id, page) {
    page.find('.btn_indicator').off('click').on('click', function () {
        $.showIndicator();
        setTimeout(function () {
            $.hideIndicator();
        }, 2000);
    });

    page.find('.btn_preloader_1').off('click').on('click', function () {
        $.showPreloader();
        setTimeout(function () {
            $.hidePreloader();
        }, 2000);
    });

    page.find('.btn_preloader_2').off('click').on('click', function () {
        $.showPreloader('你的加载提示');
        setTimeout(function () {
            $.hidePreloader();
        }, 2000);
    });
}

function pie_demo_modal(e, id, page) {
    page.find('.btn_modal_1').off('click').on('click', function () {
        openModal('modal-1');
    });

    page.find('.modal-1 .btn-login').off('click').on('click', function () {
        loadPage('Login','index');
    });

    page.find('.btn_modal_2').off('click').on('click', function () {
        open_demo_modal_2();
    });

    page.find('.btn_modal_3').off('click').on('click', function () {
        open_demo_modal_3();
    });
    page.find('.btn_close_3').off('click').on('click', function () {
        close_demo_modal('modal-3');
    });

    page.find('.btn_modal_4').off('click').on('click', function () {
        open_demo_modal_4();
    });
    page.find('.btn_close_4').off('click').on('click', function () {
        close_demo_modal('modal-4');
    });

    page.find('.btn_modal_5').off('click').on('click', function () {
        open_demo_modal_5();
    });
    page.find('.btn_close_5').off('click').on('click', function () {
        close_demo_modal('modal-5');
    });

    page.find('.modal-overlay').off('click').on('click', function () {
        var _this = $(this);
        var item = _this.attr('data-item');
        if('modal-5' == item) {
            return;
        }

        close_demo_modal(item);
    });

    function open_demo_modal_2() {
        openModal('modal-2');
        var modal_2 = page.find('.modal-2');
        modal_2.velocity({top: '30%'}, {'easing': 'linear','duration': 300,'complete':function(){
            //TODO：动画完成后执行
        }});
    }

    function open_demo_modal_3() {
        openModal('modal-3');
        var modal_3 = page.find('.modal-3');
        modal_3.velocity({left: 0}, {'easing': 'linear','duration': 300,'complete':function(){
            //TODO：动画完成后执行
        }});
    }

    function open_demo_modal_4() {
        openModal('modal-4');
        var modal_4 = page.find('.modal-4');
        modal_4.velocity({right: 0}, {'easing': 'linear','duration': 300,'complete':function(){
            //TODO：动画完成后执行
        }});
    }

    function open_demo_modal_5() {
        openModal('modal-5');
        var modal_5 = page.find('.modal-5');
        modal_5.velocity({bottom: 0}, {'easing': 'linear','duration': 300,'complete':function(){
            //TODO：动画完成后执行
        }});
    }

    function close_demo_modal(item) {
        if('modal-2' == item) {
            page.find('.'+item).velocity({top: '-9.075rem'}, {'easing': 'linear','duration': 300,'complete':function(){
                closeModal();
            }});
        } else if('modal-3' == item) {
            page.find('.'+item).velocity({left: '-15rem'}, {'easing': 'linear','duration': 300,'complete':function(){
                closeModal();
            }});
        } else if('modal-4' == item) {
            page.find('.'+item).velocity({right: '-10rem'}, {'easing': 'linear','duration': 300,'complete':function(){
                closeModal();
            }});
        } else if('modal-5' == item) {
            page.find('.'+item).velocity({bottom: '-11rem'}, {'easing': 'linear','duration': 300,'complete':function(){
                closeModal();
            }});
        } else {
            closeModal();
        }
    }
}

function pie_demo_photo_browser(e, id, page) {
    page.find('.photo-item').off('click').on('click', function () {
        var _this = $(this);
        var photos = [];
        var cur_index = _this.attr('data-index');

        page.find('.photo-item').each(function(index, item) {
            item = $(item);
            photos[index] = item.attr('data-src');
        });

        openPhotoBrowser({
            photos : photos,
            theme: 'dark',
            type: 'standalone',
            lazyLoading: true   //是否懒加载
        },cur_index);

        //关闭图片预览
        //closePhotoBrowser();
    });
}

function pie_demo_swiper(e, id, page) {
    //如果是JS渲染的swiper组件，则需要执行$.initSwiper();进行初始化
    //$.initSwiper();

    //如果是JS重新渲染的swiper组件，则需要执行$.reinitSwiper();进行重新初始化
    //$.reinitSwiper();

    page.find('.swiper_23 .swiper-slide').off('click').on('click', function () {
        var _this = $(this);
        var photos = [];
        var cur_index = _this.attr('data-pw-index');

        page.find('.swiper_23 .swiper-slide').each(function(index, item) {
            item = $(item);
            photos[index] = item.attr('data-src');
        });

        openPhotoBrowser({
            photos : photos,
            theme: 'dark',
            type: 'standalone',
            lazyLoading: true   //是否懒加载
        },cur_index);

        //关闭图片预览
        //closePhotoBrowser();
    });

    page.find('.swiper_24 .swiper-slide').off('click').on('click', function () {
        var _this = $(this);
        var photos = [];
        var cur_index = _this.attr('data-pw-index');

        page.find('.swiper_24 .swiper_pw').each(function(index, item) {
            item = $(item);
            photos[index] = item.attr('data-src');
        });

        openPhotoBrowser({
            photos : photos,
            theme: 'dark',
            type: 'standalone',
            lazyLoading: true   //是否懒加载
        },cur_index);

        //关闭图片预览
        //closePhotoBrowser();
    });
}

function spc_demo_swiper_swiper_31(swiper, e, page) {
    $.toast('您点击了第'+swiper.clickedIndex+'张图片~');
}

function sptre_demo_swiper_swiper_32(swiper, page) {
    $.toast('您滑动到第'+swiper.activeIndex+'张图片了~');
}

function pie_demo_encrypt(e, id, page) {
    page.find('.btn_aes_js').off('click').on('click', function () {
        var p_data = page.find('input[name=data]').val();
        var encrypt_data = aesEncrypt(p_data);
        var decrypt_data = aesDecrypt(encrypt_data);
        $.alert('<p>待处理数据：'+p_data+'</p><p>加密数据：'+encrypt_data+'</p><p>解密数据：'+decrypt_data+'</p>',{title:'js加解密'});
    });

    page.find('.btn_aes_php').off('click').on('click', function () {
        var p_data = page.find('input[name=data]').val();
        loadAjaxData(createUrl('Demo','doAesEncrypt'), {p_data:p_data},null,
            function (data, status, xhr) {
                if(data.s < 0) {
                    $.toast(data.m);
                    return false;
                }

                data = data.c;
                $.alert('<p>待处理数据：'+p_data+'</p><p>加密数据：'+data.encrypt_data+'</p><p>解密数据：'+data.decrypt_data+'</p>',{title:'php加解密'});
            });
    });

    page.find('.btn_js_aes_php').off('click').on('click', function () {
        var p_data = page.find('input[name=data]').val();
        var encrypt_data = aesEncrypt(p_data);
        loadAjaxData(createUrl('Demo','doAesDecrypt'), {encrypt_data:encrypt_data},null,
            function (data, status, xhr) {
                if(data.s < 0) {
                    $.toast(data.m);
                    return false;
                }

                data = data.c;
                $.alert('<p>待处理数据：'+p_data+'</p><p>加密数据：'+encrypt_data+'</p><p>解密数据：'+data.decrypt_data+'</p>',{title:'php加解密'});
            });
    });

    page.find('.btn_php_aes_js').off('click').on('click', function () {
        var p_data = page.find('input[name=data]').val();
        loadAjaxData(createUrl('Demo','doAesEncrypt'), {p_data:p_data},null,
            function (data, status, xhr) {
                if(data.s < 0) {
                    $.toast(data.m);
                    return false;
                }

                data = data.c;
                var decrypt_data = aesDecrypt(data.encrypt_data);
                $.alert('<p>待处理数据：'+p_data+'</p><p>加密数据：'+data.encrypt_data+'</p><p>解密数据：'+decrypt_data+'</p>',{title:'php加解密'});
            });
    });
}

function pie_address_index(e, id, page) {
    page.find('.province_btn').off('click').on('click',function() {
        openAddress({layered:1},function(e, id, page, adr) {
            addr_exhibition(page,adr);
        });
    });

    page.find('.city_btn').off('click').on('click',function() {
        openAddress({layered:2},function(e, id, page, adr) {
            addr_exhibition(page,adr);
        });
    });

    page.find('.district_btn').off('click').on('click',function() {
        openAddress({layered:3},function(e, id, page, adr) {
            addr_exhibition(page,adr);
        });
    });

    function addr_exhibition(page,adr) {
        page.find('.addr-province-id').html(adr.province_id);
        page.find('.addr-province-name').html(adr.province_name);
        page.find('.addr-province-code').html(adr.province_code);
        page.find('.addr-city-id').html(adr.city_id);
        page.find('.addr-city-name').html(adr.city_name);
        page.find('.addr-city-code').html(adr.city_code);
        page.find('.addr-district-id').html(adr.district_id);
        page.find('.addr-district-name').html(adr.district_name);
        page.find('.addr-district-code').html(adr.district_code);
    }
}

function pie_login_index(e, id, page) {
    page.find('.login_btn').off('click').on('click', function () {
        loadAjaxData(createUrl('Login','doLogin'), page.find('.login_form').serialize(),null,
            function (data, status, xhr) {
                if(data.s < 0) {
                    $.toast(data.m);
                    return false;
                }

                data = data.c;
                console.log(data);
                setUserId(data.id);
                $.toast('登录成功！');
                setTimeout(goBack,2000);
            });
    });
}

function pie_login_check(e, id, page) {
    page.find('.check_1_btn').off('click').on('click', function () {
        if(isLogin()) {
            $.alert('已登录！');
        } else {
            $.alert('未登录！');
        }
    });

    page.find('.check_2_btn').off('click').on('click', function () {
        if(!isLogin({login_flag:true})) return;
        $.alert('已登录！');
    });

    page.find('.check_3_btn').off('click').on('click', function () {
        loadAjaxData(createUrl('Login','doVerify'), {}, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    $.alert(data.m);
                    return false;
                }

                data = data.c;
                $.alert('已登录！');
            });
    });

    page.find('.logout_btn').off('click').on('click', function () {
        $.confirm('确定注销用户？',
            {
                buttonOk:{text:'确定',callback:function() {
                    loadAjaxData(createUrl('Login','doLogout'), {}, null,
                        function (data, status, xhr) {
                            if (data.s < 0) {
                                $.alert(data.m);
                                return false;
                            }

                            data = data.c;
                            console.log(data);
                            setUserId(0);
                            $.toast('注销成功！');
                        });
                }},
                buttonCancel:{text:'取消'}
            });
    });
}

function bps_demo_timer(page) {
    stopTimer('-');     //停止所有定时器
}

function pie_demo_timer(e, id, page) {
    var btn_start_timer = page.find('.btn_start_timer');
    var start_timer_html = btn_start_timer.html();
    page.find('.btn_start_timer').off('click').on('click', function () {
        var _this = $(this);
        startTimer('demo_timer_timer',function(time) {
            time = -1-time;
            _this.html('第'+time+'次');
        },2000);
    });

    page.find('.btn_stop_timer').off('click').on('click', function () {
        stopTimer('demo_timer_timer');
        btn_start_timer.html(start_timer_html);
    });

    var btn_count_down = page.find('.btn_count_down');
    var count_down_html = btn_count_down.html();
    btn_count_down.off('click').on('click', function () {
        var _this = $(this);
        var process = _this.attr('data-process');
        if('underway' == process) {
            return;
        }

        _this.attr('data-process','underway');
        _this.countdown(function(obj,countdown) {
            obj.html('倒计时：'+countdown);
        },function(obj) {
            obj.attr('data-process','complete').html(count_down_html);
        });
    });

    page.find('.btn_stop_down').off('click').on('click', function () {
        stopTimer('fn_countdown');
        btn_count_down.attr('data-process','ready').html(count_down_html);
    });

    page.find('.single_carousel').carousel();
    page.find('.multi_carousel_1').carousel();
    page.find('.multi_carousel_2').carousel();
    //stopTimer(id+'_'+page.find('.multi_carousel_2').attr('data-id')); //停止公告滚动

    var turntable_1 = page.find('.turntable[data-id="turntable_1"]');
    turntable_1.find('.turntable_draw').off('click').on('click', function () {
        $.turntable(turntable_1.attr('data-id'),{
            result: 5,  //结果为5
            eachFunction: function(time) {
                page.find('.turntable-item').removeClass('active');
                page.find('.turntable-item-'+time).addClass('active');
            },
            stopFunction: function() {
                openToast('恭喜你获得六等奖！');
            }
        });
    });
}

function pas_demo_form(e, id, page) {
    //动画执行之前进行数据还原
    var select_sex = page.find('select[name=sex]');
    select_sex.val(select_sex.attr('data-value'));

    var textarea_desc = page.find('textarea[name=desc]');
    textarea_desc.html(textarea_desc.attr('data-value'));

    var textarea_details = page.find('textarea[name=details]');
    var textarea_details_text = textarea_details.attr('data-value');
    var details_count_num = page.find('.details_count .count-num');
    details_count_num.html(textarea_details_text?textarea_details_text.length:0);
    textarea_details.html(textarea_details_text);
}

function pie_demo_form(e, id, page) {
    //input在输入过程中保存输入值（不这么做的话，在跳转到其他页面返回时input的值为空字符）
    //测试方法，先在input框内输入任意字符，然后点击选择地址，当选择完地址后返回到该页面，查看之前输入值是否存在

    //帐号
    var input_account = page.find('input[name=account]');
    input_account.off('input change propertychange').on('input change propertychange', function (e) {
        var _this = $(this);
        var value = _this.val();
        _this.attr('value',value);
    });

    //手机号码
    var input_phone = page.find('input[name=phone]');
    input_phone.off('input change propertychange').on('input change propertychange', function (e) {
        var _this = $(this);
        var value = _this.val();
        _this.attr('value',value);
    });

    //邮箱
    var input_email = page.find('input[name=email]');
    input_email.off('input change propertychange').on('input change propertychange', function (e) {
        var _this = $(this);
        var value = _this.val();
        _this.attr('value',value);
    });

    var select_sex = page.find('select[name=sex]');
    //select_sex.val(select_sex.attr('data-value'));
    select_sex.off('change').on('change', function (e) {
        var _this = $(this);
        var value = _this.val();
        _this.attr('data-value',value);
    });

    //日期选择器
    var input_birthday = page.find('input[name=birthday]');
    var birthday_value = input_birthday.val();
    input_birthday.calendar({
        value   :   [birthday_value?birthday_value:'1990-01-01'],
        minDate :   '1800-01-01',
        maxDate :   new Date().toLocaleDateString(),
        onChange  :   function(picker, values, displayValues) {
            input_birthday.attr('value',displayValues[0]);

            console.log(picker);
            console.log(values);
            console.log(displayValues);
        }
    });

    //开关保存输入值，并绑定点击事件，如果无需事件可不传
    var input_disjunctor_1 = page.find('input[name=disjunctor_1]');
    var disjunctor_1 = page.find('.disjunctor_1');
    disjunctor_1.disjunctor();

    var input_disjunctor_2 = page.find('input[name=disjunctor_2]');
    var disjunctor_2 = page.find('.disjunctor_2');
    disjunctor_2.disjunctor(function(checked) {
        openToast(checked.toString());
    });

    //textarea在输入过程中保存输入值，使用属性data-value保存
    var textarea_desc = page.find('textarea[name=desc]');
    //textarea_desc.html(textarea_desc.attr('data-value'));
    textarea_desc.off('input change propertychange').on('input change propertychange', function (e) {
        var _this = $(this);
        var text = _this.val();
        _this.attr('data-value',text);
    });

    var textarea_details = page.find('textarea[name=details]');
    textarea_details.off('input change propertychange').on('input change propertychange', function (e) {
        var _this = $(this);
        var text = _this.val();
        _this.attr('data-value',text);
        page.find('.details_count .count-num').html(text.length);
    });

    var input_address = page.find('input[name=address]');
    input_address.off('click').on('click', function () {
        openAddress({layered:3},function(e, id, page, adr) {
            console.log(adr);

            page.find('input[name=address]').val(adr.province_name+' '+adr.city_name+' '+adr.district_name);
            page.find('input[name=province_id]').val(adr.province_id);
            page.find('input[name=province_name]').val(adr.province_name);
            page.find('input[name=province_code]').val(adr.province_code);
            page.find('input[name=city_id]').val(adr.city_id);
            page.find('input[name=city_name]').val(adr.city_name);
            page.find('input[name=city_code]').val(adr.city_code);
            page.find('input[name=district_id]').val(adr.district_id);
            page.find('input[name=district_name]').val(adr.district_name);
            page.find('input[name=district_code]').val(adr.district_code);
        });
    });

    page.find('.equation_img').off('click').on('click', function () {
        var _this = $(this);
        _this.attr('src',_this.attr('src'));
    });

    page.find('.btn_submit').off('click').on('click', function () {
        var params = {};
        params.account = input_account.val();
        params.phone = input_phone.val();
        params.email = input_email.val();
        params.password = aesEncrypt(page.find('input[name=password]').val());    //加密传输
        params.sex = select_sex.val();
        params.birthday = input_birthday.val();
        params.disjunctor_1 = input_disjunctor_1.val();
        params.disjunctor_2 = input_disjunctor_2.val();

        params.address = page.find('input[name=address]').val();
        params.province_id = page.find('input[name=province_id]').val();
        params.province_name = page.find('input[name=province_name]').val();
        params.province_code = page.find('input[name=province_code]').val();
        params.city_id = page.find('input[name=city_id]').val();
        params.city_name = page.find('input[name=city_name]').val();
        params.city_code = page.find('input[name=city_code]').val();
        params.district_id = page.find('input[name=district_id]').val();
        params.district_name = page.find('input[name=district_name]').val();
        params.district_code = page.find('input[name=district_code]').val();

        params.desc = utf16ToEntities(textarea_desc.val()); //支持手机默认表情
        params.details = utf16ToEntities(textarea_details.val());
        params.equation = page.find('input[name=equation]').val();

        loadAjaxData(createUrl('Demo','doFormSubmit'), params, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    $.alert(data.m);
                    return false;
                }

                data = data.c;
                //console.log(data);

                var data_html = '';
                $.each(data,function(key,value) {
                    data_html += '<p>'+key+':'+value+'</p>';
                });

                $.alert(data_html,{title:'提交的数据'});
            });
    });
}

function pie_demo_turn_page(e, id, page) {
    page.find('.btn_left_effect').off('click').on('click', function () {
        loadPage('Demo','turnLeft');
    });

    page.find('.btn_right_effect').off('click').on('click', function () {
        loadPage('Demo','turnRight',{},DIRECTION.leftToRight);
    });

    page.find('.btn_no_effect').off('click').on('click', function () {
        loadPage('Demo','turnDirect',{},DIRECTION.direct);
    });
}

function pie_demo_load_back(e, id, page) {
    page.find('.btn_back_1').off('click').on('click', function () {
        goBack();
    });

    page.find('.btn_back_2').off('click').on('click', function () {
        $.router.back();
    });

    page.find('.btn_home').off('click').on('click', function () {
        goHome();
    });
}

function pie_demo_load_back2(e, id, page) {
    page.find('.btn_back2').off('click').on('click', function () {
        $.custom.correctPages.push('demo_load_back');   //清除中间页面的缓存
        $.router.back(-2);
    });

    page.find('.btn_back3').off('click').on('click', function () {
        $.custom.correctPages.push('demo_load_back','demo_load_page');   //清除中间页面的缓存
        $.router.back(-3);
    });
}

function pie_demo_load_transmit_data(e, id, page) {
    page.find('.btn_get_a').off('click').on('click', function () {
        //传递数据默认只能获取一次，所以这里第二次执行时传递数据为空
        var transmit_data = getPageData('demo_load_transmit_data_a');
        page.find('.btn_get_a_data').html('传递数据：'+transmit_data);
    });

    page.find('.btn_get_b').off('click').on('click', function () {
        //保留传递数据，所以这里第二次执行时传递数据仍然存在
        var transmit_data = getPageData('demo_load_transmit_data_b',true);
        page.find('.btn_get_b_data').html('传递数据：'+JSON.stringify(transmit_data));
    });

    page.find('.btn_simulate').off('click').on('click', function () {
        var transmit_data = '我是模拟页面的传递数据~';
        setPageData(transmit_data,'demo_load_transmit_data_simulate');
        openToast('模拟传递数据已保存~');
    });

    page.find('.btn_get_simulate').off('click').on('click', function () {
        var transmit_data = getPageData('demo_load_transmit_data_simulate');
        page.find('.btn_get_simulate_data').html('传递数据：'+transmit_data);
    });
}

function pie_demo_load_transmit_data_a(e, id, page) {
    page.find('.btn_transmit').off('click').on('click', function () {
        var transmit_data = page.find('input[name=transmit]').val();
        setPageData(transmit_data);
        openToast('传递数据已保存~');
    });
}

function pie_demo_load_transmit_data_b(e, id, page) {
    var id = page.find('input[name=id]').val();
    setPageData({id:id});
}

function pie_demo_load_multi_path_d(e, id, page) {
    page.find('.btn_back').off('click').on('click', function () {
        goBack();
    });
}

function pbb_demo_load_multi_path_d(page) {
    var from_str = page.attr('data-from');
    if(from_str){
        var from = from_str.split(',');
        $.each(from,function(index,item) {
            $.custom.correctPages.push(item);
        });

        $.router.back(- parseInt(from.length + 1));
    } else {
        $.router.back();
    }
    return false;
}

function custom_demo_infinite_test1_load_data(page) {
    var infinite_data_obj = page.find('.infinite-test1-data');
    var load_status = infinite_data_obj.attr('data-load-status');
    if (infinite_data_obj.length > 0 && load_status != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInfiniteTest1Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    $.refreshScroller();

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function pie_demo_infinite_test1(e, id, page) {
    custom_demo_infinite_test1_load_data(page);
}

function infinite_demo_infinite_test1(e, id, page) {
    custom_demo_infinite_test1_load_data(page);
}

function custom_demo_infinite_test2_load_data(page) {
    var infinite_data_obj = page.find('.infinite-test2-data');
    var load_status = infinite_data_obj.attr('data-load-status');
    if (infinite_data_obj.length > 0 && load_status != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInfiniteTest2Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    $.refreshScroller();

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function pie_demo_infinite_test2(e, id, page) {
    custom_demo_infinite_test2_load_data(page);
}

function infinite_demo_infinite_test2(e, id, page) {
    custom_demo_infinite_test2_load_data(page);
}

function custom_demo_infinite_test3_load_data(page) {
    var infinite_data_obj = page.find('.infinite-test3-data');
    var load_status = infinite_data_obj.attr('data-load-status');
    if (infinite_data_obj.length > 0 && load_status != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInfiniteTest3Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteFlowLoadTip(-1);
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    var flow_left = infinite_data_obj.attr('data-left');
                    flow_left = flow_left?parseInt(flow_left):infinite_data_obj.scrollTop();
                    var flow_right = infinite_data_obj.attr('data-right');
                    flow_right = flow_right?parseInt(flow_right):infinite_data_obj.scrollTop();
                    var margin_bottom = $.custom.remRadix*0.5;

                    $.each(data.infinite_data_list,function(index,item) {
                        item = $(item);
                        infinite_data_obj.append(item);
                        if(flow_left <= flow_right) {
                            item.css({left: 0, 'margin-top': flow_left});
                            flow_left += item.height() + margin_bottom;
                            infinite_data_obj.attr('data-left',flow_left);
                        } else {
                            item.css({right: 0, 'margin-top': flow_right});
                            flow_right += item.height() + margin_bottom;
                            infinite_data_obj.attr('data-right',flow_right);
                        }
                    });

                    var flow_height = 0;
                    if(flow_left <= flow_right) {
                        flow_height = flow_right + $.custom.remRadix*2.5;
                    } else {
                        flow_height = flow_left + $.custom.remRadix*2.5;
                    }

                    infinite_data_obj.height(flow_height);
                    infinite_data_obj.setInfiniteFlowLoadTip(1);

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteFlowLoadTip(2);
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-flow-load-tip').remove();
                    }

                    $.refreshScroller();
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data_list);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteFlowLoadTip(2);
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function pie_demo_infinite_test3(e, id, page) {
    custom_demo_infinite_test3_load_data(page);
}

function infinite_demo_infinite_test3(e, id, page) {
    custom_demo_infinite_test3_load_data(page);
}

function custom_demo_infinite_test4_infinite_flow(infinite_obj,list,index) {
    infinite_obj.setInfiniteSwiperFlowLoadTip(0);
    if(list.length <= index) {
        custom_demo_infinite_test4_infinite_flow_finish(infinite_obj,index);
        return;
    }

    var flow_left = infinite_obj.attr('data-left');
    flow_left = flow_left?parseInt(flow_left):infinite_obj.scrollTop();
    var flow_right = infinite_obj.attr('data-right');
    flow_right = flow_right?parseInt(flow_right):infinite_obj.scrollTop();
    var margin_bottom = $.custom.remRadix*0.5;

    var item = $(list[index]);
    infinite_obj.append(item);
    if(flow_left <= flow_right) {
        item.css({'margin-top': flow_left}).velocity({left: 0, 'margin-top': flow_left}, {'easing': 'linear','duration': 100,'complete':function(){
            flow_left += item.height() + margin_bottom;
            infinite_obj.attr('data-left',flow_left);
            setTimeout(function(){custom_demo_infinite_test4_infinite_flow(infinite_obj,list,index+1);},150);
        }});
    } else {
        item.css({'margin-top': flow_right}).velocity({right: 0, 'margin-top': flow_right}, {'easing': 'linear','duration': 100,'complete':function(){
            flow_right += item.height() + margin_bottom;
            infinite_obj.attr('data-right',flow_right);
            setTimeout(function(){custom_demo_infinite_test4_infinite_flow(infinite_obj,list,index+1);},150);
        }});
    }
}

function custom_demo_infinite_test4_infinite_flow_finish(infinite_obj,index) {
    var flow_height = 0;
    var flow_left = parseInt(infinite_obj.attr('data-left'));
    var flow_right = parseInt(infinite_obj.attr('data-right'));
    if(flow_left <= flow_right) {
        flow_height = flow_right + $.custom.remRadix*2.5;
    } else {
        flow_height = flow_left + $.custom.remRadix*2.5;
    }

    infinite_obj.height(flow_height);
    infinite_obj.setInfiniteFlowLoadTip(1);
    setTimeout(function(){
        infinite_obj.attr('data-load-status','finish');
        if(index < 10) {
            infinite_obj.attr('data-load-status', 'over').setInfiniteFlowLoadTip(2);
            if(infinite_obj.find('.infinite-item').length < 10)
                infinite_obj.find('.infinite-flow-load-tip').remove();
        }

        $.refreshScroller();
    },500);
}

function custom_demo_infinite_test4_infinite_data(inline_page) {
    var infinite_data_obj = inline_page.find('.infinite-test4-data');
    var load_status = infinite_data_obj.attr('data-load-status');

    if (infinite_data_obj.length > 0 && load_status != 'over') {
        if('doing' == load_status) {
            return;
        }

        infinite_data_obj.attr('data-load-status','doing');
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInfiniteTest4Data'), {
                last_index  :   last_index
            }, function(xhr, settings) {},
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    custom_demo_infinite_test4_infinite_flow(infinite_data_obj,data.infinite_data_list,0);
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data_list);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteFlowLoadTip(2);
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            },function (xhr, status, err) {
                infinite_data_obj.attr('data-load-status','error');
            });
    }
}

function pie_demo_infinite_test4(e, id, page) {
    custom_demo_infinite_test4_infinite_data(page);
}

function infinite_demo_infinite_test4(e, id, page) {
    custom_demo_infinite_test4_infinite_data(page);
}

function custom_demo_inline_test1_infinite_star_data(page) {
    var infinite_data_obj = page.find('.infinite-star-data');
    if (infinite_data_obj.length > 0 && infinite_data_obj.attr('data-load-status') != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest1InfiniteStarData'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    $.refreshScroller();

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function custom_demo_inline_test1_infinite_cart_data(page) {
    var infinite_data_obj = page.find('.infinite-cart-data');
    if (infinite_data_obj.length > 0 && infinite_data_obj.attr('data-load-status') != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest1InfiniteCartData'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    $.refreshScroller();

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function pie_demo_inline_test1(e, id, page) {
    page.find('.tab-item').off('click').on('click', function () {
        var _this = $(this);
        var item = _this.attr('data-item');
        var content_obj = page.find('.content');
        var pre_inline_obj = page.find('.inline-'+page.find('.tab-item.active').attr('data-item'));
        pre_inline_obj.attr('data-scroll',content_obj.scrollTop());
        var cur_inline_obj = page.find('.inline-'+item);
        var cur_inline_scroll = cur_inline_obj.attr('data-scroll');
        _this.addClass('active').siblings().removeClass('active');
        cur_inline_obj.show().siblings().hide();
        content_obj.attr('data-inline',item);

        if(!cur_inline_scroll) {
            infinite_demo_inline_test1(e, id, page);
        }

        $.refreshScroller();
        content_obj.scrollTop(cur_inline_scroll);

        if('settings' == item) {
            $.reinitSwiper();

            page.find('.swiper_settings .swiper-slide').off('click').on('click', function () {
                var _this = $(this);
                var photos = [];
                var cur_index = _this.attr('data-pw-index');

                page.find('.swiper_settings .swiper_pw').each(function(index, item) {
                    item = $(item);
                    photos[index] = item.attr('data-src');
                });

                openPhotoBrowser({
                    photos : photos,
                    theme: 'dark',
                    type: 'standalone',
                    lazyLoading: true   //是否懒加载
                },cur_index);

                //关闭图片预览
                //closePhotoBrowser();
            });
        }

    });
}

function infinite_demo_inline_test1(e, id, page) {
    var content_obj = page.find('.content');
    var inline_item = content_obj.attr('data-inline');
    if('star' == inline_item) {
        custom_demo_inline_test1_infinite_star_data(page);
    } else if('cart' == inline_item) {
        custom_demo_inline_test1_infinite_cart_data(page);
    }
}

function custom_demo_inline_test2_infinite_inline2_data(inline_page) {
    var infinite_data_obj = inline_page.find('.infinite-inline2-data');
    if (infinite_data_obj.length > 0 && infinite_data_obj.attr('data-load-status') != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest2Infiniteinline2Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    //$.refreshInnerScroller(inline_page);

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function custom_demo_inline_test2_infinite_inline3_data(inline_page) {
    var infinite_data_obj = inline_page.find('.infinite-inline3-data');
    if (infinite_data_obj.length > 0 && infinite_data_obj.attr('data-load-status') != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest2Infiniteinline3Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    //$.refreshInnerScroller(inline_page);

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function custom_demo_inline_test2_infinite_inline5_data(inline_page) {
    var infinite_data_obj = inline_page.find('.infinite-inline5-data');
    if (infinite_data_obj.length > 0 && infinite_data_obj.attr('data-load-status') != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest2Infiniteinline5Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteSwiperFlowLoadTip(-1);
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    var flow_left = infinite_data_obj.attr('data-left');
                    flow_left = flow_left?parseInt(flow_left):infinite_data_obj.scrollTop();
                    var flow_right = infinite_data_obj.attr('data-right');
                    flow_right = flow_right?parseInt(flow_right):infinite_data_obj.scrollTop();
                    var margin_bottom = $.custom.remRadix*0.5;

                    $.each(data.infinite_data_list,function(index,item) {
                        item = $(item);
                        infinite_data_obj.append(item);
                        if(flow_left <= flow_right) {
                            item.css({left: 0, 'margin-top': flow_left});
                            flow_left += item.height() + margin_bottom;
                            infinite_data_obj.attr('data-left',flow_left);
                        } else {
                            item.css({right: 0, 'margin-top': flow_right});
                            flow_right += item.height() + margin_bottom;
                            infinite_data_obj.attr('data-right',flow_right);
                        }
                    });

                    var flow_height = 0;
                    if(flow_left <= flow_right) {
                        flow_height = flow_right + $.custom.remRadix*2.5;
                    } else {
                        flow_height = flow_left + $.custom.remRadix*2.5;
                    }

                    infinite_data_obj.height(flow_height);
                    infinite_data_obj.setInfiniteSwiperFlowLoadTip(1);

                    //$.refreshInnerScroller(inline_page);

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteSwiperFlowLoadTip(2);
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-flow-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data_list);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteSwiperFlowLoadTip(2);
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function custom_demo_inline_test2_infinite(inline_page) {
    var index = inline_page.attr('data-index');
    if(2 == index) {
        custom_demo_inline_test2_infinite_inline2_data(inline_page);
    } else if(3 == index) {
        custom_demo_inline_test2_infinite_inline3_data(inline_page);
    } else if(5 == index) {
        custom_demo_inline_test2_infinite_inline5_data(inline_page);
    }
}

function pse_demo_inline_test2(page) {
    var inline_page = page.find('.swiper-inline .swiper-slide-active .inline-page');
    if(inline_page.length == 0) return;
    if(inline_page.hasClass('inline-infinite')) {
        var distance = inline_page.attr('data-distance');
        distance = distance?parseInt(distance):300;
        var scroll_height = inline_page[0].scrollHeight;
        var scroll_bottom = inline_page.scrollTop() + inline_page.offset().height;
        if(scroll_height - scroll_bottom < distance) {  //判断是否滑到内联页面底部
            custom_demo_inline_test2_infinite(inline_page);
        }
    }
}

function pie_demo_inline_test2(e, id, page) {
    $.initSwiper();
    //首先必须刷新内联滚动条
    $.refreshInnerScroller(page.find('.swiper-inline .swiper-slide-active .inline-page'));
    page.find('.tab-link').off('click').on('click', function () {
        var _this = $(this);
        var index = _this.attr('data-index');
        _this.addClass('active').siblings().removeClass('active');
        getSwiper('swiper-inline').slideTo(index, 200);
    });
}

function sptre_demo_inline_test2_inline(swiper, page) {
    page.find('.tab-link-'+swiper.activeIndex).addClass('active').siblings().removeClass('active');
    if(4 == swiper.activeIndex) {
        $.reinitSwiper();

        page.find('.swiper_inline4 .swiper-slide').off('click').on('click', function () {
            var _this = $(this);
            var photos = [];
            var cur_index = _this.attr('data-pw-index');

            page.find('.swiper_inline4 .swiper_pw').each(function(index, item) {
                item = $(item);
                photos[index] = item.attr('data-src');
            });

            openPhotoBrowser({
                photos : photos,
                theme: 'dark',
                type: 'standalone',
                lazyLoading: true   //是否懒加载
            },cur_index);

            //关闭图片预览
            //closePhotoBrowser();
        });
    }
}

function custom_demo_inline_test3_infinite_inline2_data(inline_page) {
    var infinite_data_obj = inline_page.find('.infinite-inline2-data');
    if (infinite_data_obj.length > 0 && infinite_data_obj.attr('data-load-status') != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest3Infiniteinline2Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    //$.refreshInnerScroller(inline_page);

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function custom_demo_inline_test3_infinite_inline3_data(inline_page) {
    var infinite_data_obj = inline_page.find('.infinite-inline3-data');
    if (infinite_data_obj.length > 0 && infinite_data_obj.attr('data-load-status') != 'over') {
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest3Infiniteinline3Data'), {
                last_index  :   last_index
            }, null,
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    infinite_data_obj.setInfiniteLoadTip(-1,'fl');
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    infinite_data_obj.appendInfiniteLoadData(data.infinite_data);
                    //$.refreshInnerScroller(inline_page);

                    if(data.count < 10) {
                        infinite_data_obj.attr('data-load-status', 'over').setInfiniteLoadTip(2,'fl');
                        if(infinite_data_obj.find('.infinite-item').length < 10)
                            infinite_data_obj.find('.infinite-load-tip').remove();
                    }
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteLoadTip(2,'fl');
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            });
    }
}

function custom_demo_inline_test3_infinite_inline5_flow(infinite_obj,list,index) {
    infinite_obj.setInfiniteSwiperFlowLoadTip(0);
    if(list.length <= index) {
        custom_demo_inline_test3_infinite_inline5_flow_finish(infinite_obj,index);
        return;
    }

    var flow_left = infinite_obj.attr('data-left');
    flow_left = flow_left?parseInt(flow_left):infinite_obj.scrollTop();
    var flow_right = infinite_obj.attr('data-right');
    flow_right = flow_right?parseInt(flow_right):infinite_obj.scrollTop();
    var margin_bottom = $.custom.remRadix*0.5;

    var item = $(list[index]);
    infinite_obj.append(item);
    if(flow_left <= flow_right) {
        item.css({'margin-top': flow_left}).velocity({left: 0, 'margin-top': flow_left}, {'easing': 'linear','duration': 100,'complete':function(){
            flow_left += item.height() + margin_bottom;
            infinite_obj.attr('data-left',flow_left);
            setTimeout(function(){custom_demo_inline_test3_infinite_inline5_flow(infinite_obj,list,index+1);},150);
        }});
    } else {
        item.css({'margin-top': flow_right}).velocity({right: 0, 'margin-top': flow_right}, {'easing': 'linear','duration': 100,'complete':function(){
            flow_right += item.height() + margin_bottom;
            infinite_obj.attr('data-right',flow_right);
            setTimeout(function(){custom_demo_inline_test3_infinite_inline5_flow(infinite_obj,list,index+1);},150);
        }});
    }
}

function custom_demo_inline_test3_infinite_inline5_flow_finish(infinite_obj,index) {
    var flow_height = 0;
    var flow_left = parseInt(infinite_obj.attr('data-left'));
    var flow_right = parseInt(infinite_obj.attr('data-right'));
    if(flow_left <= flow_right) {
        flow_height = flow_right + $.custom.remRadix*2.5;
    } else {
        flow_height = flow_left + $.custom.remRadix*2.5;
    }

    infinite_obj.height(flow_height);
    infinite_obj.setInfiniteSwiperFlowLoadTip(1);
    setTimeout(function(){
        infinite_obj.attr('data-load-status','finish');
        if(index < 10) {
            infinite_obj.attr('data-load-status', 'over').setInfiniteSwiperFlowLoadTip(2);
            if(infinite_obj.find('.infinite-item').length < 10)
                infinite_obj.find('.infinite-flow-load-tip').remove();
        }
    },500);
}

function custom_demo_inline_test3_infinite_inline5_data(inline_page) {
    var infinite_data_obj = inline_page.find('.infinite-inline5-data');
    var load_status = infinite_data_obj.attr('data-load-status');

    if (infinite_data_obj.length > 0 && load_status != 'over') {
        if('doing' == load_status) {
            return;
        }

        infinite_data_obj.attr('data-load-status','doing');
        var last_index = parseInt(infinite_data_obj.find('.infinite-item').last().attr('data-index'));
        if(!last_index) last_index=0;
        loadAjaxData(createUrl('Demo','getInlineTest3Infiniteinline5Data'), {
                last_index  :   last_index
            }, function(xhr, settings) {},
            function (data, status, xhr) {
                if (data.s < 0) {
                    openToast(data.m);
                    return false;
                }

                data = data.c;
                if(data.count > 0) {
                    custom_demo_inline_test3_infinite_inline5_flow(infinite_data_obj,data.infinite_data_list,0);
                } else {
                    if(!$.trim(infinite_data_obj.html())) {
                        infinite_data_obj.append(data.infinite_data_list);
                        infinite_data_obj.attr('data-load-status', 'over');
                        return;
                    }

                    infinite_data_obj.setInfiniteSwiperFlowLoadTip(2);
                    infinite_data_obj.attr('data-load-status', 'over');
                    return;
                }
            },function (xhr, status, err) {
                infinite_data_obj.attr('data-load-status','error');
            });
    }
}

function custom_demo_inline_test3_infinite(inline_page) {
    var index = inline_page.attr('data-index');
    if(2 == index) {
        custom_demo_inline_test3_infinite_inline2_data(inline_page);
    } else if(3 == index) {
        custom_demo_inline_test3_infinite_inline3_data(inline_page);
    } else if(5 == index) {
        custom_demo_inline_test3_infinite_inline5_data(inline_page);
    }
}

function pse_demo_inline_test3(page) {
    var inline_page = page.find('.swiper-inline .swiper-slide-active .inline-page');
    if(inline_page.length == 0) return;
    if(inline_page.hasClass('inline-infinite')) {
        var distance = inline_page.attr('data-distance');
        distance = distance?parseInt(distance):300;
        var scroll_height = inline_page[0].scrollHeight;
        var scroll_bottom = inline_page.scrollTop() + inline_page.offset().height;
        if(scroll_height - scroll_bottom < distance) {  //判断是否滑到内联页面底部
            custom_demo_inline_test3_infinite(inline_page);
        }
    }
}

function pie_demo_inline_test3(e, id, page) {
    page.find('.swiper-bar .swiper-wrapper .swiper-slide-active').addClass('active');
    $.reinitSwiper();
    //首先必须刷新内联滚动条
    $.refreshInnerScroller(page.find('.swiper-inline .swiper-slide-active .inline-page'));
    setTimeout(function() {pse_demo_inline_test3(page)},500);
}

function spc_demo_inline_test3_bar(swiper, e, page) {
    getSwiper('swiper-inline').slideTo(swiper.clickedIndex, 200);
}

function sptre_demo_inline_test3_inline(swiper, page) {
    var index = swiper.activeIndex;
    page.find('.swiper-bar .swiper-wrapper')
        .children().eq(index).addClass('active')
        .siblings().removeClass('active');
    getSwiper('swiper-bar').slideTo(index, 200, false);
    pse_demo_inline_test3(page);
    $.refreshInnerScroller(page.find('.swiper-inline .swiper-slide-active .inline-page'));

    if(4 == swiper.activeIndex) {
        $.reinitSwiper();

        page.find('.swiper_inline4 .swiper-slide').off('click').on('click', function () {
            var _this = $(this);
            var photos = [];
            var cur_index = _this.attr('data-pw-index');

            page.find('.swiper_inline4 .swiper_pw').each(function(index, item) {
                item = $(item);
                photos[index] = item.attr('data-src');
            });

            openPhotoBrowser({
                photos : photos,
                theme: 'dark',
                type: 'standalone',
                lazyLoading: true   //是否懒加载
            },cur_index);

            //关闭图片预览
            //closePhotoBrowser();
        });
    }
}

function pie_demo_device(e, id, page) {
    page.find('.device-info').html(JSON.stringify($.device));
}