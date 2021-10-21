<?php

require_once('db.php');

define('DS', DIRECTORY_SEPARATOR);
define('TEMPLATE_DIR', 'View' . DS);
define('BASE_DIR', getcwd() . DS);

spl_autoload_register(
    function ($class)
    {
        preg_match('/^(?<name>\w+)(?<function>(Controller|Model)){1}$/', $class, $matches);
        switch (@$matches['function']) {
            case 'Controller':
                require_once('Controller' . DS . $class . '.php');
                break;
            case 'Model':
                require_once('Model' . DS . $class . '.php');
                break;
            default:
                try
                {
                    $file = 'Ekeke' . DS . $class . '.class.php';
                    if(!@include_once($file))
                    {
                        throw new Exception('No existe el archivo' . $file);
                    }
                    else
                    {
                        require_once($file);
                    }
                }
                catch (Exception $e)
                {
                    
                }
        } // switch
    }
);

$addressesController = new AddressesController();
