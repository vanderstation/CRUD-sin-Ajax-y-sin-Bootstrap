<?php
include_once dirname(__FILE__) . '/access.php';

class conexion
{
    public $conn;

    public function __constructor()
    {
        require_once dirname(__FILE__) . '/access.php';
    }

    public function getConnection()
    {

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . SERVER . ";port=" . PORT . ";dbname=" . DB_NAME, USERNAME, PASSWORD);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $this->conn;
    }
}
