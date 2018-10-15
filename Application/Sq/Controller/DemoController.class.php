<?php
/**
 * demo控制器
 * User: sq
 * Date: 2018/9/11
 * Time: 15:42
 */

namespace Sq\Controller;
use Sq\Common\BaseController;

class DemoController extends BaseController {

    public function index() {
        $this->display('Demo/index');
    }

    public function framework() {
        $this->display('Demo/framework');
    }

    public function event() {
        $this->display('Demo/event');
    }

    public function eventTest1() {
        $this->display('Demo/eventTest1');
    }

    public function eventTest2() {
        $this->display('Demo/eventTest2');
    }

    public function eventTest2InitData() {
        $param = I('post.param');
        $data = array();
        $data['param'] = '这是异步请求的内容，传递参数：'.$param;
        $this->ajax_success($data);
    }

    public function rem() {
        $this->display('Demo/rem');
    }

    public function scroller() {
        $this->display('Demo/scroller');
    }

    public function buttons() {
        $this->display('Demo/buttons');
    }

    public function toast() {
        $this->display('Demo/toast');
    }

    public function dialog() {
        $this->display('Demo/dialog');
    }

    public function preloader() {
        $this->display('Demo/preloader');
    }

    public function modal() {
        $this->display('Demo/modal');
    }

    public function lazyLoad() {
        $this->display('Demo/lazyLoad');
    }

    public function lazyLoadImg() {
        $this->display('Demo/lazyLoadImg');
    }

    public function lazyLoadBgImg() {
        $this->display('Demo/lazyLoadBgImg');
    }

    public function photoBrowser() {
        $this->display('Demo/photoBrowser');
    }

    public function swiper() {
        $this->display('Demo/swiper');
    }

    public function encrypt() {
        $this->display('Demo/encrypt');
    }

    public function doAesEncrypt() {
        $p_data = I('post.p_data');
        $data = array();
        $data['encrypt_data'] = aesEncrypt($p_data);
        $data['decrypt_data'] = aesDecrypt($data['encrypt_data']);
        $this->ajax_success($data);
    }

    public function doAesDecrypt() {
        $encrypt_data = I('post.encrypt_data');
        $data = array();
        $data['decrypt_data'] = aesDecrypt($encrypt_data);
        $this->ajax_success($data);
    }

    public function timer() {
        $this->display('Demo/timer');
    }

    public function form() {
        $this->display('Demo/form');
    }

    public function doFormSubmit() {
        $data = array();
        $data["account"] = I('post.account');
        $data["phone"] = I('post.phone');
        $data["email"] = I('post.email');
        $data["password"] = aesDecrypt(I('post.password'));
        $data["sex"] = I('post.sex',0,'intval');
        $data["birthday"] = I('post.birthday');
        $data["disjunctor_1"] = I('post.disjunctor_1');
        $data["disjunctor_2"] = I('post.disjunctor_2');
        $data["address"] = I('post.address');
        $data["province_id"] = I('post.province_id',0,'intval');
        $data["province_name"] = I('post.province_name');
        $data["province_code"] = I('post.province_code');
        $data["city_id"] = I('post.city_id',0,'intval');
        $data["city_name"] = I('post.city_name');
        $data["city_code"] = I('post.city_code');
        $data["district_id"] = I('post.district_id',0,'intval');
        $data["district_name"] = I('post.district_name');
        $data["district_code"] = I('post.district_code');
        $data["desc"] = I('post.desc');
        $data["details"] = I('post.details');
        $data["math_code"] = I('post.equation',0,'intval');

        if(!$data["account"]) {
            $this->ajax_error('帐号不能为空~',-10001);
        }

        if(!$data["phone"]) {
            $this->ajax_error('手机号码不能为空~',-10002);
        }

        if(!isMobile($data["phone"])) {
            $this->ajax_error('手机号码格式不正确~',-10003);
        }

        if($data["email"] && !isEmail($data["email"])) {
            $this->ajax_error('邮箱格式不正确~',-10004);
        }

        if(!verifyMathCode($data["math_code"])) {
            $this->ajax_error('算数验证错误',-10005);
        }

        $this->ajax_success($data);
    }

    public function topShade() {
        $this->display('Demo/topShade');
    }

    public function tabFixed() {
        $this->display('Demo/tabFixed');
    }

    public function turnPage() {
        $this->display('Demo/turnPage');
    }

    public function turnLeft() {
        $this->display('Demo/turnLeft');
    }

    public function turnRight() {
        $this->display('Demo/turnRight');
    }

    public function turnDirect() {
        $this->display('Demo/turnDirect');
    }

    public function loadPage() {
        $this->display('Demo/loadPage');
    }

    public function loadTest() {
        $this->display('Demo/loadTest');
    }

    public function loadBack() {
        $this->display('Demo/loadBack');
    }

    public function loadBack2() {
        $this->display('Demo/loadBack2');
    }

    public function loadTransmitData() {
        $this->display('Demo/loadTransmitData');
    }

    public function loadTransmitDataA() {
        $this->display('Demo/loadTransmitDataA');
    }

    public function loadTransmitDataB() {
        $this->display('Demo/loadTransmitDataB');
    }

