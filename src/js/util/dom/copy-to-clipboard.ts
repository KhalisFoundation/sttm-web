
export const copyToClipboard = (text: string): Promise<any> =>
  new Promise((resolve, reject) => {
    if ('clipboard' in navigator && 'writeText' in navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(resolve)
        .catch(reject);
      return;
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.textContent = text;
      document.body.appendChild(textarea);

      const selection = document.getSelection();
      const range = document.createRange();
      range.selectNode(textarea);
      selection.removeAllRanges();
      selection.addRange(range);

      const result = document.execCommand('copy');
      selection.removeAllRanges();
      document.body.removeChild(textarea);

      if (result) {
        resolve();
      } else {
        throw new Error('Failed to copy');
      }
    } catch (e) {
      reject(e);
    }
  });
