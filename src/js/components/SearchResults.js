
export default ({ }) => {
  $controls = renderControls();
  return (
    <div>
      {$controls}
      <ul class="search-results display"></ul>
    </div>
  );
}
