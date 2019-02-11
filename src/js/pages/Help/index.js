/* eslint-disable react/jsx-key, react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { pageView } from '../../util/analytics';
import { SHORT_DOMAIN, TEXTS } from '../../constants';
import BreadCrumb from '../../components/Breadcrumb';

const content = {
  General: [
    [
      `How do I use a QWERTY keyboard to type Gurmukhi?`,
      <React.Fragment>
        Please reference the following keyboard map:
        <img src="/assets/images/help/web-desktop-keyboard-map.png" />
      </React.Fragment>,
    ],
    [
      `Why are there differences between my Gutka Sahib and this website, especially in padchedd and some spellings?`,
      <React.Fragment>
        SikhiToTheMax is powered by{' '}
        <a href="http://banidb.com/" target="_blank" rel="noopener noreferrer">
          BaniDB
        </a>
        , which follows SGPC's standardized versions of all Baani. Scholars at
        SGPC have worked for years to come to a conclusion on padchedd spacing
        and spelling, which is now accepted by the Panth. In order to stay
        consistent with the Panth and not be biased towards any Jathebandi
        interpretations, BaniDB and the apps it powers follow SGPC approved
        padchedd and spelling. In case you find any discrepancy, feel free to
        share your{' '}
        <a
          href="https://form.jotform.com/80266126732151"
          target="_blank"
          rel="noopener noreferrer"
        >
          feedback
        </a>{' '}
        along with sources.
      </React.Fragment>,
    ],
  ],
  Web: [
    [
      'Why does SikhiToTheMax Website use cookies and localStorage?',
      <React.Fragment>
        SikhiToTheMax website uses two web technologies to store your
        preferences.
        <ol>
          <li>
            <h5>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"
                rel="noopener noreferrer"
                target="_blank"
              >
                Cookies
              </a>
            </h5>
            If you choose "Dark Mode", we save that preference in a cookie so as
            to serve dark mode website to you from the server itself. This
            preference is naturally shared with our servers.
          </li>

          <li>
            <h5>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage"
                rel="noopener noreferrer"
                target="_blank"
              >
                LocalStorage
              </a>
            </h5>
            LocalStorage (not shared with our servers at all) is also used to
            save your display and font preferences, and other things like
            previous read page.
          </li>
        </ol>
      </React.Fragment>,
    ],
    [
      'How do I search for a shabad?',
      <React.Fragment>
        After launching SikhiToTheMax, by default you can search for a shabad by
        entering the first letter of each word. For example, if the shabad is{' '}
        <code>ਗੁਰੁ ਮੇਰੈ ਸੰਗਿ ਸਦਾ ਹੈ ਨਾਲੇ</code>, you would enter "gmsshn".
        Alternatively, you can click on the gurmukhi keyboard icon and type in
        the letters manually.
      </React.Fragment>,
    ],
    [
      'Can I separate the Gurbani from the English translations?',
      `When viewing a shabad or ang, click "Display Options" and then the "Split View" button
        in the drop down menu.`,
    ],
    [
      'What does the unicode button do?',
      `Unicode allows the Gurmukhi text to be viewed without needing a pre-installed font. It will
        also allow you to copy and paste the text into vast variety of applications that you normally
        wouldn’t be able to do.`,
    ],
    [
      `How to type Gurmukhi with keyboard?`,
      <React.Fragment>
        <p>
          In order to search using qwerty based keyboard, you need to refer to
          following key mappings between Gurmukhi letters and English letters.
        </p>
        <table>
          <tbody>
            {[
              ['a', 'A', 'e', 's', 'h'],
              ['k', 'K', 'g', 'G', '|'],
              ['c', 'C', 'j', 'J', '\\'],
              ['t', 'T', 'f', 'F', 'x'],
              ['q', 'Q', 'd', 'D', 'n'],
              ['p', 'P', 'b', 'B', 'm'],
              ['X', 'r', 'l', 'v', 'V'],
            ].map(keys => (
              <tr key={keys[0]}>
                {keys.map(key => (
                  <React.Fragment key={key}>
                    <td>
                      <strong>{key}</strong>
                    </td>
                    <td>
                      <span className="gurbani-font">{key}</span>
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>,
    ],
    [
      `What is Split View?`,
      <React.Fragment>
        Split view separates the gurmukhi, transliteration, and translations
        into individual sections on the page. To access this option, open
        display settings, and choose “Split View”
        <img src="/assets/images/help/web-split-view.png" />
      </React.Fragment>,
    ],
    [
      'How do I share a shabad and use the link shortener?',
      <React.Fragment>
        Each shabad has a unique URL that can be shared online. Rather than
        copying a long URL, we automatically shorten it to something more
        shareable. You can do this by clicking any of the social media icons in
        the shabad view, or pressing the last icon to copy the link to your
        clipboard
        <img src="/assets/images/help/web-share-link-shortener.png" />
        Additionally, for more advanced ways of using the link shortener, you
        have the following options:
        <ul>
          <li>
            In case of a shabad, say{' '}
            <code>
              ਮੇਰੇ ਸਾਹਾ ਮੈ ਹਰਿ ਦਰਸਨ ਸੁਖੁ ਹੋਇ ॥ ਹਮਰੀ ਬੇਦਨਿ ਤੂ ਜਾਨਤਾ ਸਾਹਾ ਅਵਰੁ ਕਿਆ
              ਜਾਨੈ ਕੋਇ ॥ ਰਹਾਉ ॥
            </code>
            , the shabad id is <code>2555</code>, and the short URL is{' '}
            <a href={`http://${SHORT_DOMAIN}/s/2555`}>
              {' '}
              http://
              {SHORT_DOMAIN}
              /s/2555
            </a>{' '}
          </li>
          <li>
            In case of ang, for example ang <code>12</code> of Guru Granth Sahib
            Jee, the short URL is{' '}
            <a href={`http://{SHORT_DOMAIN}/a/12`}>
              http://
              {SHORT_DOMAIN}
              /a/12
            </a>{' '}
          </li>
          <li>
            In case of hukamnama, the short URL is{' '}
            <a href={`http://${SHORT_DOMAIN}/h`}>
              {' '}
              http://
              {SHORT_DOMAIN}
              /h{' '}
            </a>{' '}
          </li>
          <li>
            In case of random shabad, the short URL is{' '}
            <a href={`http://${SHORT_DOMAIN}/r`}>
              {' '}
              http://
              {SHORT_DOMAIN}
              /r{' '}
            </a>{' '}
          </li>
          <li>
            In case of going to Sundar Gutka, the short URL is{' '}
            <a href={`http://${SHORT_DOMAIN}/sg`}>
              {' '}
              http://
              {SHORT_DOMAIN}
              /sg{' '}
            </a>{' '}
          </li>
        <li>
            In case of going to the Index, the short URL is{' '}
            <a href={`http://${SHORT_DOMAIN}/i`}>
              {' '}
              http://
              {SHORT_DOMAIN}
              /i{' '}
            </a>{' '}
          </li>
      </ul>
      </React.Fragment>,
    ],
  ],
  Desktop: [
    [
      'Video Tutorial',

      <div id="video">
        <div className="videoWrapper">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ZDX8nPkDBSc"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>,
    ],
    [
      'How do I install the desktop application?',
      <React.Fragment>
        You can install SikhiToTheMax (STTM) by visiting{' '}
        <a href="https://khalisfoundation.org/portfolio/sikhitothemax-everywhere/">
          this website
        </a>{' '}
        and choosing the Windows or macOS download link. After that, open the
        installer and follow the steps that are displayed.
        <img src="/assets/images/help/desktop-download.png" />
      </React.Fragment>,
    ],
    [
      'How do I search for a shabad?',
      <React.Fragment>
        After launching STTM, by default you can search for a shabad by entering
        the first letter of each word. For example, if the shabad is ਗੁਰੁ ਮੇਰੈ
        ਸੰਗਿ ਸਦਾ ਹੈ ਨਾਲੇ , you would enter <code>gmsshn</code>.
        <img src="/assets/images/help/desktop-search-ex.png" />
        Alternatively, you can click on the gurmukhi keyboard icon and type in
        the letters manually.
        <img src="/assets/images/help/desktop-keyboard.png" />
      </React.Fragment>,
    ],
    [
      'What do the different search types do?',
      <React.Fragment>
        <ul>
          <li>
            First Letter (Start)
            <ul>
              <li>
                The letters you input must be from the START of a line in a
                shabad.
              </li>
            </ul>
          </li>
          <li>
            First Letter (Anywhere)
            <ul>
              <li>
                The letters you input can be from any part of the line. For
                example, you can start your search by typing in the first letter
                of every word in the second half of a shabad’s line.
              </li>
            </ul>
          </li>
          <li>
            Full Word (Gurmukhi)
            <ul>
              <li>
                You can type in the full word(s) in gurmukhi that you are
                searching for.
              </li>
            </ul>
          </li>
          <li>
            English Translation (Full Word)
            <ul>
              <li>
                You can search for shabads via the english translations. For
                example, type in the word <code>bird</code> and the results will
                show all shabads that include a translation for "bird".
              </li>
            </ul>
          </li>
        </ul>
      </React.Fragment>,
    ],
    [
      "I can't find my shabad.",
      <ul>
        <li>
          STTM's database includes shabads from Sri Guru Granth Sahib Ji, Sri
          Dasam Granth Sahib, Bhai Gurdas Jee, Bhai Gurdas Singh Jee, Bhai Nand
          Lal Jee, and various rehatnamas and thankhanamas. If your shabad is
          not from one of those sources, it will not appear.
        </li>
        <li>
          If you verified your shabad should be in the database and it is still
          not coming up, make sure you are typing in the correct letters for
          search. If you aren’t sure about a letter, or are still having
          difficulties, try using one of the different search types to locate
          the shabad.
        </li>
      </ul>,
    ],
    [
      'How do I connect STTM to a projector?',
      <React.Fragment>
        Plug in your computer to the projector or TV. Once you do this, go to
        your computer's display settings and change it to "Extended Desktop"
        (NOT mirroring). After that, launch STTM and turn on "Presenter View" in
        the settings!
        <img src="/assets/images/help/desktop-extend-pc.png" />
        <img src="/assets/images/help/desktop-extend-mac.png" />
      </React.Fragment>,
    ],
    [
      'How do I change the background color?',
      <React.Fragment>
        After launching STTM, click the icon for settings, and choose your
        theme.
        <img src="/assets/images/help/desktop-theme.png" />
      </React.Fragment>,
    ],
    [
      'Can you view the Gurbani in Larivaar?',
      <React.Fragment>
        Yes! After launching STTM, click the icon for settings, and choose the
        Larivaar option.
        <img src="/assets/images/help/desktop-larivaar.png" />
      </React.Fragment>,
    ],
    [
      'How can I make the fonts on the screen smaller?',
      <React.Fragment>
        After launching STTM, click the icon for settings, and scroll down for
        options to adjust the font size.
        <img src="/assets/images/help/desktop-font-size.png" />
      </React.Fragment>,
    ],
    [
      'Where can I see my previous shabads?',
      <React.Fragment>
        When using STTM in “Presenter View”, your history will appear in the
        bottom right quadrant. You can click any of the shabads in the list to
        bring them back up as your primary one.
        <img src="/assets/images/help/desktop-history.png" />
      </React.Fragment>,
    ],
    [
      'What is Akhand Paatth view?',
      <React.Fragment>
        Akhand Paatth view is currently a beta feature we have added to the
        desktop application. You can enable it in the settings under Display
        Options. When enabled, it allows you to scroll infinitely past the
        Shabad you started with. Additionally, you can press the arrows in the
        menu bar to quickly go to the next/previous Shabad without having to
        scroll at all.
        <img src="/assets/images/help/desktop-akhand-paatth-view-toggle.png" />
        <img src="/assets/images/help/desktop-akhand-paatth-view.png" />
      </React.Fragment>,
    ],
    [
      'How do I show a custom slide?',
      <React.Fragment>
        You are now able to add a custom slide when using SikhiToTheMax. We
        currently support options for:
        <ul>
          <li>Empty Slide: this will display a blank slide</li>
          <li>
            Add Waheguru Slide: this will show a blank slide with only
            "Waheguru" on it
          </li>
          <li>
            Add Dhan Guru ___: this will show a blank slide with "Dhan Guru"
            followed by the Guru you choose from the dropdown
          </li>
          <li>
            Additionally, you can create a custom announcement slide. By
            default, it will be written in English, however, there is a toggle
            for Gurmukhi if you'd like to use that instead.
          </li>
        </ul>
        <img src="/assets/images/help/desktop-custom-slide-button.png" />
        <img src="/assets/images/help/desktop-custom-slide-controller.png" />
        To get to the "Custom Slides" feature, click on slides icon on the top
        right when viewing a Shabad.
      </React.Fragment>,
    ],
    [
      'How do I report a mistake?',
      <React.Fragment>
        Visit <a href="https://sikhitothemax.org">SikhiToTheMax.org</a> and
        click "<a href="https://goo.gl/plk23h">Feedback</a>" at the bottom of
        the page.
      </React.Fragment>,
    ],
  ],
};

const getTitle = question =>
  question
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-z.\\-]/g, '')
    .substr(0, 50);

const contentWithTitle = Object.keys(content).reduce(
  (o, header) => ({
    ...o,
    [header]: content[header].map(([question, answer]) => [
      getTitle(question),
      question,
      answer,
    ]),
  }),
  {}
);

export default class Help extends React.Component {
  static propTypes = {
    location: PropTypes.shape({ hash: PropTypes.string }),
  };

  shouldComponentUpdate(nextProps) {
    return this.props.location.hash !== nextProps.location.hash;
  }

  render() {
    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.URIS.HELP }]} />
        <div id="help">
          <div id="sidebar">
            <ul>
              {Object.keys(contentWithTitle).map(header => (
                <li key={header}>
                  <a href={`#${header}`}>{header}</a>
                  <ul>
                    {contentWithTitle[header].map(([title, question]) => (
                      <li key={question}>
                        <a href={`#${header}-${title}`}>{question}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <main>
            {Object.keys(contentWithTitle).map(header => (
              <section id={header} key={header}>
                <h3>{header}</h3>
                {contentWithTitle[header].map(([title, question, answer]) => (
                  <div
                    className="question"
                    id={`${header}-${title}`}
                    key={title}
                  >
                    <h3>
                      <a href={`#${header}-${title}`}>#</a> {question}
                    </h3>
                    <div>{answer}</div>
                  </div>
                ))}
              </section>
            ))}
          </main>
        </div>
      </div>
    );
  }

  scrollToQuestion = () => {
    const { hash } = this.props.location;
    if (hash.includes('#')) {
      const $item = document.querySelector(`[id="${hash.replace('#', '')}"]`);
      if ($item) {
        requestAnimationFrame(() => window.scrollTo(0, $item.offsetTop));
      }
    }
  };

  componentDidMount() {
    this.scrollToQuestion();
    pageView('/help');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.scrollToQuestion();
    }
  }
}
