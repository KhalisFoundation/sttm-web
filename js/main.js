const $search     = document.getElementById("search");
const $searchType = document.getElementById("searchType");
const $controls   = $("#controls-wrapper");
const $shabad     = document.getElementById("shabad");

if ($searchType) $searchType.addEventListener("change", updateSearchLang);

//Shabad controller toggles
$(".shabad-controller-toggle").on("click", shabadToggle);

//Shabad display option toggles
$(".display-option-toggle").on("click", displayOptionToggle);

$("#open_mobile_menu").on("click", function() {
  document.body.classList.toggle("menu-open");
})
$(".top-bar-right .close a").on("click", function() {
  document.body.classList.remove("menu-open");
})

$("#search-options select").on("change", function() {
  var update = $(this).data("update");
  $("#" + update).val($(this).val());
  if ($(this).attr("id") == "searchSource") {
    $("#top-bar-search-form").submit();
  }
});

$(".gurmukhi-keyboard-toggle").on("click", function() {
  $(".gurmukhi-keyboard").toggle();
});
$(".gurmukhi-keyboard button").on("click", function() {
  if ($(this).data("action")) {
    var action = $(this).data("action");
    if (action == 'bksp') {
      $("#search").val(function() {
        return this.value.substring(0, this.value.length-1);
      });
    } else if (action == "close") {
      $(".gurmukhi-keyboard").hide();
    } else if (action.includes('page')) {
      $(".gurmukhi-keyboard .page").hide();
      $("#gurmukhi-keyboard-" + action).show();
    }
  } else {
    var char = $(this).data("value") || $(this).text();
    $("#search").val(function() {
      return this.value + char;
    });
  }
});

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
    case "display-options-toggle":
      $("#display-options").toggleClass("hidden");
      break;
    case "unicode-toggle":
    case "larivaar-toggle":
    case "larivaar_assist-toggle":
      let toggle = e.target.id.split("-")[0];
      $(".shabad").toggleClass(toggle);
      break;
  }
}
function displayOptionToggle(e) {
  $(".shabad").toggleClass(e.target.id);
}
