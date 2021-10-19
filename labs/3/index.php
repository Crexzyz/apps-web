<?php

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/adodb/adodb-php/adodb-active-record.inc.php';

define('DS', DIRECTORY_SEPARATOR);
define('TEMPLATE_DIR', 'View' . DS);
define('BASE_DIR', getcwd() . DS);

spl_autoload_register(
	function ($class)
	{
		preg_match('/^(?<name>\w+)(?<function>(Controller|Model|Repository)){1}$/', $class, $matches);
		switch (@$matches['function']) {
			case 'Controller':
				require_once('Controller' . DS . $class . '.php');
				break;
            case 'Repository':
			case 'Model':
				require_once('Model' . DS . $class . '.php');
				break;
			default:
				require_once('Ekeke' . DS . $class . '.class.php');
		} // switch
	}
);

$addressesController = new AddressesController(new LocalJsonRepository());

