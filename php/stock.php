<?php

require('con_db.php');

$sql = "SELECT `material`.`item`, SUM(`stockin`.`actreceive`) AS 'Received', SUM(`stockout`.`soldqty`) AS 'Sold' FROM 
        `material` LEFT JOIN `stockin` ON `material`.`id`=`stockin`.`matid` LEFT JOIN `stockout` ON `material`.
        `id`=`stockout`.`matid`GROUP BY `material`.`id`";
$result = mysqli_query($con, $sql);

$row = mysqli_fetch_all($result);
$data = ['record'=>$row];

echo(json_encode($data));

mysqli_close($con);

?>

