<?php

include '../dto/DtoUsers.php';
include '../mdl/MdTransaccion.php';

//declaracion de objetos
$model = new MdTransaccion();
$dtoUsers = new DtoUsers();

//asignando valores
$dtoUsers->setName($_POST['name']);
$dtoUsers->setSurName($_POST['surname']);
$dtoUsers->setEmail($_POST['email']);

//$prueba = $dtoUsers->setName($_POST['name']);

$tipo_op = $_POST['tipo_op'];
switch ($tipo_op) {
    case 0:
        echo $model->createUsers($dtoUsers);
        break;
}
