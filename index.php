<?php
    $lang = $_COOKIE['lang'] != '' ? $_COOKIE['lang'] : "uk";
?>

<!DOCTYPE html>
<html lang="<?=$lang?>">

<?php

require(__DIR__ . "/static/header.html");
require(__DIR__ . "/static/{$lang}.html");
require(__DIR__ . "/static/footer.html");

?>
