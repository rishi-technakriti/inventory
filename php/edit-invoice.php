<?php
require('con_db.php');

$json = json_decode(file_get_contents("php://input"),true);

$billid=0;
$billno = $json['billno'];
$cd = $json['cd'];
$tax = $json['tax'];
$gross = $json['gross'];
$net = $json['net'];
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

$sql = "UPDATE `bill` SET `custid`='$custid', `cd`='$cd',`tax`='$tax',`gross`='$gross',`net`='$net' WHERE `bill`='$billno'";
$result = mysqli_query($con,$sql);

$sql = "SELECT `id`FROM `bill` WHERE `bill`='$billno'";
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_all($result);
$billid = $row[0][0];

$sql = "DELETE FROM `stockout` WHERE `billid` = '$billid'";
$result = mysqli_query($con,$sql);

foreach ($item as $x) {
        $sql = "INSERT INTO `stockout` (`billid`,`matid`,`date`,`soldqty`,`price`) VALUES ('$billid','".$x['itemid']."','$custdate','".$x['soldqty']."','".$x['soldprice']."')";
        $result = mysqli_query($con, $sql);
}

echo('ok');

mysqli_close($con);

?>