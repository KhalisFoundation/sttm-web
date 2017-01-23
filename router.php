<?php
if (preg_match('/\.(?:png|jpg|jpeg|gif|win32|css|js|ttf|ico)/', $_SERVER["REQUEST_URI"])) {
    return false;
} else {
    include __DIR__ . '/index.php';
}
