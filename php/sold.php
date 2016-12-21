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

$sql = "SELECT `bill` FROM `bill` WHERE `bill`='$billno'";
$result = mysqli_query($con,$sql);

if(mysqli_num_rows($result)==0){
    $sql = "INSERT INTO `bill` (`bill`,`custid`, `cd`,`tax`,`gross`,`net`) VALUES ('$billno','$custid', '$cd','$tax','$gross','$net')";  
    $result = mysqli_query($con,$sql);
    $billid = mysqli_insert_id($con);

    foreach ($item as $x) {
        $sql = "INSERT INTO `stockout` (`billid`,`matid`,`date`,`soldqty`,`price`) VALUES ('$billid','".$x['itemid']."','$custdate','".$x['soldqty']."','".$x['soldprice']."')";
        $result = mysqli_query($con, $sql);
    }
    
    echo('ok');
}else{
    echo('entered');    
}

mysqli_close($con);

?>