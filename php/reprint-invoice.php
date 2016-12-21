<?php

require('con_db.php');

$json = json_decode(file_get_contents("php://input"),true);

$showinv = $json['showinv'];

$sql = "SELECT `customer`.`name`, `customer`.`address`,`customer`.`mobile`, `stockout`.`date`, `material`.`item`, `stockout`.`soldqty`,
 `stockout`.`price`, `bill`.`cd`, `bill`.`tax`,`stockout`.`matid`, `bill`.`custid` FROM `stockout` JOIN `bill` ON `stockout`.`billid` = `bill`.`id`
 JOIN `customer` ON `bill`.`custid`= `customer`.`id` JOIN `material` ON  `stockout`.`matid`= `material`.`id` 
 WHERE `bill`.`bill` = '$showinv'";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_all($result);
$data = ['record'=>$row];

echo(json_encode($data));

mysqli_close($con);
?>