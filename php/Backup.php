<?php
if ($_POST['json']) {
    // Recogemos lo que recibimos
    $fileName = $_POST['fileName'];
    $jsonData = $_POST['json'];

    $targetDir = "./restaurantDataBackup/";
    $targetName = $targetDir . $fileName;

    // Escribimos los datos del archivo
    file_put_contents($targetName, $jsonData);

    echo "Copia realizada de manera correcta";
} else {
    echo "No se ha recibido ningun fichero json";
}