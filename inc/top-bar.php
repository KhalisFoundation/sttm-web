    <div class="top-bar no-select">
      <div class="row">
        <div class="top-bar-title">
          <a href="/"></a>
        </div>
        <div id="responsive-menu">
<?php
if (!$hide_search_bar) :
?>
          <div class="top-bar-left">
            <form action="/search" id="top-bar-search-form" class="search-form">
              <ul class="menu">
                <li><div id="search-container"><input name="q" id="search" class="gurbani-font" type="search" placeholder="Koj" value="<?= $search_q_display ?>"><button class="gurmukhi-keyboard-toggle" type="button"><i class="fa fa-keyboard-o"></i></button><button type="submit"><i class="fa fa-search"></i></button>
<?php
include 'inc/gurmukhi-keyboard.php';
?>
                </li>
                <li><input name="type" class="hidden" value="<?= $search_type ?>" id="search-type-value" hidden /></li>
                <li><input name="source" class="hidden" value="<?= $search_source ?>" id="search-source-value" hidden /></li>
              </ul>
            </form>
          </div>
<?php
endif;
?>
          <div class="top-bar-right">
            <a href="#" class="button" id="open_mobile_menu"><i class="fa fa-bars"></i></a>
            <ul class="menu">
<?php
foreach ($menus['header'] as $menu_item) :
?>
          <li><a href="<?= $menu_item['link'] ? $menu_item['link'] : "/{$menu_item['slug']}" ?>" <?= stripos($menu_item['link'], 'http') > -1 ? ' target="_blank"' : '' ?>><?= $menu_item['link_name'] ?></a></li>
<?php
endforeach;
?>
              <li class="close"><a href="#">Close</a></li>
            </ul>
          </div>
        </div>
<?php
if (!$hide_search_bar) :
?>
        <div id="search-options">
          <select id="searchType" data-update="search-type-value">
<?php
  foreach ($search_types as $search_type_key => $search_type_val) :
?>
            <option value="<?= $search_type_key ?>"<?= $search_type_key == $search_type ? ' selected' : '' ?>><?= $search_type_val ?></option>
<?php
  endforeach;
?>
          </select><select id="searchSource" data-update="search-source-value">
<?php
  foreach ($search_sources as $search_source_key => $search_source_val) :
?>
            <option value="<?= $search_source_key ?>"<?= $search_source_key == $search_source ? ' selected' : '' ?>><?= $search_source_val ?></option>
<?php
  endforeach;
?>
          </select>
        </div>
<?php
endif;
?>
      </div>
    </div>
    <div class="row">
