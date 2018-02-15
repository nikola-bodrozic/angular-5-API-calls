<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization, X-CustomHeader');
header('Content-Type: application/json');

$arr = array();
foreach (getallheaders() as $name => $value) {
    array_push($arr, [$name => $value]) ;
}
echo json_encode($arr);
error_log(json_encode($arr), 0);
