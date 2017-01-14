const $search     = document.getElementById("search");
const $searchType = document.getElementById("searchType");
const $controls   = document.getElementById("controls");
const $toggles    = $controls.querySelectorAll("input[type=checkbox]");
const $dropdowns  = $controls.querySelectorAll("select");
const $shabad     = document.getElementById("shabad");

if ($searchType) $searchType.addEventListener("change", updateSearchLang);
[].forEach.call($toggles, toggle => toggle.addEventListener("click", shabadToggle));
[].forEach.call($dropdowns, dropdown => dropdown.addEventListener("change", shabadDropdown));

function updateSearchLang(set_search_type) {
  var searchType = ($searchType ? parseInt($searchType.value) : (typeof set_search_type == "string" ? parseInt(set_search_type) : 1));
  switch (searchType) {
    case 3:
    case 4:
      $search.classList.remove("gurbani-font");
      $search.placeholder = "Khoj";
      break;
    default:
      $search.classList.add("gurbani-font");
      $search.placeholder = "Koj";
      break;
  }
}

function shabadToggle(e) {
  switch(e.target.id) {
    case "unicode-toggle":
      Array.from($shabad.querySelectorAll('.unicode')).forEach(el => el.classList.toggle('hidden'));
      Array.from($shabad.querySelectorAll('.gurlipi')).forEach(el => el.classList.toggle('hidden'));
      break;
  }
}
function shabadDropdown({ target: { value, options } }) {
  Array.from(options)
    .map(e => Array.from($shabad.querySelectorAll(e.value)))
    .forEach(els => els.forEach(el => el.classList.add('hidden')));

  if (value)
    Array.from($shabad.querySelectorAll(value))
      .forEach(el => el && el.classList.remove('hidden'));
}
