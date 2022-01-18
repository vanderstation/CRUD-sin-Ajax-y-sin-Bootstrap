<?php

class DtoUsers
{

    private $id;
    private $name;
    private $surname;
    private $email;

    function __construct()
    {
    }

    function getId()
    {
        return $this->id;
    }
    function setId($id)
    {
        $this->id = $id;
    }
    function getName()
    {
        return $this->name;
    }
    function setName($name)
    {
        $this->name = $name;
    }
    function getSurName()
    {
        return $this->surname;
    }
    function setSurName($surname)
    {
        $this->surname = $surname;
    }
    function getEmail()
    {
        return $this->email;
    }
    function setEmail($email)
    {
        $this->email = $email;
    }
}
