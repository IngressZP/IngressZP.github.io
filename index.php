<?php
    $lang = $_COOKIE['lang'] != '' ? $_COOKIE['lang'] : "uk";
?>

<!DOCTYPE html>
<html lang="<?=$lang?>">

<?php

require("static/header.html");
require("static/{$lang}.html");
require("static/footer.html");

?>
