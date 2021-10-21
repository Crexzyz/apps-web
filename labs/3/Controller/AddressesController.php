<?php

class AddressesController extends Controller
{
    private $messages = array(
        'EDIT_OK' => 'Dirección modificada con éxito',
        'EDIT_ERR' => 'Su dirección no se pudo modificar',
        'NEW_OK' => 'Dirección agregada con éxito',
        'NEW_ERR' => 'Su dirección no se pudo guardar',
        'DELETE_OK' => 'Dirección eliminada con éxito',
        'DELETE_ERR' => 'Su dirección no se pudo eliminar',
    );

    function __construct()
    {
        $this->notebook = new ContactNotebookModel();
        parent::__construct();
    }

    function index()
    {
        $this->view->assign('addresses', $this->notebook->readAll());
        if(isset($_GET['status']))
        {
            $this->view->assign('message', $this->messages[$_GET['status']]);
        }
    }
    
    function fill()
    {
        $messageKey = 'message';
        $actionKey = 'action';
        $contactKey = 'contact';

        if(!isset($_GET['id']))
        {
            $this->view->assign($messageKey, 'Cree una nueva entrada en el libro de direcciones');
            $this->view->assign($actionKey, 'create');
            $this->view->assign($contactKey, new ContactModel(false));
        }
        else
        {
            $this->view->assign($messageKey, 'Modifique la siguiente entrada en el libro de direcciones');
            $this->view->assign($actionKey, 'edit');

            $contact = $this->notebook->read($_GET['id']);
            $this->view->assign($contactKey, $contact);
        }
    }
    
    function create()
    {
        $contact = new ContactModel(true);

        $contact->setData($_POST['name'], $_POST['last-name'], $_POST['home-number'],
                          $_POST['home-address'], $_POST['work-number'], $_POST['work-address'],
                          $_POST['email']);
        $result = $contact->save();
        $code = $result === 0 ? 'NEW_ERR' : 'NEW_OK';
        header('Location: '. $_SERVER['PHP_SELF'] . "?status=$code"); die;
    }

    function edit()
    {
        $contact = $this->notebook->read($_POST['id']);
        print_r($contact);
        $contact->setData($_POST['name'], $_POST['last-name'], $_POST['home-number'],
                          $_POST['home-address'], $_POST['work-number'], $_POST['work-address'],
                          $_POST['email']);
        
        $result = $contact->save();
        $code = $result === 0 ? 'EDIT_ERR' : 'EDIT_OK';
        header('Location: '. $_SERVER['PHP_SELF'] . "?status=$code"); die;
    }

    function delete()
    {
        $result = $this->notebook->delete($_GET['id']);
        $code = $result === 0 ? 'DELETE_ERR' : 'DELETE_OK';
        header('Location: '. $_SERVER['PHP_SELF'] . "?status=$code"); die;
    }
}