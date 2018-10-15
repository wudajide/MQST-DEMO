<?php
/**
 * 登录控制器
 * User: sq
 * Date: 2018/9/12
 * Time: 9:04
 */

namespace Sq\Controller;
use Sq\Common\BaseController;

class LoginController extends BaseController {

    public function index() {
        $this->display('Login/index');
    }

    public function doLogin() {
        $account = I('post.account');
        $password = I('post.password');

        if(!$account) {
            $this->ajax_error('请输入帐号~');
        }

        if(!$password) {
            $this->ajax_error('请输入密码~');
        }

        $test_info = array();
        $test_info['user_id'] = 99;
        $test_info['user_account'] = 'test';
        $test_info['user_password'] = '456123';

        if($password != $test_info['user_password']) {
            $this->ajax_error('密码错误~');
        }

        setUserId($test_info['user_id']);
        $this->ajax_success(
            array(
                'id'             =>      $test_info['user_id'],
                'account'        =>      $test_info['user_account'],
            )
        );
    }

    public function doLogout() {
        setUserId(0);
        $this->ajax_success('注销成功！');
    }

    public function check() {
        $this->display('Login/check');
    }

    public function doVerify() {
        $user_id = $this->check_login();    //如果未登录，则会跳转到Login/index
        $this->ajax_success();
    }

}