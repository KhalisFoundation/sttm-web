<?php

$body_classes[]   = 'home';
$hide_search_bar  = true;

require_once('inc/globals.php');
require_once('inc/head.php');
require_once('inc/controls.php');
require_once('inc/top-bar.php');

?>
    <div class="row">
      <div class="search-page">
        <form class="search-form" action="search.php">
          <div class="flex justify-center align-center">
            <div>
              <img class="logo-long" src="images/sttm_long_logo.png" alt="SikhiToTheMax Logo" />
            </div>
          </div>
          <div id="search-container">
            <input name="q" id="search" class="gurbani-font" type="search" placeholder="Koj">
            <button type="submit"><i class="fa fa-search"></i></button>
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
    </div>

<?php

$scripts[] = 'js/index.js';

require_once('inc/footer.php');
