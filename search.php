<?php

$body_classes[] = 'not-home';
$title          = 'Search Results';

require_once('inc/globals.php');
require_once('inc/head.php');
require_once('inc/top-bar.php');

?>
    <div>
      <ul class="search-results">
      </ul>
    </div>

<?php

$scripts[] = 'js/search.js';

require_once('inc/footer.php');
