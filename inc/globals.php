<?php

//sikhitothemax.com URL structure -> sikhitothemax.org 
require_once('inc/redirects.php');

require_once('inc/mysql.php');

//Get site settings
$query = "SELECT id, setting_name, setting_value FROM settings";

if ($results = $mysqli->query($query)) {
  while ($result = $results->fetch_assoc()) {
    $$result['setting_name'] = $result['setting_value'];
  }
}

//Get all the pages
$query = "SELECT id, slug, link_name, location, link, menu_order FROM pages";
if ($results = $mysqli->query($query)) {
  while ($result = $results->fetch_assoc()) {
    if ($result['slug']) {
      $pages[] = $result['slug'];
    }
    if (is_numeric($result['menu_order'])) {
      $menus[$result['location']][$result['menu_order']] = array(
        'slug' => $result['slug'],
        'link_name' => $result['link_name'],
        'link' => $result['link']
      );
    }
  }
}

$search_q         = $_GET['q'];
$search_q_display = htmlspecialchars($search_q, ENT_QUOTES);
$search_type      = is_numeric($_GET['type']) ? (int) $_GET['type'] : 1;
$search_source    = $_GET['source'];

//Decode JSON into objects for relevant settings
$search_types   = json_decode($search_types);
$search_sources = json_decode($search_sources);

//If the search type doesn't exist, set our default
if (!array_key_exists($search_type, $search_types)) {
  $search_type = 1;
}

//If the search source doesn't exist, set our default
if (!array_key_exists($search_source, $search_sources)) {
  $search_source = 'all';
}
