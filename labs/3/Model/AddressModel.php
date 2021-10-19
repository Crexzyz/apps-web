<?php

class AddressModel
{
    private $id = "";
    private $name = "";
    private $lastName = "";
    private $homeNumber = "";
    private $homeAddress = "";
    private $workNumber = "";
    private $workAddress = "";
    private $email = "";

    public function setData($id, $name, $lastName, $homeNumber,
                            $homeAddress, $workNumber, $workAddress, $email)
    {
        $this->id = $id;
        $this->name = $name;
        $this->lastName = $lastName;
        $this->homeNumber = $homeNumber;
        $this->homeAddress = $homeAddress;
        $this->workNumber = $workNumber;
        $this->workAddress = $workAddress;
        $this->email = $email;
    }

    public function setDataFromArray($data) 
    {
        foreach($data as $key => $val)
        {
            if(property_exists(__CLASS__,$key))
            {
                $this->$key =  $val;
            }
        }
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getlastName()
    {
        return $this->lastName;
    }
    
    public function getHomeNumber()
    {
        return $this->homeNumber;
    }

    public function getHomeAddress()
    {
        return $this->homeAddress;
    }

    public function getWorkNumber()
    {
        return $this->workNumber;
    }

    public function getWorkAddress()
    {
        return $this->workAddress;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getData()
    {
        return get_object_vars($this);
    }
}
