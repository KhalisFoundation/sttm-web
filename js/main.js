const $search     = document.getElementById("search");

const $searchType = document.getElementById("searchType");

if ($searchType) $searchType.addEventListener("change", updateSearchLang);

function updateSearchLang(set_search_type) {
  var searchType = ($searchType ? parseInt($searchType.value) : (typeof set_search_type !== "undefined" ? parseInt(set_search_type) : 1));
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
