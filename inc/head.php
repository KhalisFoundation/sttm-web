<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= $title ? $title . ' - ' : '' ?>SikhiToTheMax</title>
    <link rel="stylesheet" href="/css/foundation.min.css?v=6.2.4">
    <link rel="stylesheet" href="/css/font-awesome.min.css?v=4.7.0">
    <link rel="stylesheet" href="/css/style.css?v=<?= $asset_version ?>">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  </head>
  <body class="<?= @implode(' ', $body_classes) ?>">
