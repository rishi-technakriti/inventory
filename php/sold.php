<?php
require('con_db.php');

$json = json_decode(file_get_contents("php://input"),true);

$custid = $json['custid'];
$name = $json['customer'];
$address = $json['address'];
$mobile = $json['mobile'];
$custdate = $json['date'];
$item = $json['item'];

if($custid == ''){
    $sql = "INSERT INTO `customer` (`name`,`address`,`mobile`) VALUES ('$name','$address','$mobile')";
    $result = mysqli_query($con,$sql);
    $custid = mysqli_insert_id($con);
}

foreach ($item as $x) {
    $sql = "INSERT INTO `stockout` (`custid`,`matid`,`date`,`soldqty`,`price`,`amount`) VALUES ('$custid','".$x['itemid']."','$custdate','".$x['soldqty']."','".$x['soldprice']."','".$x['amount']."')";
    $result = mysqli_query($con, $sql);
}

echo('ok');

mysqli_close($con);

?>