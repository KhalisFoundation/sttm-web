const replace = require('replace-in-file');

if (process.env.NODE_ENV === 'production') {
  try {
    const changedFiles = replace.sync({

      //Single file
      files: 'assets/js/vendor/shabados.min.js',

      //Replacement to make (string or regex)
      from: /(API_URL=".*?")/g,
      to: 'API_URL="https://api.shabados.org/"',
  });
    console.log('Modified files:', changedFiles.join(', '));
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}
