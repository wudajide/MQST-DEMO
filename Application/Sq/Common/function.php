<?php
/**
 * 公共函数库
 * User: sq
 * Date: 2016/10/12
 * Time: 10:41
 */

/**
 * 设置用户ID
 * @param $user_id
 */
function setUserId($user_id) {
    session('sq_user_id',$user_id);
}

/**
 * 获取用户ID
 * @return int
 */
function getUserId() {
    return session('sq_user_id');
}

/**
 * AES加密
 * @param $string
 * @param string $key
 * @return string
 */
function aesEncrypt($string,$key='') {
    if(!$key) {
        $key = C('AES_KEY');
    }

    $encrypted=mcrypt_encrypt(MCRYPT_RIJNDAEL_128,$key,$string,MCRYPT_MODE_ECB,$key);
    return base64_encode($encrypted);
}

/**
 * AES解密
 * @param $string
 * @param string $key
 * @return string
 */
function aesDecrypt($string,$key='') {
    if(!$key) {
        $key = C('AES_KEY');
    }

    $decrypted = mcrypt_decrypt(MCRYPT_RIJNDAEL_128,$key,base64_decode($string),MCRYPT_MODE_ECB,$key);
//    $block = mcrypt_get_block_size('rijndael_128', 'ecb');
    $pad = ord($decrypted[strlen($decrypted)-1]);
    return substr($decrypted, 0, strlen($decrypted) - $pad);
}

/**
 * 验证是否是有效的手机号
 * @param $mobile
 * @return bool
 */
function isMobile($mobile) {
    if (!is_numeric($mobile)) {
        return false;
    }
    return preg_match('#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,1,6,7,8]{1}\d{8}$|^18[\d]{9}$#', $mobile) ? true : false;
}

/**
 * 验证是否是有效的邮箱
 * @param $email
 * @return bool
 */
function isEmail($email) {
    return preg_match('#^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$#', $email) ? true : false;
}

/**
 * 字符串转16进制
 * @param $s
 * @return string
 */
function stringToHex($s) {
    $r = "0x";
    $hexes = array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    for ($i=0; $i<strlen($s); $i++) {$r .= ($hexes [(ord($s{$i}) >> 4)] . $hexes [(ord($s{$i}) & 0xf)]);}
    return $r;
}

/**
 * 16进制转字符串
 * @param $h
 * @return string
 */
function hexToString($h) {
    $r = "";
    for ($i= (substr($h, 0, 2)=="0x")?2:0; $i<strlen($h); $i+=2) {$r .= chr (base_convert (substr ($h, $i, 2), 16, 10));}
    return $r;
}

/**
 * 数字转中文大写
 * @param $num
 * @return mixed|string
 */
function convertToCn($num) {
    $convert_cn = array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖");
    $repair_number = array('零仟零佰零拾零','万万','零仟','零佰','零拾');
    $unit_cn = array("拾","佰","仟","万","亿");
    $exp_cn = array("","万","亿");
    $max_len = 12;

    $len = strlen($num);
    if($len > $max_len) {
        return 'outnumber';
    }
    $num = str_pad($num,12,'-',STR_PAD_LEFT);
    $exp_num = array();
    $k = 0;
    for($i=12;$i>0;$i--){
        if($i%4 == 0) {
            $k++;
        }
        $exp_num[$k][] = substr($num,$i-1,1);
    }
    $str = '';
    foreach($exp_num as $key=>$nums) {
        if(array_sum($nums)){
            $str = array_shift($exp_cn) . $str;
        }
        foreach($nums as $nk=>$nv) {
            if($nv == '-'){continue;}
            if($nk == 0) {
                $str = $convert_cn[$nv] . $str;
            } else {
                $str = $convert_cn[$nv].$unit_cn[$nk-1] . $str;
            }
        }
    }
    $str = str_replace($repair_number,array('万','亿','-'),$str);
    $str = preg_replace("/-{2,}/","",$str);
    $str = str_replace(array('零','-'),array('','零'),$str);
    return $str;
}

/**
 * 中文大写转数字
 * @param $str
 * @return int
 */
function cnToNum($str) {
    $convert_cn = array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖");
    $skip_words = array("拾","佰","仟");
    $str = str_replace($skip_words,"",$str);
    $len = mb_strlen($str,'utf-8');
    $num = 0;
    $k = '';
    for($i=0;$i<$len;$i++) {
        $cn = mb_substr($str,$i,1,'utf-8');
        if($cn == '亿') {
            $num = $num + intval($k)*100000000;
            $k = '';
        } elseif($cn == '万') {
            $num = $num + intval($k)*10000;
            $k = '';
        } else {
            $k = $k . array_search($cn,$convert_cn);
        }
    }
    if($k) {
        $num = $num + intval($k);
    }
    return $num;
}

/**
 *  生成GUID
 * @return string
 */
function GUID() {
    if (function_exists('com_create_guid') === true) {
        return trim(com_create_guid(), '{}');
    }

    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}

/**
 * js escape php 实现
 * @param $string
 * @param string $in_encoding
 * @param string $out_encoding
 * @return string
 */
function escape($string, $in_encoding = 'UTF-8', $out_encoding = 'UCS-2') {
    $return = '';
    if (function_exists('mb_get_info')) {
        for ($x = 0; $x < mb_strlen($string, $in_encoding); $x++) {
            $str = mb_substr($string, $x, 1, $in_encoding);
            if (strlen($str) > 1) { // 多字节字符
                $return .= '%u' . strtoupper(bin2hex(mb_convert_encoding($str, $out_encoding, $in_encoding)));
            } else {
                $return .= '%' . strtoupper(bin2hex($str));
            }
        }
    }
    return $return;
}

