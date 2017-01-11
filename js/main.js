const $search     = document.getElementById("search");

const $searchType = document.querySelector("select[name=type]");

if ($searchType) $searchType.addEventListener("change", updateSearchLang);

function updateSearchLang(type = null) {
  let searchType = type ? parseInt(type) : ($searchType ? parseInt($searchType.value) : 0);
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
