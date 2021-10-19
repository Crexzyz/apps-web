<?php

class AddressNotebookModel
{
    private $db = null;
    private $notebook = array();

    function __construct(IGenericRepository $db)
    {
        $this->db = $db;
    }

	function readAll()
	{
        $entries = $this->db->readAll();

        foreach($entries as $entry)
        {
            $address = new AddressModel();
            $address->setDataFromArray($entry);
            $this->notebook[] = $address;
        }
        
        return $this->notebook;
	}
    
    function read($id)
    {
        $address = new AddressModel();
        $address->setDataFromArray($this->db->read($id));
        return $address;
    }

	function create(AddressModel $address)
	{
        return $this->db->create($address);
	}

    function getMaxId()
    {
        $entries = $this->readAll();
        $counter = 0;

        foreach($entries as $entry)
        {
            $currentId = $entry->getId();

            if($counter <= $currentId)
            {
                $counter = $currentId;
            }
        }

        return $counter;
    }

    function edit(AddressModel $address)
    {
        return $this->db->update($address->getData());
    }

    function delete(AddressModel $address)
    {
        return $this->db->delete($address->getData());
    }
}
