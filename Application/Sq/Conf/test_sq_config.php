<?php

//通用配置
$sq_config['URL_MODEL'] = 2;
$sq_config['URL_CASE_INSENSITIVE'] = false;
$sq_config['DEFAULT_FILTER'] = 'htmlspecialchars,trim';
$sq_config['MODULE_COMPRESSION_MODE'] = 0;     //是否使用混淆压缩文件
$sq_config['SQ_VERSION'] = microtime();      //change to update

//session配置
$sq_config['SESSION_OPTIONS']   =   array(
//    'path'=>'/mqst_session',  // session保存路径
    'expire'=>86400             // session有效期（1天）
);

//cookie配置
$sq_config['COOKIE_EXPIRE']     =   604800;     // Cookie有效期（7天）
//$sq_config['COOKIE_DOMAIN']     =   '.mqst.com';          // Cookie有效域名
$sq_config['COOKIE_PATH']       =   '/';         // Cookie路径
$sq_config['COOKIE_PREFIX']     =   'mqst_';  // Cookie前缀 避免冲突

//PATH配置
//$sq_config['TMPL_EXCEPTION_FILE'] = T('Public/exception.tpl');
$sq_config['DOMAIN_PATH'] = 'http://192.168.1.37/mqst/';       //网站域名路径（改成你自己的IP地址）

//AES加密KEY
$sq_config['AES_KEY'] = 'g5j3jls2qql3g5mb'; //必须16个字符

//站长之家
$sq_config['CNZZ_TRACK'] = 0;     //是否开启站长之家统计（0：否，1：是）
$sq_config['CNZZ_SITE_ID'] = 0;     //SITE_ID，如果ID为0，则不统计

//百度地图AK（getBaiduMapInfo：获取百度地图信息）
$sq_config['BAIDU_MAP_AK'] = '';     //如果ID为空，则获取不到位置信息

return $sq_config;