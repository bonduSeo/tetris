<?php
$player =  $_GET['player'];
$status = $_GET['status'];

$filep = fopen("${player}.txt", 'w');
fputs($filep, $status);
fclose($filep);

print_r($status);
