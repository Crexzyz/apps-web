<?php

require_once 'LocalJsonRepository.php';
require_once 'AddressNotebookModel.php';
require_once 'AddressModel.php';

$repo = new LocalJsonRepository();

$data = $repo->readAll();

$notebook = new AddressNotebookModel($repo);

$notebook->readAll();

