<?php

$url = htmlspecialchars($_GET["url"]);

$html = file_get_contents($url);

echo "$html"

?>
