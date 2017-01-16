<?php

$body_classes[]   = 'home';
$hide_search_bar  = true;

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
                <option value="0">First Letter Start (Gurmukhi)</option>
                <option value="1" selected>First Letter Anywhere (Gurmukhi)</option>
                <option value="2">Full Word (Gurmukhi)</option>
                <option value="3">Full Word (English)</option>
                <option value="4">Romanized (English)</option>
              </select>
            </div>
            <div class="small-6 columns">
              <select name="source">
                <option value="all">All Sources</option>
                <option value="G">Guru Granth Sahib Ji</option>
                <option value="D">Dasam Granth Sahib</option>
                <option value="B">Bhai Gurdas Ji Vaaran</option>
                <option value="N">Bhai Nand Lal Ji Vaaran</option>
                <option value="A">Amrit Keertan</option>
                <option value="U">Uggardanti</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>

<?php

$scripts[] = 'js/index.js';

require_once('inc/footer.php');
