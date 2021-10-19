<?php

require_once 'IGenericRepository.php';

class LocalJsonRepository implements IGenericRepository
{
    private $FILE_NAME = 'addresses.json';

    function __construct()
    {
        if(!file_exists($this->FILE_NAME))
        {
            touch($this->FILE_NAME);
            file_put_contents($this->FILE_NAME, json_encode(array()));
        }
    }

    public function readAll()
    {
        return json_decode(file_get_contents($this->FILE_NAME));
    }

    public function create($entry)
    {
        $json = $this->readAll();
        if($json === null)
        {
            return false;
        }

        array_push($json, $entry->getData());
        file_put_contents($this->FILE_NAME, json_encode($json));
        return true;
    }
    
    public function read($id)
    {
        $allData = $this->readAll();
        foreach($allData as $entry)
        {
            if($entry->id === $id)
            {
                return $entry;
            }
        }

        return null;
    }

    public function update($entry)
    {
        $allData = $this->readAll();
        $found = false;

        foreach($allData as $oldEntry)
        {
            if($oldEntry->id === $entry['id'])
            {
                foreach($entry as $key => $value) 
                {
                   $oldEntry->$key = $value;
                }
                $found = true;
                break;
            }
        }

        file_put_contents($this->FILE_NAME, json_encode($allData));
        return $found;
    }

    public function delete($entry)
    {
        $allData = $this->readAll();
        $found = false;
        $index = 0;

        foreach($allData as $oldEntry)
        {
            if($oldEntry->id === $entry['id'])
            {
                $found = true;
                break;
            }

            $index += 1;
        }

        unset($allData[$index]);
        file_put_contents($this->FILE_NAME, json_encode(array_values($allData)));
        return $found;
    }
}

