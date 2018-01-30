$(function () {

  document.getElementById('content-root').appendChild(<h1>Help</h1>);
  const help = (<div id="help"></div>);

  const content = {
    'Web': [
      [ 'How do I search for a shabad?',
        'After launching SikhiToTheMax, by default you can search for a shabad by entering the ' +
        'first letter of each word. For example, if the shabad is ਗੁਰੁ ਮੇਰੈ ਸੰਗਿ ਸਦਾ ਹੈ ਨਾਲੇ , you ' +
        'would enter "gmsshn". Alternatively, you can click on the gurmukhi keyboard icon and type ' +
        'in the letters manually.'],
      [ 'Can I separate the Gurbani from the English translations?',
        'When viewing a shabad or ang, click "Display Options" and then the "Split View" button ' +
        'in the drop down menu.'],
      [ 'What does the unicode button do?',
        'Unicode allows the Gumukhi text to be viewed without needing a pre-installed font. It will ' +
        'also allow you to copy and paste the text into vast variety of applications that you normally ' +
        'wouldn’t be able to do. ']
    ],
    'Desktop': [
      [ 'Video Tutorial',
        '<div id="video"><div class="videoWrapper"><iframe width="560" height="315" ' +
        'src="https://www.youtube.com/embed/ZDX8nPkDBSc" frameborder="0" ' +
        'allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>'],
      [ 'How do I install the desktop application?',
        'You can install SikhiToTheMax (STTM) by visiting ' +
        '<a href="https://khalisfoundation.org/portfolio/sikhitothemax-everywhere/">this website</a>' +
        ' and choosing the Windows or macOS download link. After that, open the installer and follow ' +
        'the steps that are displayed. <img src="/assets/images/help/desktop-download.png" />'],
      [ 'How do I search for a shabad?',
        'After launching STTM, by default you can search for a shabad by entering the first letter ' +
        'of each word. For example, if the shabad is ਗੁਰੁ ਮੇਰੈ ਸੰਗਿ ਸਦਾ ਹੈ ਨਾਲੇ , you would enter "gmsshn".' +
        ' <img src="/assets/images/help/desktop-search-ex.png" /> Alternatively, you can click on the ' +
        'gurmukhi keyboard icon and type in the letters manually. ' +
        '<img src="/assets/images/help/desktop-keyboard.png" />'],
      [ 'What do the different search types do?',
        '<ul><li>First Letter (Start)' +
        '<ul><li>The letters you input must be from the START of a line in a shabad.</li></ul></li>' +
        '<li>First Letter (Anywhere)' +
        '<ul><li>The letters you input can be from any part of the line. For example, you can start your' +
        'search by typing in the first letter of every word in the second half of a shabad’s line.</li></ul></li>' +
        '<li>Full Word (Gurmukhi)' +
        '<ul><li>You can type in the full word(s) in gurmukhi that you are searching for.</li></ul></li>' +
        '<li>English Translation (Full Word)' +
        '<ul><li>You can search for shabads via the english translations. For example, type in the word ' +
        '"bird" and the results will show all shabads that include a translation for "bird".</li></ul>' +
        '</li></ul>'],
      [ 'I can\'t find my shabad.',
        '<ul><li>' +
        'STTM\'s database includes shabads from Sri Guru Granth Sahib Ji, Sri Dasam Granth Sahib, ' +
        'Bhai Gurdas Jee, Bhai Gurdas Singh Jee, Bhai Nand Lal Jee, and various rehatnamas and ' +
        'thankhanamas. If your shabad is not from one of those sources, it will not appear.</li>' +
        '<li>If you verified your shabad should be in the database and it is still not coming up, ' +
        'make sure you are typing in the correct letters for search. If you aren’t sure about a ' +
        'letter, or are still having difficulties, try using one of the different search types to ' +
        'locate the shabad.</li></ul>'],
      [ 'How do I connect STTM to a projector?',
        'Plug in your computer to the projector or TV. Once you do this, go to your computer\'s ' +
        'display settings and change it to "Extended Desktop" (NOT mirroring). After that, launch ' +
        'STTM and turn on "Presenter View" in the settings! ' +
        '<img src="/assets/images/help/desktop-extend-pc.png" />' +
        '<img src="/assets/images/help/desktop-extend-mac.png" />'],
      [ 'How do I change the background color?',
        'After launching STTM, click the icon for settings, and choose your theme.' +
        '<img src="/assets/images/help/desktop-theme.png" />'],
      [ 'Can you view the Gurbani in Larivaar?',
        'Yes! After launching STTM, click the icon for settings, and choose the Larivaar option.' +
        '<img src="/assets/images/help/desktop-larivaar.png" />'],
      [ 'How can I make the fonts on the screen smaller?',
        'After launching STTM, click the icon for settings, and scroll down for options to ' +
        'adjust the font size. <img src="/assets/images/help/desktop-font-size.png" />'],
      [ 'Where can I see my previous shabads?',
        'When using STTM in “Presenter View”, your history will appear in the bottom right ' +
        'quadrant. You can click any of the shabads in the list to bring them back up as your ' +
        'primary one. <img src="/assets/images/help/desktop-history.png" />'],
      [ 'How do I report a mistake?',
        'Visit <a href="https://sikhitothemax.org">SikhiToTheMax.org</a> and click "Feedback" ' +
        'at the bottom of the page.']
    ]
  };

  const sidebar = (<div id="sidebar"></div>);
  const main = (<main></main>);
  const sidebarList = (<ul></ul>);
  sidebar.appendChild(sidebarList);

  Object.keys(content).forEach((header) => {
    const section = (<section id={header}></section>);
    const sidesection = (<li></li>);
    sidesection.appendChild(<a href={'#' + header}>{header}</a>);
    const sidequestions = (<ul></ul>);
    section.appendChild(<h2>{header}</h2>);
    content[header].forEach(q => {
      let title = q[0].split(' ').join('-').toLowerCase().replace(/[^a-z.\-]/g, '').substr(0,50);
      const question = (<div class="question" id={title}></div>);
      sidequestions.appendChild(<li><a href={'#' + title}>{q[0]}</a></li>);
      question.appendChild(<h3>{q[0]}</h3>);
      question.appendChild(<div>{q[1]}</div>);
      section.appendChild(question);
    });
    sidesection.appendChild(sidequestions);
    sidebarList.appendChild(sidesection);
    main.appendChild(section);
  });

  help.appendChild(sidebar);
  help.appendChild(main);
  document.getElementById('content-root').appendChild(help);
});

