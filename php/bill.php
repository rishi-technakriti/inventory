<?php
require('con_db.php');

$sql = "SELECT * FROM `bill` ORDER BY `bill` DESC";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_all($result);
$data = ['record'=>$row];

echo(json_encode($data));

mysqli_close($con);

?>