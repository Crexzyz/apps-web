<?php

class AddressesController extends Controller
{
    private $db = null;
    private $notebook = null;

    function __construct(IGenericRepository $db)
    {
        $this->db = $db;
        $this->notebook = new AddressNotebookModel($this->db);
        parent::__construct();
    }

    function index()
    {
        $this->view->assign('addresses', $this->notebook->readAll());
    }
    
    function fill()
    {
        if(!isset($_GET['id']))
        {
            $this->view->assign('message', 'Cree una nueva entrada en el libro de direcciones');
            $this->view->assign('action', 'create');
            $this->view->assign('address', new AddressModel());
        }
        else
        {
            $this->view->assign('message', 'Modifique la siguiente entrada en el libro de direcciones');
            $this->view->assign('action', 'edit');

            $address = $this->notebook->read($_GET['id']);
            $this->view->assign('address', $address);
        }
    }
    
    function create()
    {
        $newAddress = new AddressModel();

        $newAddress->setData(strval($this->notebook->getMaxId() + 1), $_POST['name'], $_POST['last-name'],
                             $_POST['home-number'], $_POST['home-address'], $_POST['work-number'],
                             $_POST['work-address'], $_POST['email']);
        
        if($this->notebook->create($newAddress))
		{
			$this->view->assign('message', 'Dirección agregada con éxito');
		}
		else
		{
			$this->view->assign('message', 'Su dirección no se pudo guardar');
		}
    }

    function edit()
    {
        $newAddress = new AddressModel();

        $newAddress->setData($_POST['id'], $_POST['name'], $_POST['last-name'],
                             $_POST['home-number'], $_POST['home-address'], $_POST['work-number'],
                             $_POST['work-address'], $_POST['email']);
        
        if($this->notebook->edit($newAddress))
		{
			$this->view->assign('message', 'Dirección modificada con éxito');
		}
		else
		{
			$this->view->assign('message', 'Su dirección no se pudo modificar');
		}
    }

    function delete()
    {
        $address = $this->notebook->read($_GET['id']);
        
        if($this->notebook->delete($address))
		{
			$this->view->assign('message', 'Dirección eliminada con éxito');
		}
		else
		{
			$this->view->assign('message', 'Su dirección no se pudo eliminar');
		}
    }
}