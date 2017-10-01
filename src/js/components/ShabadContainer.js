export default ({ }) => {
  // There's code that relies on these global variables
  $controls = renderControls();
  $meta = <div class="hidden" id="metadata"></div>;
  $shabad = <div id="shabad" class="shabad display"></div>;

  return (
    <div>
      {$controls}
      {$meta}
      <div>{$shabad}</div>
    </div>
  );
};