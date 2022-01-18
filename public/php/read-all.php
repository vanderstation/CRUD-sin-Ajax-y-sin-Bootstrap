<?php


class transacciones
{

    private $con;
    private $conexion;

    function __construct()
    {
        require_once dirname(__FILE__) . './../php/connection.php';
        $this->con = new conexion();
        $this->conexion = $this->con->getConnection();
    }

    //Seleccion de persona

    public function selectUser()
    {
        $query = 'SELECT * FROM users';
        $stmt = $this->conexion->query($query);
        $stmt->execute();

        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        echo json_encode($result);
    }
}

$info = new transacciones();
echo $info->selectUser();
