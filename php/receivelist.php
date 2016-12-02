<?php

require('con_db.php');

$sql = "SELECT `stockin`.`id`, `stockin`.`date`, `stockin`.`do`,
 `material`.`item`, `stockin`.`receive`, `stockin`.`damage`, 
 `stockin`.`shortage`, `stockin`.`actreceive` FROM `stockin` JOIN  
 `material` ON `stockin`.`matid`=`material`.`id` ORDER BY `stockin`.`date` DESC";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_all($result);
$data = ['record'=>$row];

echo(json_encode($data));

mysqli_close($con);

?> 