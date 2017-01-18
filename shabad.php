<?php

$body_classes[] = 'not-home';
$title          = 'Shabad';

require_once('inc/globals.php');
require_once('inc/head.php');
require_once('inc/top-bar.php');
require_once('inc/controls.php');

?>
    <div>
      <div class="shabad translation-english" id="shabad">
      </div>
    </div>

<?php

$scripts[] = 'js/shabad.js';
$scripts[] = 'js/renderShabad.js';

require_once('inc/footer.php');
