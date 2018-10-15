<?php

if(APP_DEBUG) {
    return array('LOAD_EXT_CONFIG'=>'test_sq_config,test_db');
} else {
    return array('LOAD_EXT_CONFIG'=>'sq_config,db');
}
