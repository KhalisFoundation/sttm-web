export default function getEmbedCode({ gurbani, info }) {
  return `
      <style>
        #sttm-root {
          font-size: 18px;
          font-weight: 300;
          font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
          background-color: #f5f5f5;
          padding: 10px;
          box-shadow: 0 0 10px -4px black;
          border: 1px solid grey;
          width: 500px;
          height: 500px;
          overflow: scroll;
          border-radius: 5px;
          position: relative;
        }

        #sttm-root .sttm-header {
          position: sticky;
          top: 0;
          display: flex;
          background: linear-gradient(45deg, rgba(1, 102, 155), rgba(243, 156, 29));
          margin: -10px;
          padding: 6px;
          justify-content: space-between;
        }

        #sttm-root .sttm-header img {
          height: 50px;
          width: 50px;
        }

        #sttm-root .sttm-header div {
          display: flex;
          align-items: center;
        }

        #sttm-root .sttm-header .sttm-title {
          text-transform: uppercase;
          margin-left: 10px;
          font-weight: 200;
          text-decoration: none;
          letter-spacing: 2px;
          color: white;
        }

        #sttm-root .sttm-button {
          text-decoration: none;
          text-transform: capitalize;
          display: inline-block;
          border: none;
          padding: 10px;
          margin: 5px;
          border-radius: 5px;
          cursor: pointer;
        }

        #sttm-root .sttm-shabad-controls {
          position: sticky;
          top: 62px;
          background: #f5f5f5;
          width: 100%;
        }

        #sttm-root .sttm-button.sttm-enabled {
          background-color: #01669b;
          color: white;
        }

        #sttm-root .sttm-button.sttm-primary {
          background-color: #01669b;
          color: #f39c1d;
        }

        #sttm-root .sttm-line {
          margin: 10px;
        }
        
        #sttm-root .sttm-line .sttm-baani {
          font-size: 1.3em;
        }
        
        #sttm-root .sttm-line .sttm-transliteration {
          display: none;
          color: #01669b;
          font-style: italic;
        }
        
        #sttm-root .sttm-line .sttm-translation {
          display: none;
          color: grey;
          border-left: .1em solid grey;
          padding-left: 1em;
          margin: .25em;
        }

        #sttm-root .sttm-line .sttm-translation.sttm-enabled,
        #sttm-root .sttm-line .sttm-transliteration.sttm-enabled {
          display: block;
        }

        #sttm-root .sttm-shabad-meta {
          padding: 0 10px;
        }

        #sttm-root .sttm-shabad-meta a {
          color: #01669b;
          text-decoration: none;
        }

        #sttm-root .sttm-shabad-content {

        }
      </style>
      <div id="sttm-root">
        <div class="sttm-header">
          <div>
            <img height="50" src="https://sikhitothemax.org/assets/images/sttm_icon.png" alt="SikhiToTheMax Logo"/>
            <a class="sttm-title" href="https://sikhitothemax.org" target="_blank">Sikhi To The Max</a>
          </div>
          <div>
            <a href="https://sikhitothemax.org/shabad?id=${
              info.id
            }" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="30" width="30" viewBox="0 0 50 50" enable-background="new 0 0 50 50"><path d="M38.288 10.297l1.414 1.415-14.99 14.99-1.414-1.414z"/><path d="M40 20h-2v-8h-8v-2h10z"/><path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z"/></svg>
            </a>
          </div>
        </div>
        <div class="sttm-shabad-controls"></div>
        <h3 class="sttm-shabad-meta">
          ${info.writer.english} | 
          ${info.source.english}: 
          <a href="https://sikhitothemax.org/ang?ang=${
            info.source.pageno
          }&source=${info.source.id}">
            ${info.source.pageno}
          </a>
        </h3>
        <div class="sttm-shabad-content">
        ${gurbani
          .map(
            ({ shabad }) =>
              `
              <div class="sttm-line">
                <div class="sttm-baani">${shabad.gurbani.unicode}</div>
                <div class="sttm-transliteration">${
                  shabad.transliteration
                }</div>
                <div class="sttm-translation sttm-english sttm-enabled">${
                  shabad.translation.english.ssk
                }</div>
                <div class="sttm-translation sttm-punjabi">${
                  shabad.translation.punjabi.bms.unicode
                }</div>
                <div class="sttm-translation sttm-spanish">${
                  shabad.translation.spanish
                }</div>
              </div>
        `
          )
          .join('')}
        </div>
      </div>
      <script async src="${window.location.origin}/embed.js"></script>
  `
    .trim()
    .replace(/([\t\n]| {2})/gi, '');
}
