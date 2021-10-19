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
<p><?php echo $message; ?></p>
<form name="address" id="address" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <input name="action" type="hidden" value="<?php echo $action; ?>" />
    <input name="id" type="hidden" value="<?php echo $address->getId(); ?>" />

    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="name">Nombre</label>
            <input type="text" class="form-control" id="name" name="name" value="<?php echo $address->getName(); ?>">
        </div>
        <div class="form-group col-md-6">
            <label for="last-name">Apellidos</label>
            <input type="text" class="form-control" id="last-name" name="last-name" value="<?php echo $address->getLastName(); ?>">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="home-number">N&uacute;mero de la casa</label>
            <input type="text" class="form-control" id="home-number" name="home-number" value="<?php echo $address->getHomeNumber(); ?>">
        </div>
        <div class="form-group col-md-9">
            <label for="home-address">Direcci&oacute;n de la casa</label>
            <input type="text" class="form-control" id="home-address" name="home-address" value="<?php echo $address->getHomeAddress(); ?>">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="work-number">N&uacute;mero del trabajo</label>
            <input type="text" class="form-control" id="work-number" name="work-number" value="<?php echo $address->getWorkNumber(); ?>">
        </div>
        <div class="form-group col-md-9">
            <label for="work-address">Direcci&oacute;n del trabajo</label>
            <input type="text" class="form-control" id="work-address" name="work-address" value="<?php echo $address->getWorkAddress(); ?>">
        </div>
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" name="email" value="<?php echo $address->getEmail(); ?>">
    </div>

    <button type="submit" class="btn btn-primary">Enviar</button>
</form>
</body>
</html>