<?php

define('ADODB_ASSOC_CASE', 0);
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/adodb/adodb-php/adodb-active-record.inc.php';

$config = parse_ini_file('app.ini.php');
$user = $config['db_user'];
$pass = $config['db_password'];

$db = NewADOConnection("postgres9://$user:$pass@localhost/ci0137");
$dictionary = NewDataDictionary($db);
$dictionary->SetSchema($user);
$db->Execute("SET search_path TO $user");
ADOdb_Active_Record::SetDatabaseAdapter($db);
$db->debug = FALSE;
