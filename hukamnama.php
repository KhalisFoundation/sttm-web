<?php

$body_classes[] = 'not-home';
$title          = 'Hukamnama';

require_once('inc/globals.php');
require_once('inc/head.php');
require_once('inc/top-bar.php');
require_once('inc/controls.php');

?>
    <div>
      <div id="shabad" class="shabad translation-english">
      </div>
    </div>

<?php

$scripts[] = 'js/hukamnama.js';
$scripts[] = 'js/renderShabad.js';

require_once('inc/footer.php');
