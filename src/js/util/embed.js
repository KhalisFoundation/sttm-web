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

        
        #sttm-root .sttm-button {
          text-decoration: none;
          text-transform: capitalize;
          display: inline-block;
          border: none;
          padding: 10px;
          margin: 5px;
          border-radius: 5px;
        }

        #sttm-root .sttm-shabad-controls {
          position: sticky;
          top: 64px;
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

        }
        #sttm-root .sttm-shabad-content {

        }
      </style>
      <div id="sttm-root">
        <div class="sttm-header">
          <img height="50" src="https://sikhitothemax.org/assets/images/sttm_icon.png" alt="SikhiToTheMax Logo"/>
          <a class="sttm-button sttm-primary" href="https://sikhitothemax.org/shabad?id=${
            info.id
          }">Open in SikhiToTheMax</a>
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