    public function loadMultiPath() {
        $this->display('Demo/loadMultiPath');
    }

    public function loadMultiPathA() {
        $this->display('Demo/loadMultiPathA');
    }

    public function loadMultiPathB() {
        $this->display('Demo/loadMultiPathB');
    }

    public function loadMultiPathC() {
        $this->display('Demo/loadMultiPathC');
    }

    public function loadMultiPathD() {
        $this->display('Demo/loadMultiPathD');
    }

    public function loadExternal() {
        $this->display('Demo/loadExternal');
    }

    public function loadExternal1() {
        $this->display('Demo/loadExternal1');
    }

    public function infinite() {
        $this->display('Demo/infinite');
    }

    public function infiniteTest1() {
        $this->display('Demo/infiniteTest1');
    }

    public function getInfiniteTest1Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 50) {
            $count = 5;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/infinite/infiniteTest1Data.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }

    public function infiniteTest2() {
        $this->display('Demo/infiniteTest2');
    }

    public function getInfiniteTest2Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 60) {
            $count = 2;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/infinite/infiniteTest2Data.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }

    public function infiniteTest3() {
        $this->display('Demo/infiniteTest3');
    }

    public function getInfiniteTest3Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 60) {
            $count = 3;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);

        $infinite_data_list = array();
        $end_index = $last_index + $count;
        for($begin_index=$last_index+1;$begin_index<=$end_index;$begin_index++) {
            $this->assign('i',$begin_index);
            $infinite_data_list[] = $this->fetch('Demo/Tpl/infinite/infiniteTest3Data.tpl');
        }

        $content = array(
            'count'                 =>  $count,
            'infinite_data_list'    =>  $infinite_data_list
        );

        $this->ajax_success($content);
    }

    public function infiniteTest4() {
        $this->display('Demo/infiniteTest4');
    }

    public function getInfiniteTest4Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 70) {
            $count = 6;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);

        $infinite_data_list = array();
        $end_index = $last_index + $count;
        for($begin_index=$last_index+1;$begin_index<=$end_index;$begin_index++) {
            $this->assign('i',$begin_index);
            $infinite_data_list[] = $this->fetch('Demo/Tpl/infinite/infiniteTest4Data.tpl');
        }

        $content = array(
            'count'                 =>  $count,
            'infinite_data_list'    =>  $infinite_data_list
        );

        $this->ajax_success($content);
    }

    public function inline() {
        $this->display('Demo/inline');
    }

    public function inlineTest1() {
        $this->display('Demo/inlineTest1');
    }

    public function getInlineTest1InfiniteStarData() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 50) {
            $count = 5;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/inlineTest1/infiniteStarData.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }

    public function getInlineTest1InfiniteCartData() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 30) {
            $count = 1;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/inlineTest1/infiniteCartData.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }

    public function inlineTest2() {
        $this->display('Demo/inlineTest2');
    }

    public function getInlineTest2Infiniteinline2Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 50) {
            $count = 5;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/inlineTest2/infiniteInline2Data.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }

    public function getInlineTest2Infiniteinline3Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 30) {
            $count = 1;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/inlineTest2/infiniteInline3Data.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }



    public function getInlineTest2Infiniteinline5Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 40) {
            $count = 7;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);

        $infinite_data_list = array();
        $end_index = $last_index + $count;
        for($begin_index=$last_index+1;$begin_index<=$end_index;$begin_index++) {
            $this->assign('i',$begin_index);
            $infinite_data_list[] = $this->fetch('Demo/Tpl/inlineTest2/infiniteInline5Data.tpl');
        }

        $content = array(
            'count'                 =>  $count,
            'infinite_data_list'    =>  $infinite_data_list
        );

        $this->ajax_success($content);
    }

    public function inlineTest3() {
        $this->display('Demo/inlineTest3');
    }

    public function getInlineTest3Infiniteinline2Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 50) {
            $count = 5;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/inlineTest3/infiniteInline2Data.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }

    public function getInlineTest3Infiniteinline3Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 30) {
            $count = 1;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);
        $infinite_data = $this->fetch('Demo/Tpl/inlineTest3/infiniteInline3Data.tpl');

        $content = array(
            'count'                 =>  $count,
            'infinite_data'         =>  $infinite_data
        );

        $this->ajax_success($content);
    }

    public function getInlineTest3Infiniteinline5Data() {
        $last_index = I('post.last_index',0,'intval');
        $count = 10;

        //模拟加载到最后一页
        if($last_index > 30) {
            $count = 9;
        }

        $this->assign('last_index',$last_index+1);
        $this->assign('count',$count);

        $infinite_data_list = array();
        $end_index = $last_index + $count;
        for($begin_index=$last_index+1;$begin_index<=$end_index;$begin_index++) {
            $this->assign('i',$begin_index);
            $infinite_data_list[] = $this->fetch('Demo/Tpl/inlineTest3/infiniteInline5Data.tpl');
        }

        $content = array(
            'count'                 =>  $count,
            'infinite_data_list'    =>  $infinite_data_list
        );

        $this->ajax_success($content);
    }

    public function icon() {
        $this->display('Demo/icon');
    }

    public function device() {
        $this->display('Demo/device');
    }

}