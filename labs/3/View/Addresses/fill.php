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
            <form name="contact" id="contact" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <input name="action" type="hidden" value="<?php echo $action; ?>" />
                <input name="id" type="hidden" value="<?php echo $contact->id; ?>" />
        
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="name">Nombre</label>
                        <input type="text" class="form-control" id="name" name="name" value="<?php echo $contact->name; ?>">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="last-name">Apellidos</label>
                        <input type="text" class="form-control" id="last-name" name="last-name" value="<?php echo $contact->last_name; ?>">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="home-number">N&uacute;mero de la casa</label>
                        <input type="text" class="form-control" id="home-number" name="home-number" value="<?php echo $contact->home_number; ?>">
                    </div>
                    <div class="form-group col-md-9">
                        <label for="home-contact">Direcci&oacute;n de la casa</label>
                        <input type="text" class="form-control" id="home-address" name="home-address" value="<?php echo $contact->home_address; ?>">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="work-number">N&uacute;mero del trabajo</label>
                        <input type="text" class="form-control" id="work-number" name="work-number" value="<?php echo $contact->work_number; ?>">
                    </div>
                    <div class="form-group col-md-9">
                        <label for="work-contact">Direcci&oacute;n del trabajo</label>
                        <input type="text" class="form-control" id="work-address" name="work-address" value="<?php echo $contact->work_address; ?>">
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value="<?php echo $contact->email; ?>">
                </div>
        
                <button type="submit" class="btn btn-primary">Enviar</button>
            </form>
        </section>
    </main>
</body>
<?php echo file_get_contents('../footer.shtml'); ?>
</html>