<?php
require('con_db.php');

$json = json_decode(file_get_contents("php://input"),true);

$id = $json['id'];
$item = $json['item'];

$sql = "UPDATE `material` SET `item`='$item' WHERE `id`='$id'";
$result = mysqli_query($con,$sql);

mysqli_close($con);

?>