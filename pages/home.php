<?php

$body_classes[]   = 'home';
$hide_search_bar  = true;
$scripts[]        = '/js/index.js';

?>
      <div class="search-page">
        <form class="search-form" action="/search">
          <div class="flex justify-center align-center">
            <div>
              <img class="logo-long" src="/images/sttm_logo_beta.png" alt="SikhiToTheMax Logo" />
            </div>
          </div>
          <div id="search-container">
            <input name="q" id="search" class="gurbani-font" type="search" placeholder="Koj"><button type="button" class="gurmukhi-keyboard-toggle"><i class="fa fa-keyboard-o"></i></button><button type="submit"><i class="fa fa-search"></i></button>
<?php
include 'inc/gurmukhi-keyboard.php';
?>
          </div>
          <div class="row">
            <div class="small-6 columns">
              <select name="type" id="searchType">
<?php
  foreach ($search_types as $search_type_key => $search_type_val) {
?>
                <option value="<?= $search_type_key ?>"<?= $search_type_key == $search_type ? ' selected' : '' ?>><?= $search_type_val ?></option>
<?php
  }
?>
              </select>
            </div>
            <div class="small-6 columns">
              <select name="source">
<?php
  foreach ($search_sources as $search_source_key => $search_source_val) {
?>
                <option value="<?= $search_source_key ?>"<?= $search_source_key == $search_source ? ' selected' : '' ?>><?= $search_source_val ?></option>
<?php
  }
?>
              </select>
            </div>
          </div>
        </form>
      </div>
