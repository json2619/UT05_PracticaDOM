<?php
$fileName = $_POST['fileName'];
$jsonData = $_POST['json'];

$targetName = "./restaurantDataBackup/" . $fileName;

file_put_contents($targetName, $jsonData);
?>