<?php
require('con_db.php');

$json = json_decode(file_get_contents("php://input"),true);

$id = $json['id'];
$name = $json['name'];
$address = $json['address'];
$mobile = $json['mobile'];

$sql = "UPDATE `customer` SET `name`='$name', `address`='$address', `mobile`='$mobile' WHERE `id`='$id'";
$result = mysqli_query($con,$sql);

mysqli_close($con);

?>