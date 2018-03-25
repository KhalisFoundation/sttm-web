/* eslint-disable react/jsx-key, react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SHORT_DOMAIN } from '../../constants';

const content = {
  Web: [
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
      `Unicode allows the Gumukhi text to be viewed without needing a pre-installed font. It will
        also allow you to copy and paste the text into vast variety of applications that you normally
        wouldn’t be able to do.`,
    ],
    [
      'How does the URL shorter work?',
      <React.Fragment>
        We have a custom domain for short urls,{' '}
        <a href={`http://${SHORT_DOMAIN}`}>{`http://${SHORT_DOMAIN}`}</a>. It
        works as follows:
        <ul>
          <li>
            In case of a shabad, say
            <code>
              ਮੇਰੇ ਸਾਹਾ ਮੈ ਹਰਿ ਦਰਸਨ ਸੁਖੁ ਹੋਇ ॥ ਹਮਰੀ ਬੇਦਨਿ ਤੂ ਜਾਨਤਾ ਸਾਹਾ ਅਵਰੁ ਕਿਆ
              ਜਾਨੈ ਕੋਇ ॥ ਰਹਾਉ ॥
            </code>, the shabad id is <code>2555</code>, and the short URL is{' '}
            <a
              href={`http://${SHORT_DOMAIN}/s/2555`}
            >{`http://${SHORT_DOMAIN}/s/2555`}</a>.
          </li>
          <li>
            In case of ang, for example ang <code>12</code> of Guru Granth Sahib
            Jee, the short URL is{' '}
            <a
              href={`http://${SHORT_DOMAIN}/a/12`}
            >{`http://${SHORT_DOMAIN}/a/12`}</a>.
          </li>
          <li>
            In case of hukamnama, the short URL is{' '}
            <a
              href={`http://${SHORT_DOMAIN}/h`}
            >{`http://${SHORT_DOMAIN}/h`}</a>.
          </li>
        </ul>
      </React.Fragment>,
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
    .replace(/[^a-z.\-]/g, '')
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
        <h4 className="breadcrumb">
          <Link to="/">Home</Link> » Help
        </h4>
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.scrollToQuestion();
    }
  }
}
