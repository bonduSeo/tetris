<?php
$data = file('1.txt');
print $data[0];

header('Content-type: application/json');
// echo json_encode($data);