/**
 * curl
 * @param string $url
 * @param string $type      (get|post)
 * @param array $param
 * @return bool|mixed
 */
function curl($url,$type='get',$param=array()){
    if('get' == $type) {
        $url .= $param?'?'.http_build_query($param):'';
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    //curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    if('post' == $type) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
    }
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $data = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ($http_code>=200 && $http_code<300) ? $data : false;
}

/**
 * 获取类中的公有函数列表（不包括父类中的函数）
 * @param $class
 * @return array
 */
function getClassMethods($class) {
    $array1 = get_class_methods($class);
    if($parent_class = get_parent_class($class)) {
        $array2 = get_class_methods($parent_class);
        $array3 = array_diff($array1, $array2);
    } else {
        $array3 = $array1;
    }
    return($array3);
}

/**
 * 获取被允许访问的接口列表
 * @return array
 */
function getAllowMethods() {
    $path_str = './Application/'.MODULE_NAME.'/Controller/';
    $file_list = readAllDir($path_str);
    $classes = array();
    foreach($file_list['file'] as $vo) {
        if(strpos($vo,'.class.php') !== false) {
            $classes[] = substr(substr($vo,strlen($path_str)+1),0,-20);
        }
    }

    $class_methods = array();
    if($classes) {
        foreach($classes as $val) {
            $class_methods[$val] = getClassMethods(MODULE_NAME.'\\Controller\\'.$val.'Controller');
        }
    }
    return $class_methods;
}

/**
 * 验证码文字生成函数
 * @param string $length
 * @return string
 */
function makeRand($length="32") {   //验证码文字生成函数
    $str = 'abcdefghijkmnpqrstuvwxyz23456789ABCDEFGHIJKMNPQRSTUVWXYZ';    //去掉1跟字母l防混淆
    $result = "";
    for($i=0;$i<$length;$i++) {
        $num[$i] = rand(0,55);
        $result .= $str[$num[$i]];
    }

    return $result;
}

/**
 * 验证算式验证码
 * @param $result
 * @return bool
 */
function verifyMathCode($result) {
    if(!session('?sq_verify_code_math')) {
        return false;
    }

    $code = intval(session('sq_verify_code_math'));
    if($result == $code) {
        return true;
    }

    return false;
}

/**
 * 存储单位转化
 * @param $number
 * @return string
 */
function conversionStorageUnit($number) {
    if($number < 1024) {
        return $number.'b';
    } else if($number < 1048576) {
        return round($number/1024,2).'kb';
    } else if($number < 1073741824) {
        return round($number/1048576,2).'mb';
    } else if($number < 1099511627776) {
        return round($number/1073741824,2).'gb';
    } else {
        return round($number/1099511627776,2).'tb';
    }
}

/**
 * 生成订单号
 * @param $user_id
 * @param $type         ‘P’：实物订单，'V'：虚拟订单（其他订单可自行扩增）
 * @return string
 */
function createOrderNo($user_id,$type='P') {
    return $type.time().str_pad(substr($user_id, -4),4,"0",STR_PAD_LEFT).mt_rand(10,99);
}

/**
* 价格格式化
* @param    int	    $price
* @return   string	$price_format
*/
function ncPriceFormat($price) {
    $price_format = number_format($price,2,'.','');
    return $price_format;
}

/**
 * 读取目录文件列表
 * @param $dir
 * @return array
 */
function readAllDir($dir) {
    $result = array();
    $handle = opendir($dir);
    if ( $handle ) {
        while ( ( $file = readdir ( $handle ) ) !== false ) {
            if ( $file != '.' && $file != '..') {
                $cur_path = $dir . DIRECTORY_SEPARATOR . $file;
                if ( is_dir ( $cur_path ) ) {
                    $result['dir'][$cur_path] = readAllDir ( $cur_path );
                } else {
                    $result['file'][] = $cur_path;
                }
            }
        }
        closedir($handle);
    }
    return $result;
}

/**
 * 数字转万级说明
 * @param $number
 * @return float
 */
function numberToExplain($number) {
    if($number < 10000) {
        return $number;
    }

    return round($number/10000,1).'万';
}

/**
 * 生成随机手机号
 * @return string
 */
function makeMobile() {
    $mobileSegment = [
        '134', '135', '136', '137', '138', '139', '150', '151', '152', '157', '130', '131', '132', '155', '186', '133', '153', '189',
    ];

    $prefix = $mobileSegment[array_rand($mobileSegment)];
    $middle = mt_rand(2000, 9000);
    $suffix = mt_rand(2000, 9000);

    return $prefix . $middle . $suffix;
}

/**
 * 获取百度地图信息
 * @param $latitude     纬度
 * @param $longitude    经度
 * @return bool|mixed
 */
function getBaiduMapInfo($latitude,$longitude) {
    $map_ak = C('BAIDU_MAP_AK');
    if(!$map_ak) {
        return false;
    }

    import("@.Util.curl",'','.php');
    $curl = new CURL();
    $info = $curl->get('http://api.map.baidu.com/geocoder/v2/?output=json&ak='.$map_ak.'&location='.$latitude.','.$longitude);
    if(!$info) {
        return false;
    }

    $info = json_decode($info,true);
    if($info['status'] != 0) {
        return false;
    }

    return $info['result'];
}

/**
 * 获取手机顶部状态栏高度（内嵌于APP进行追加逻辑）
 * @return int
 */
function getClientBarHeight() {
    return 0;
}

