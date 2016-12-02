<?php
require('con_db.php');

$json = json_decode(file_get_contents("php://input"),true);

$id = $json['id'];
$rcvdqty = $json['rcvdqty'];
$dmgqty = $json['dmgqty'];
$shtqty = $json['shtqty'];
$actqty = $rcvdqty - $dmgqty - $shtqty;
$act = $json['act'];

if($act == 'upd'){
    $sql = "UPDATE `stockin` SET `receive`='$rcvdqty', `damage`='$dmgqty', `shortage`='$shtqty',
        `actreceive`='$actqty' WHERE `id`='$id'";
}else{
    $sql = "DELETE FROM `stockin` WHERE `id`='". mysql_real_escape_string($id)."'";
}

$result = mysqli_query($con,$sql);

mysqli_close($con);

?>