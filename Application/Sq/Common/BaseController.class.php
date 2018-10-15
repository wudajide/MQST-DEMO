<?php
/**
 * SQ模块全局控制器
 * User: sq
 * Date: 2016/7/18
 * Time: 17:06
 */

namespace Sq\Common;
use Think\Controller;

class BaseController extends Controller {

    protected $ajax_i = false;  //是否AJAX_I请求

    public function __construct() {
        parent::__construct();
        $this->ajax_i = I('post.ajax_i',0,'intval');

        //初始化可访问的链接
        $this->assign('sq_allow_methods',getAllowMethods());
    }

    /**
     * 是否登陆状态
     * @return bool|user_id
     */
    protected function is_login() {
        $user_id = getUserId();
        if($user_id) {
            return $user_id;
        } else {
            return false;
        }
    }

    /**
     * 验证登陆
     * @param string $msg
     * @return bool|user_id
     */
    protected function check_login($msg='请先登录在访问该内容哦！') {
        $result = $this->is_login();
        if(!$result) {
            if($this->ajax_i) {
                $this->ajax_error($msg,-99999);
            } else {
                $this->show_error($msg);
            }
        } else {
            return $result;
        }
    }

    /**
     * 成功发送数据
     * @param $content
     * @param int $status   成功状态
     */
    protected function ajax_success($content='',$status=10000) {
        $this->ajaxReturn(array('s'=>$status,'c'=>$content));
        exit;
    }

    /**
     * 内容错误
     * @param string $message   错误信息
     * @param int $status   错误状态
     */
    protected function ajax_error($message='',$status=-10000) {
        $this->ajaxReturn(array('s'=>$status,'m'=>$message?:'您的网络不太顺畅哦！'));
        exit;
    }

    /**
     * 显示错误页面
     * @param string $message   错误信息
     */
    protected function show_error($message='') {
        $this->assign('error_msg', $message?:'页面出错了哦！');
        $this->display('Public/error.tpl');
        exit;
    }

}