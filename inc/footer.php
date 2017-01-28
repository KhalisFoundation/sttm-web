    </div>
    <footer>
      <div class="row">
        <ul class="menu">
<?php
foreach ($menus['footer'] as $menu_item) :
?>
          <li><a href="<?= $menu_item['link'] ? $menu_item['link'] : "/{$menu_item['slug']}" ?>"><?= $menu_item['link_name'] ?></a></li>
<?php
endforeach;
?>
        </ul>
      </div>
    </footer>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-47386101-5', 'auto');
      ga('send', 'pageview');

    </script>

    <script src="/js/jquery-3.1.1.min.js"></script>
    <script src="/js/foundation.min.js?v=6.2.4"></script>
    <script src="/js/main.js?v=<?= $asset_version ?>"></script>
    <script src="/js/h.js?v=1"></script>
    <script src="/js/getParameterByName.js"></script>
    <script src="/js/khajana.js?v=<?= $asset_version ?>"></script>

<?php
  if (is_array($scripts)) {
    foreach ($scripts as $script) {
      echo "    <script src=\"{$script}?v={$asset_version}\"></script>\n";
    }
  }
?>

  </body>
</html>
