<?php
require('con_db.php');

$json = json_decode(file_get_contents("php://input"),true);

$supid = $json['supid'];
$name = $json['supplier'];
$address = $json['address'];
$mobile = $json['mobile'];
$do = $json['do'];
$supdate = $json['date'];
$item = $json['item'];

if($supid == ''){
    $sql = "INSERT INTO `supplier` (`name`,`address`,`mobile`) VALUES ('$name','$address','$mobile')";
    $result = mysqli_query($con,$sql);
    $supid = mysqli_insert_id($con);
}

foreach ($item as $x) {
    if($x['itemid'] == ''){
        $sql = "INSERT INTO `material` (`item`) VALUES ('".$x['name']."')";
        $result = mysqli_query($con,$sql);
        $x['itemid'] = mysqli_insert_id($con);
    }

    $sql = "INSERT INTO `stockin` (`supid`,`matid`,`do`,`date`,`receive`,`damage`,`shortage`,`actreceive`) VALUES ('$supid','".$x['itemid']."','$do','$supdate','".$x['rcvdqty']."','".$x['dmgqty']."','".$x['shtqty']."','".$x['actqty']."')";
    $result = mysqli_query($con, $sql);
}

echo('ok');

mysqli_close($con);

?>