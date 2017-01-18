    <div class="top-bar no-select">
      <div class="top-bar-title">
        <a href="/"></a>
      </div>
      <div id="responsive-menu">
<?php
if (!$hide_search_bar) {
?>
        <div class="top-bar-left">
          <form action="search.php">
            <ul class="menu">
              <li><div id="search-container"><input name="q" id="search" class="gurbani-font" type="search" placeholder="Koj" value="<?= $search_q_display ?>"><button type="submit"><i class="fa fa-search"></i></button></div></li>
              <li><input name="type" class="hidden" value="<?= $search_type ?>" id="search-type-value" hidden /></li>
              <li><input name="source" class="hidden" value="<?= $search_source ?>" id="search-source-value" hidden /></li>
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
            <!--<li><a href="/amritkeertan.php">Amrit Keertan</a></li>-->
            <li class="close"><a href="#">Close</a></li>
          </ul>
        </div>
      </div>
<?php
if (!$hide_search_bar) {
?>
      <div id="search-options">
        <select name="type" id="searchType" data-update="search-type-value">
<?php
  foreach ($search_types as $search_type_key => $search_type_val) {
?>
          <option value="<?= $search_type_key ?>"<?= $search_type_key == $search_type ? ' selected' : '' ?>><?= $search_type_val ?></option>
<?php
  }
?>
        </select><select name="source" data-update="search-source-value">
<?php
  foreach ($search_sources as $search_source_key => $search_source_val) {
?>
          <option value="<?= $search_source_key ?>"<?= $search_source_key == $search_source ? ' selected' : '' ?>><?= $search_source_val ?></option>
<?php
  }
?>
        </select>
      </div>
<?php
}
?>
    </div>
