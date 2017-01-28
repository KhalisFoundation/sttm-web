<?php

require_once('inc/globals.php');

//Get the current page
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$path = explode('?', $path);
$path = explode('/', $path[0]);
$page = $path[0] ? (@in_array($path[0], $pages) ? $path[0] : '404') : 'home';

//Get the information for the current page
$query      = "SELECT use_include, title, content FROM pages WHERE slug = '$page'";
$result     = $mysqli->query($query);
$page_info  = $result->fetch_assoc();
$title      = $page_info['title'];

//Add 'not-home' class to body for relevant pages
if ($page != 'home') {
  $body_classes[] = 'not-home';
}

//Include the file that will output the contents of the page
$include = ((bool) $page_info['use_include']) ? $page : 'default';
ob_start();
include "pages/{$include}.php";
$content = ob_get_contents();
ob_end_clean();

//Template files
require_once('inc/head.php');
require_once('inc/top-bar.php');

echo $content;

require_once('inc/footer.php');
