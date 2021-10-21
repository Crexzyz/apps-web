<?php

class ContactNotebookModel
{
    function readAll()
    {
        return $GLOBALS['db']->GetActiveRecords('eb72905_contacts');
    }

    function read($id)
    {
        $contact = new ContactModel(false);
        $contact->load('id=?', array($id));
        return $contact;
    }
    
    function delete($id)
    {
        $contact = $this->read($id);
        return $contact->delete('id=?', $id);
    }
}
