function renderControls() {
  return (
    <div id="controls-wrapper" class="no-select hidden">
      <div id="share-menu">
        <ul class="share-buttons">
          <li>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.sikhitothemax.org&t="
              target="_blank"
              title="Share on Facebook"
              onclick={"window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shortenURL()) + '&t=' + encodeURIComponent(shortenURL())); return false;"}
            >
              <i class="fa fa-facebook" aria-hidden="true" />
              <span class="sr-only">Share on Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/intent/tweet?source=http%3A%2F%2Fsttm.ws&text=:%20http%3A%2F%2Fsttm.ws&via=khalisfound"
              target="_blank"
              title="Tweet"
              onclick={"window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20' + encodeURIComponent(shortenURL())); return false;"}
            >
              <i class="fa fa-twitter" aria-hidden="true" />
              <span class="sr-only">Tweet</span>
            </a>
          </li>
          <li class="show-on-mobile">
            <a
              href="whatsapp://send?text=http%3A%2F%2Fsttm.ws"
              data-action="share/whatsapp/share"
              target="_blank"
              title="Share on Whatsapp"
              onclick={"window.open('whatsapp://send?text=' + encodeURIComponent(shortenURL()) + '%20' +  encodeURIComponent(document.title)); return false;"}
            >
              <i class="fa fa-whatsapp" aria-hidden="true" />
              <span class="sr-only">Share on Whatsapp</span>
            </a>
          </li>
          <li>
            <a
              href="http://www.reddit.com/submit?url=http%3A%2F%2Fsttm.ws&title: "
              target="_blank"
              title="Submit to Reddit"
              onclick={"window.open('http://www.reddit.com/submit?url=' + encodeURIComponent(shortenURL()) + '&title: ' +  encodeURIComponent(document.title)); return false;"}
            >
              <i class="fa fa-reddit" aria-hidden="true" />
              <span class="sr-only">Submit to Reddit</span>
            </a>
          </li>
          <li>
            <a
              href="http://www.tumblr.com/share?v=3&u=http%3A%2F%2Fsttm.ws&t=&s="
              target="_blank"
              title="Post to Tumblr"
              onclick={"window.open('http://www.tumblr.com/share?v=3&u=' + encodeURIComponent(shortenURL()) + '&t=' +  encodeURIComponent(document.title)); return false;"}
            >
              <i class="fa fa-tumblr" aria-hidden="true" />
              <span class="sr-only">Post to Tumblr</span>
            </a>
          </li>
          <li>
            <a
              href="http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fsttm.ws&description="
              target="_blank"
              title="Pin it"
              onclick={"window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(shortenURL()) + '&description=' +  encodeURIComponent(document.title)); return false;"}
            >
              <i class="fa fa-pinterest" aria-hidden="true" />
              <span class="sr-only">Pin it</span>
            </a>
          </li>
          <li>
            <a
              href="mailto:?subject=&body=:%20http%3A%2F%2Fsttm.ws"
              target="_blank"
              title="Send email"
              onclick={"window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(shortenURL())); return false;"}
            >
              <i class="fa fa-envelope" aria-hidden="true" />
              <span class="sr-only">Send email</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="shabad-controllers">
        <a id="display-options-toggle" class="shabad-controller-toggle" click={shabadToggle}>
          <i class="fa fa-sliders" />
          <span>Display Options ↓</span>
        </a>
        <a id="unicode-toggle" class="shabad-controller-toggle" click={shabadToggle}>Unicode</a>
        <a id="larivaar-toggle" class="shabad-controller-toggle" click={shabadToggle}>Larivaar</a>
        <a id="larivaar_assist-toggle" class="shabad-controller-toggle" click={shabadToggle}>Larivaar Assist</a>
      </div>
      <div id="display-options" class="hidden">
        <div class="display-option-type">
          <div class="display-option-header">Transliteration</div>
          <a id="transliteration-english" class="display-option-toggle" click={displayOptionToggle}>English</a>
        </div>
        <div class="display-option-type">
          <div class="display-option-header">Translation</div>
          <a id="translation-punjabi" class="display-option-toggle" click={displayOptionToggle}>Punjabi</a>
          <a id="translation-english" class="display-option-toggle" click={displayOptionToggle}>English</a>
          <a id="translation-spanish" class="display-option-toggle" click={displayOptionToggle}>Spanish</a>
        </div>
        <div class="display-option-type">
          <div class="display-option-header">Split View</div>
          <a id="split-view" class="display-option-toggle" click={displayOptionToggle}>Split View</a>
        </div>
      </div>
    </div>
  );
}
