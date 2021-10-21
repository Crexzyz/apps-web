<html>
<head>
    <title>Direcciones</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/~eb72905/main.css">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="theme-color" content="#007200">
</head>
<body>
    <?php echo file_get_contents('http://localhost/~eb72905/labs/header.shtml'); ?>
    <main>
        <h1>Direcciones</h1>
        <?php if(!empty($message)) { echo "<section>$message</section>"; } ?>
        <section>
            <p><a href="<?php echo $_SERVER['PHP_SELF']; ?>?action=fill">Agregar nuevo contacto</a></p>
            <table class="table table-dark">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Teléfono de la casa</th>
                        <th scope="col">Dirección de la casa</th>
                        <th scope="col">Teléfono del trabajo</th>
                        <th scope="col">Dirección del trabajo</th>
                        <th scope="col">Correo electrónico</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                <?php
                foreach($addresses as $address)
                {
                ?>
                    <tr>
                        <td scope="row"><?php echo $address->name; ?></td>
                        <td><?php echo $address->last_name; ?></td>
                        <td><?php echo $address->home_number; ?></td>
                        <td><?php echo $address->home_address; ?></td>
                        <td><?php echo $address->work_number; ?></td>
                        <td><?php echo $address->work_address; ?></td>
                        <td>
                            <a class="nav-item" href="mailto:<?php echo $address->email; ?>">
                                <?php echo $address->email; ?>
                            </a>
                        </td>
                        <td>
                            <a class="nav-item" href="<?php echo $_SERVER['PHP_SELF']; ?>?action=fill&id=<?php echo $address->id; ?>">
                                Editar
                            </a>
                        </td>
                        <td>
                            <a class="nav-item" href="<?php echo $_SERVER['PHP_SELF']; ?>?action=delete&id=<?php echo $address->id; ?>">
                                Borrar
                            </a>
                        </td>
                    </tr>
                <?php
                }
                ?>
                </tbody>
            </table>
            <p><a href="<?php echo $_SERVER['PHP_SELF']; ?>?action=fill">Agregar nuevo contacto</a></p>
        </section>
    </main>
</body>
<?php echo file_get_contents('../footer.shtml'); ?>
</html>