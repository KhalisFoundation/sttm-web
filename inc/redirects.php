<?php

if ($_SERVER['SCRIPT_NAME'] == "/page.asp") {
  parse_str($_SERVER['QUERY_STRING'], $query_string);
  if ($query_string['SourceID'] && $query_string['PageNo']) {
    header("HTTP/1.1 301 Moved Permanently");
    header("location: /ang?ang={$query_string['PageNo']}&source={$query_string['SourceID']}");
    exit;
  }
}
