<?php

class ContactModel extends ADODB_Active_Record
{
    public $_table = 'eb72905_contacts';

    function __construct($new)
    {
        parent::__construct();
        if($new)
        {
            $row = $GLOBALS['db']->GetRow("SELECT nextval('eb72905_contacts_id_seq'::regclass) AS id");
            $this->id = $row['id'];
        }
    }

    public function setData($name, $lastName, $homeNumber, $homeAddress,
                            $workNumber, $workAddress, $email)
    {
        $this->name = $name;
        $this->last_name = $lastName;
        $this->home_number = $homeNumber;
        $this->home_address = $homeAddress;
        $this->work_number = $workNumber;
        $this->work_address = $workAddress;
        $this->email = $email;
    }
}
