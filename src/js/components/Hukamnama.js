export default ({ }) => {
  // There's code that relies on these global variables
  $controls = renderControls();
  $meta = <div class="hidden" id="metadata"></div>;
  $shabad = <div id="shabad" class="shabad display"></div>;

  return (
    <div class="body_text">
      <h3 style="text-align: center;">
        Daily Hukamnama from Sri Harmandir Sahib, Amritsar
      </h3>
      {$controls}
      {$meta}
      <div>{$shabad}</div>
    </div>
  );
}

