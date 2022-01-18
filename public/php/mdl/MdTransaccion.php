<?php

class MdTransaccion
{

    private $con;
    private $conectar;

    function __construct()
    {
        require_once dirname(__FILE__) . './../connection.php';
        $this->con = new conexion();
        $this->conectar = $this->con->getConnection();
    }

    //insertar persona
    function insertUsers(DtoUsers $dto)
    {
        $sql = 'INSERT INTO users(name, surname, email) VALUES(:name,:surname,:email)';

        $stmt = $this->conectar->prepare($sql);
        $stmt->bindValue(':name', $dto->getName());
        $stmt->bindValue(':surname', $dto->getSurName());
        $stmt->bindValue(':email', $dto->getEmail());
        $result = $stmt->execute();
        return $respuesta[] = ["id" => $this->conectar->lastInsertId(), "condicion" => $result];
    }

    //editar persona
    function updateUsers(DtoUsers $dto)
    {

        $sql = 'UPDATE users SET name= :name, surname= :surname, email= :email WHERE id = :id';

        $stmt = $this->conectar->prepare($sql);
        $stmt->bindValue(':name', $dto->getName());
        $stmt->bindValue(':surname', $dto->getSurName());
        $stmt->bindValue(':email', $dto->getEmail());
        $stmt->bindValue(':id', $dto->getId());
        $result = $stmt->execute();
        return $respuesta[] = ["id" => $stmt->rowCount(), "condicion" => $result];
    }

    //eliminar persona
    function deleteUsers(DtoUsers $dto)
    {

        $sql = 'DELETE FROM users WHERE id = :id';

        $stmt = $this->conectar->prepare($sql);
        $stmt->bindValue(':id', $dto->getId());
        $result = $stmt->execute();
        return $respuesta[] = ["id" => $stmt->rowCount(), "condicion" => $result];
    }

    function createUsers(DtoUsers $users)
    {
        $this->conectar->beginTransaction();
        try {
            $result = $this->insertUsers($users);
            if (!$result['condicion']) {
                $this->conectar->rollBack();
                return -1;
            }
            $this->conectar->commit();
            return 1;
        } catch (Exception $e) {
            $this->conectar->rollBack();
            return $e->getMessage();
        }
    }

    function updatesUsers(DtoUsers $users)
    {

        $this->conectar->beginTransaction();
        try {
            $result = $this->updateUsers($users);
            if (!$result['condicion']) {
                $this->conectar->rollBack();
                return -1;
            }
            $this->conectar->commit();
            return 1;
        } catch (Exception $e) {
            print $result;
            $this->conectar->rollBack();
            return $e->getMessage();
        }
    }

    function deletesUsers(DtoUsers $users)
    {

        $this->conectar->beginTransaction();
        try {
            $result = $this->deleteUsers($users);
            if (!$result['condicion']) {
                $this->conectar->rollBack();
                return -1;
            }
            $this->conectar->commit();
            return 1;
        } catch (Exception $e) {
            print $result;
            $this->conectar->rollBack();
            return $e->getMessage();
        }
    }
}
