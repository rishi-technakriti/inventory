<?php
$server = 'localhost';
$user='root';
$pwd='';
$db='inventory';

$con=mysqli_connect($server,$user,$pwd,$db);
if(mysqli_connect_error($con)){
	echo 'Error - Not Connected. Error No.- '.mysqli_connect_errno($con);
}
?>