<?php

if ($_SERVER['REDIRECT_URL'] == "/page.asp") {
  parse_str($_SERVER['QUERY_STRING'], $query_string);
  if ($query_string['SourceID'] && $query_string['PageNo']) {
    $redirect_url = "/ang?ang={$query_string['PageNo']}&source={$query_string['SourceID']}";
  } else if ($query_string['ShabadID']) {
    $redirect_url = "/shabad?id={$query_string['ShabadID']}";
  } else if ($query_string['random']) {
    $redirect_url = "/random";
  }
  if ($redirect_url) {
    header("HTTP/1.1 301 Moved Permanently");
    header("location: $redirect_url");
    exit;
  }
}
