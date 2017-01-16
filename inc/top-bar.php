    <div class="top-bar no-select">
      <div class="top-bar-title">
        <a href="/"><img class="top-bar-logo-small" src="images/sttm_icon.png" alt="Sikhi To The Max" /></a>
      </div>
      <div id="responsive-menu">
<?php
if (!$hide_search_bar) {
?>
        <div class="top-bar-left">
          <form action="search.php">
            <ul class="menu">
              <li><div id="search-container"><input name="q" id="search" class="gurbani-font" type="search" placeholder="Koj"><button type="submit"><i class="fa fa-search"></i></button></div></li>
              <li><input name="type" class="hidden" hidden /></li>
              <li><input name="source" class="hidden" hidden /></li>
            </ul>
          </form>
        </div>
<?php
}
?>
        <div class="top-bar-right">
          <a href="#" class="button" id="open_mobile_menu"><i class="fa fa-bars"></i></a>
          <ul class="menu">
            <li><a href="/">Search</a></li>
            <li><a href="/hukamnama.php">Hukamnama</a></li>
            <li><a href="/amritkeertan.php">Amrit Keertan</a></li>
            <li class="close"><a href="#">Close</a></li>
          </ul>
        </div>
      </div>
    </div>
