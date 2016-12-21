<?php

$sql = "SELECT `material`.`id`, SUM(`stockin`.`actreceive`) AS 'Received', SUM(`stockout`.`soldqty`) AS 'Sold' FROM 
        `material` LEFT JOIN `stockin` ON `material`.`id`=`stockin`.`matid` LEFT JOIN `stockout` ON `material`.
        `id`=`stockout`.`matid`GROUP BY `material`.`id`"

?>

