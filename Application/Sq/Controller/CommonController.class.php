<?php
/**
 * 公共控制器
 * User: sq
 * Date: 2016/11/22
 * Time: 13:51
 */

namespace Sq\Controller;
use Sq\Common\BaseController;

class CommonController extends BaseController {

    /**
     * 错误跳转
     */
    public function showError() {
        $msg = I('request.msg');
        $this->show_error($msg);
    }

    /**
     * 站长之家统计链接
     */
    public function cnzzTrackPageView() {
        // 指定允许其他域名访问
//        header('Access-Control-Allow-Origin:*');
        // 响应类型
//        header('Access-Control-Allow-Methods:*');
        // 响应头设置
//        header('Access-Control-Allow-Headers:origin,x-requested-with,content-type,accept');

        import("@.Util.cs",'','.php');
        $this->ajax_success(_cnzzTrackPageView());
    }

    /**
     * 获取算式验证码
     */
    public function getVerifyMathCode() {
        $w = 75;   //宽
        $h = 25;    //高
        $im = imagecreate($w, $h);

        //imagecolorallocate($im, 14, 114, 180); // background color
//        $red = imagecolorallocate($im, 255, 0, 0);
//        $white = imagecolorallocate($im, 255, 255, 255);

        $gray = imagecolorallocate($im, 118, 151, 199);
        $black = imagecolorallocate($im, mt_rand(0, 100), mt_rand(0, 100), mt_rand(0, 100));

        //画背景
        imagefilledrectangle($im, 0, 0, $w, $h, $black);
        //在画布上随机生成大量点，起干扰作用;
        for ($i = 0; $i < 80; $i++) {
            imagesetpixel($im, mt_rand(0, $w), mt_rand(0, $h), $gray);
        }

        switch(mt_rand(1,3)) {
            case 1:
                $num1 = mt_rand(1, 20);
                $num2 = mt_rand(1, 20);
                session('sq_verify_code_math',$num1 + $num2);
                imagestring($im, 5, 5, mt_rand(2, 8), $num1, imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 22, mt_rand(2, 8), "+", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 30, mt_rand(2, 8), $num2, imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 50, mt_rand(2, 8), "=", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 60, mt_rand(2, 8), "?", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                break;
            case 2:
                $num1 = mt_rand(11, 20);
                $num2 = mt_rand(1, 10);
                session('sq_verify_code_math',$num1 - $num2);
                if(mt_rand(1,2) == 1) {
                    imagestring($im, 5, 5,  mt_rand(2, 8), $num2, imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                    imagestring($im, 5, 22, mt_rand(2, 8), "+", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                    imagestring($im, 5, 30, mt_rand(2, 8), "?", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                } else {
                    imagestring($im, 5, 5,  mt_rand(2, 8), "?", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                    imagestring($im, 5, 22, mt_rand(2, 8), "+", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                    imagestring($im, 5, 30, mt_rand(2, 8), $num2, imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                }
                imagestring($im, 5, 50, mt_rand(2, 8), "=", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 60, mt_rand(2, 8), $num1, imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                break;
            case 3:
                $num1 = mt_rand(1, 9);
                $num2 = mt_rand(1, 9);
                session('sq_verify_code_math',$num1 * $num2);
                imagestring($im, 5, 5, mt_rand(2, 8), $num1, imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 22, mt_rand(2, 8), "x", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 30, mt_rand(2, 8), $num2, imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 50, mt_rand(2, 8), "=", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                imagestring($im, 5, 60, mt_rand(2, 8), "?", imagecolorallocate($im, 255, mt_rand(0, 255), mt_rand(0, 255)));
                break;
            default:
                break;
        }

        header("Content-type: image/png");
        imagepng($im);
        imagedestroy($im);
    }

}