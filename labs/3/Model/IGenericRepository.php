<?php

interface IGenericRepository
{
    public function create($entry);
    public function readAll();
    public function read($id);
    public function update($entry);
    public function delete($entry);
}
