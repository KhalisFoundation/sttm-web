<?php

$title = 'Shabad';

require_once('inc/head.php');
require_once('inc/top-bar.php');

?>
    <div>
      <div class="shabad">
      </div>
    </div>

<?php

$scripts[] = 'js/shabad.js';
$scripts[] = 'js/renderShabad.js';

require_once('inc/footer.php');
