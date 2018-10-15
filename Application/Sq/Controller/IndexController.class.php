<?php
/**
 * 首页控制器
 * User: sq
 * Date: 2016/10/14
 * Time: 15:09
 */

namespace Sq\Controller;
use Sq\Common\BaseController;

class IndexController extends BaseController {

    //首页入口
    public function index() {
        //首页URL地址，js中公共函数goHome会直接跳转到该URL地址
        cookie('sq_index_url','http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);

        $this->display('Index/index');
    }

}
