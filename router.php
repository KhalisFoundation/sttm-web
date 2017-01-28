<?php
if (preg_match('/\.(?:png|jpg|jpeg|gif|win32|css|js|ttf|ico|eot|svg|woff|woff2|otf)/', $_SERVER["REQUEST_URI"])) {
    return false;
} else {
    include __DIR__ . '/index.php';
}
