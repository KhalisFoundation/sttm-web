'use strict';

var API_URL = 'https://devapi.khajana.org/';

var TYPES = ['First Letter Start (Gurmukhi)', 'First Letter Anywhere (Gurmukhi)', 'Full Word (Gurakhar)', 'Full Word (English)', 'Romanized (English)'];

var SOURCES = {
  all: 'All Sources',
  G: 'Guru Granth Sahib Ji',
  D: 'Dasam Granth Sahib',
  B: 'Bhai Gurdas Ji Vaaran',
  N: 'Bhai Nand Lal Ji Vaaran',
  A: 'Amrit Keertan'
};

var buildApiUrl = function buildApiUrl(options) {
  var _options$q = options.q,
      q = _options$q === undefined ? false : _options$q,
      _options$source = options.source,
      source = _options$source === undefined ? false : _options$source,
      _options$type = options.type,
      type = _options$type === undefined ? false : _options$type,
      _options$writer = options.writer,
      writer = _options$writer === undefined ? false : _options$writer,
      _options$raag = options.raag,
      raag = _options$raag === undefined ? false : _options$raag,
      _options$ang = options.ang,
      ang = _options$ang === undefined ? false : _options$ang,
      _options$results = options.results,
      results = _options$results === undefined ? false : _options$results,
      _options$offset = options.offset,
      offset = _options$offset === undefined ? false : _options$offset,
      _options$id = options.id,
      id = _options$id === undefined ? false : _options$id,
      _options$hukam = options.hukam,
      hukam = _options$hukam === undefined ? false : _options$hukam,
      _options$akhar = options.akhar,
      akhar = _options$akhar === undefined ? false : _options$akhar,
      _options$lipi = options.lipi,
      lipi = _options$lipi === undefined ? false : _options$lipi,
      _options$random = options.random,
      random = _options$random === undefined ? false : _options$random;


  var url = API_URL;

  if (q !== false) {
    url += 'search/' + q + '/?';
    if (source) url += 'source=' + source + '&';
    if (type) url += 'searchtype=' + type + '&';
    if (writer) url += 'writer=' + writer + '&';
    if (raag) url += 'raag=' + raag + '&';
    if (ang) url += 'ang=' + ang + '&';
    if (results) url += 'results=' + results + '&';
    if (offset) url += 'offset=' + offset + '&';
  } else if (id !== false) {
    url += 'shabad/' + id;
  } else if (ang !== false) {
    url += 'ang/' + ang + '/';
    if (source) url += source;
  } else if (hukam !== false) {
    url += 'hukamnama/today';
  } else if (akhar !== false && lipi !== false) {
    url += 'akhar/' + lipi;
  } else if (random !== false) {
    url += 'random';
  } else {
    throw new Error('Invalid options sent');
  }
  return url;
};