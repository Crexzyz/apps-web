<html>
<head>
    <title>Direcciones</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</head>
<body>
    <h1>Direcciones</h1>
    <p><a href="<?php echo $_SERVER['PHP_SELF']; ?>?action=fill">Agregar nuevo contacto</a></p>

    <table class="table table-hover">
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
                <td scope="row"><?php echo $address->getName(); ?></td>
                <td><?php echo $address->getLastName(); ?></td>
                <td><?php echo $address->getHomeNumber(); ?></td>
                <td><?php echo $address->getHomeAddress(); ?></td>
                <td><?php echo $address->getWorkNumber(); ?></td>
                <td><?php echo $address->getWorkAddress(); ?></td>
                <td>
                    <a class="nav-item" href="mailto:<?php echo $address->getEmail(); ?>">
                        <?php echo $address->getEmail(); ?>
                    </a>
                </td>
                <td>
                    <a class="nav-item" href="<?php echo $_SERVER['PHP_SELF']; ?>?action=fill&id=<?php echo $address->getId(); ?>">
						Editar
					</a>
                </td>
                <td>
                    <a class="nav-item" href="<?php echo $_SERVER['PHP_SELF']; ?>?action=delete&id=<?php echo $address->getId(); ?>">
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
</body>
</html>