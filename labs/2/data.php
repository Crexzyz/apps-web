<?php
include 'distritos.php';

$request = json_decode(file_get_contents('php://input'));
$answer = array();

function get_cantons($data, $province) {
    $result = array();
    $provinceIndex = array_search($province, array_column($data['provincias'], 'title'), true);

    if($provinceIndex !== false) {
        $cantons = $data['provincias'][$provinceIndex]['cantones'];
        foreach($cantons as $canton) {
            array_push($result, $canton);
        }
    }

    return $result;
}

function get_districts($data, $province, $canton) {
    $result = array();
    $cantons = get_cantons($data, $province);
    $canton_index = array_search($canton, array_column($cantons, 'title'), true);

    if($canton_index !== false) {
        $result = $cantons[$canton_index]['distritos'];
    }

    return $result;
}

if(is_null($request)) {
    $answer = array_column($data['provincias'], 'title');
}
else {
    if(strncmp($request->type, 'canton', 6) === 0) {
        $answer = array_column(get_cantons($data, $request->province), 'title');
    }
    elseif(strncmp($request->type, 'district', 8) === 0) {
        $answer = array_column(get_districts($data, $request->province, $request->canton), 'title');
    }
}

echo json_encode($answer);
?>