<?php

require('con_db.php');

$sql = "SELECT `bill`.`bill`, `customer`.`name`,`bill`.`gross`,`bill`.`cd`,`bill`.`tax` FROM `bill` 
        JOIN `customer` ON `bill`.`custid` = `customer`.`id`WHERE `bill`.`bill` <> 0";

$result = mysqli_query($con, $sql);

$row = mysqli_fetch_all($result);
$data = ['record'=>$row];

echo(json_encode($data));

mysqli_close($con);
?>
