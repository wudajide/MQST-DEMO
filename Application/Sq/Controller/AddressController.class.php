<?php
/**
 * 选择地址控制器
 * User: sq
 * Date: 2016/11/30
 * Time: 14:15
 */

namespace Sq\Controller;
use Sq\Common\BaseController;

class AddressController extends BaseController {

    public function index() {
        $this->display();
    }

    public function provinces() {
        $where = array();
        $where['area_type'] = 1;
        $province_list = M('area')->field('area_id,area_province,area_code')->where($where)->select();
        $this->assign('province_list',$province_list);
        $this->display();
    }

    public function citys() {
        $pid = I('request.pid');
        if(!$pid) {
            $this->show_error('该省没有对应市级分区哦！');
        }

        $where = array();
        $where['area_type'] = 2;
        $where['area_pid'] = $pid;
        $city_list = M('area')->field('area_id,area_city,area_code')->where($where)->select();
        $this->assign('city_list',$city_list);
        $this->display();
    }

    public function districts() {
        $pid = I('request.pid');
        if(!$pid) {
            $this->show_error('该市没有对应县级分区哦！');
        }

        $where = array();
        $where['area_type'] = 3;
        $where['area_pid'] = $pid;
        $district_list = M('area')->field('area_id,area_district,area_code')->where($where)->select();
        $this->assign('district_list',$district_list);
        $this->display();
    }

}