<?php

include '../dto/DtoUsers.php';
include '../mdl/MdTransaccion.php';

//declaracion de objetos
$model = new MdTransaccion();
$dtoUsers = new DtoUsers();

//asignando valores
$dtoUsers->setId($_POST['id']);
$dtoUsers->setName($_POST['name']);
$dtoUsers->setSurName($_POST['surname']);
$dtoUsers->setEmail($_POST['email']);

//$prueba = $dtoUsers->setId($_POST['id']);

$tipo_op = $_POST['tipo_op'];
switch ($tipo_op) {
    case 0:
        echo $model->updatesUsers($dtoUsers);
        break;
}
