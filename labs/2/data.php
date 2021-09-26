<?php
include 'distritos.php';

$request = json_decode(file_get_contents('php://input'));
$answer = array();

if(is_null($request)) {
    foreach($provincias['provincias'] as $provincia) {
        array_push($answer, $provincia["title"]);
    }
}

echo json_encode($answer)
?>