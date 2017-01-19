<?php

$asset_version    = '1701191103';
$search_q         = $_GET['q'];
$search_q_display = htmlspecialchars($search_q, ENT_QUOTES);
$search_type      = is_numeric($_GET['type']) ? (int) $_GET['type'] : 1;
$search_source    = $_GET['source'];

$search_types = array(
  0 => 'First Letter Start (Gurmukhi)',
  1 => 'First Letter Anywhere (Gurmukhi)',
  2 => 'Full Word (Gurakhar)',
  3 => 'Full Word (English)',
  4 => 'Romanized (English)',
);

$search_sources = array(
  'all' => 'All Sources',
  'G' => 'Guru Granth Sahib Ji',
  'D' => 'Dasam Granth Sahib',
  'B' => 'Bhai Gurdas Ji Vaaran',
  'N' => 'Bhai Nand Lal Ji Vaaran',
  'A' => 'Amrit Keertan',
);

//If the search type doesn't exist, set our default
if (!array_key_exists($search_type, $search_types)) {
  $search_type = 1;
}

//If the search source doesn't exist, set our default
if (!array_key_exists($search_source, $search_sources)) {
  $search_source = 'all';
}
