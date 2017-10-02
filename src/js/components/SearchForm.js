import { entries } from '../util';
import Option from './Option';

export default ({ }) => {
  const $search = (
    <input
      name="q"
      id="search"
      class="gurbani-font"
      type="search"
      placeholder="Koj"
      autocapitalize="none"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      required='required'
      title='Enter 3 characters minimum.'
      pattern='.{3,}'
    />
  );

  const types = [...Khajana.TYPES, 'Ang']
    .map((children, value) => Option({ value, children }))
  ;

  const sources = entries(Khajana.SOURCES)
    .map(([value, children]) => Option({ value, children }))
  ;

  const gurmukhiKeyboard = renderGurmukhiKeyboard($search);

  return (
    <div class="search-page">
      <form class="search-form" action="/search">
        <div class="flex justify-center align-center">
          <div>
            <img
              class="logo-long"
              src="/assets/images/sttm_logo.png"
              alt="SikhiToTheMax Logo"
            />
          </div>
        </div>
        <div id="search-container">

          {$search}

          <button 
            type="button"
            class="gurmukhi-keyboard-toggle"
            click={() => gurmukhiKeyboard.classList.toggle('active')}
          >
            <i class="fa fa-keyboard-o" />
          </button>

          <button type="submit"><i class="fa fa-search" /></button>

          {gurmukhiKeyboard}
        </div>

        <div class="row search-options">
          <div class="small-6 columns">
            <select name="type" id="search-type" change={e => { updateSearchLang(e); updateSearchAction(e); }}>
              {types}
            </select>
          </div>
          <div class="small-6 columns">
            <select name="source">{sources}</select>
          </div>
        </div>
      </form >
    </div>
  );
}