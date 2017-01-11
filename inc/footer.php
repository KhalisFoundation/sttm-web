    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.4/foundation.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/h.js"></script>
    <script src="js/getParameterByName.js"></script>
    <script src="js/khajana.js"></script>

<?php
  if (is_array($scripts)) {
    foreach ($scripts as $script) {
      echo "    <script src=\"{$script}\"></script>\n";
    }
  }
?>

  </body>
</html>
