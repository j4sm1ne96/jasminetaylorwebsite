<!DOCTYPE html>
<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link href="style.css" rel='stylesheet'>
    </head>
    <body>
        <nav class="navbar sticky-top navbar-dark bg-dark">
            <a class="navbar-brand" href="index.html">About Me</a>
            <a class="navbar-brand" href="index.html">Skills</a>
            <a class="navbar-brand" href="index.html">Experience</a>
            <a class="navbar-brand" href="index.html">Projects</a>
            <a class="navbar-brand" href="contact.php">Contact Me</a>
        </nav>
        <section id ='contact'>
            <div class ="container">
                <div class ="row">
                    <div class="col"><h2>Contact Me:</h2></div>
                </div>
                <div class="row">
                    <div class="col"><h3>Please fill in the form below to send me an email</h3></div>
                </div>
                <div class="container">
                <form method = "post" action="send.php">
                    <input type="text" name="name" class="form-control" placeholder="Your Name" required><br>
                    <input type="tel" name="phone" class="form-control" placeholder="Phone" required><br>
                    <input type="email" name="email" class="form-control" placeholder="Email" required><br>
                    <textarea name="message" class="form-control" placeholder="Your Message" required></textarea><br>
                    <input type="hidden" name="phone2">
                    <button type="submit" name="submit" class="btn btn-success">Send Email</button>
                </form>
                </div>
            </div>
        </section>
</body>
<html