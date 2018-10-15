/*
 从一个页面准备开始加载，到执行完加载动画，会按顺序触发以下事件:
 事件	                        说明
 pageLoadStart	                发送Ajax之前触发
 pageLoadCancel	                取消了正在发送的ajax请求
 pageLoadError	                Ajax 请求失败
 pageLoadComplete	            Ajax 请求结束，无论是成功还是失败
 pageAnimationStart(pas_[id])	新页面的DOM插入当前页面之后，动画执行之前
 pageAnimationEnd(pae_[id])	    新页面动画执行完毕
 beforePageRemove	            加载新的页面，动画切换完成后，移除旧的 document 前发送，事件回调函数参数是event, $pageContainer，其中$pageContainer 是 .page-group（注：在 window 上触发，且内联 page 的切换不会触发此事件）
 pageRemoved	                加载新的页面，动画切换完成后，移除旧的 document 后发送（注：在 window 上触发，且内联 page 的切换不会触发此事件）
 beforePageSwitch(bps_[id])	    page 切换前触发，该事件在 pageAnimationStart 前，beforePageSwitch 之后会做一些额外的处理才触发 pageAnimationStart
 pageInit(pi_[id])	            新页面中的组件初始化完毕
 */
$(function () {

    /**
     * pageLoadStart
     * 发送Ajax之前触发（注：在 window 上触发）
     * @param e
     */
    $(window).on("pageLoadStart", function(e) {
    });

    /**
     * pageLoadCancel
     * 取消了正在发送的ajax请求（注：在 window 上触发）
     * @param e
     */
    $(window).on("pageLoadCancel", function(e) {
    });

    /**
     * pageLoadError
     * Ajax 请求失败（注：在 window 上触发）
     * @param e
     */
    $(window).on("pageLoadError", function(e) {
        //loadPage('Common','showError');
    });

    /**
     * pageLoadComplete
     * Ajax 请求结束，无论是成功还是失败（注：在 window 上触发）
     * @param e
     */
    $(window).on("pageLoadComplete", function(e) {
    });

    /**
     * pageAnimationStart
     * 新页面的DOM插入当前页面之后，动画执行之前（注：在 window 上触发）
     * @param e
     * @param id        page_id
     * @param page      page
     */
    $(document).on("pageAnimationStart", function(e, id, page) {
        $.custom.pageObj = page;
        $.custom.pageId = id;

        //input不能保存到缓存的处理方式
        page.find('.need-save-content').each(function(index,item) {
            item = $(item);
            item.val(item.attr('data-save-content'));
        });

        mqstPageCall('pas_', e, id, page);

        //初始化内容滚动位置
        page.find('.inner-scroll').each(function(index,item) {
            item = $(item);
            item.scrollTop(parseFloat(item.attr('data-scroll')));
        });
    });

    /**
     * pageAnimationEnd
     * 新页面动画执行完毕
     * @param e
     * @param id        page_id
     * @param page      page
     */
    $(document).on("pageAnimationEnd", function(e, id, page) {
        mqstPageCall('pae_', e, id, page);
    });

    /**
     * beforePageRemove
     * 加载新的页面，动画切换完成后，移除旧的 document 前发送（注：在 window 上触发）
     * @param e
     * @param pg    page-group
     */
    $(window).on("beforePageRemove", function(e, pg) {
    });

    /**
     * pageRemoved
     * 加载新的页面，动画切换完成后，移除旧的 document 后发送（注：在 window 上触发，且内联 page 的切换不会触发此事件）
     * @param e
     */
    $(window).on("pageRemoved", function(e) {
    });

    /**
     * beforePageSwitch
     * page 切换前触发，该事件在 pageAnimationStart 前，beforePageSwitch 之后会做一些额外的处理才触发 pageAnimationStart
     * @param e
     * @param id        page_id
     * @param page      page
     */
    $(document).on("beforePageSwitch", function(e, id, page) {
        stopTimer('nativeScrollEnd');
        mqstPageCall('bps_', e, id, page);
        //page.find('.pull-to-refresh-layer').css('visibility', 'hidden');

        //input不能保存到缓存的处理方式
        page.find('.need-save-content').each(function(index,item) {
            item = $(item);
            item.attr('data-save-content',item.val());
        });

        $.resetErrorLazyLoad();

        if(!$.custom.backFlag) {
            //保存当前内容滚动位置
            if($.custom.cur_inner_scroll) {
                $.custom.cur_inner_scroll.attr('data-scroll',$.custom.cur_inner_scroll.scrollTop());
                $.custom.cur_inner_scroll = null;
            }

            $.router._saveDocumentIntoCache($(document), location.href);
        } else {
            $.custom.curDirection = DIRECTION.rightToLeft;
        }

    });

    /**
     * pageInit
     * 新页面中的组件初始化完毕
     * @param e
     * @param id        page_id
     * @param page      page
     */
    $(document).on("pageInit", function(e, id, page) {
        //$('.switch-page-shade').hide();
        $.custom.pageObj = page;
        $.custom.pageId = id;

        var pc_result = mqstPageCall('pi_', e, id, page);
        if(!pc_result) {
            page.attr('data-load-status','over');
        }

        if(page.attr('data-load-status') == 'over') {
            mqstPageCall('pie_', e, id, page);
            pieInit();
        }

        //选地址回调处理
        if(!$.isEmptyObject($.custom.address) && $.custom.address.complete) {
            if($.isFunction($.custom.addressCallback)) {
                $.custom.addressCallback(e, id, page, $.custom.address);
            }
            $.custom.addressCallback = null;
            $.custom.address = {};
        }

        startTimer('pageInitLazyLoad',function() {$.lazyLoad();},3000,5);

        //页面统计
        if('1' == MY_VAR['CNZZ_TRACK']) {
            var cnzz_url = createUrl('Common','cnzzTrackPageView');
            if(!cnzz_url) return;
            loadAjaxData(cnzz_url,{},null,
                function (data, status, xhr) {
                    if (data.s < 0) {
                        //TODO:错误逻辑写这边
                        return false;
                    }

                    data.c && $('#cnzzTrackPageView').attr('src',data.c);
                });
        }

    });

    /**
     * refresh
     * 绑定上拉刷新事件
     * @param e
     */
    $(document).on('refresh', '.pull-to-refresh-content',function(e) {
        var page = $(this).parent('.page');
        var id = page.attr('id');
        mqstPageCall('refresh_', e, id, page);
    });

    /**
     * infinite
     * 下拉加载事件
     * @param e
     */
    $(document).on('infinite', '.infinite-scroll-bottom',function(e) {
        var page = $(this).parent('.page');
        var id = page.attr('id');
        mqstPageCall('infinite_', e, id, page);
    });

    $.init();

});
