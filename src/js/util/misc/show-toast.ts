/**
 * Shows a toast
 *
 * @param {string} text to display in notification toast
 * @param {number} delay (in ms) to wait before hiding toast. Pass Infinity if you want to hide it on user action.
 * @returns {Promise} which resolves after hiding the toast.
 */
export const showToast = (text: string, delay: number = 2500, className: string = ''): Promise<any> =>
  new Promise(resolve => {
    const $notification = document.getElementById('toast-notification');
    $notification.innerHTML = `${text} <button role="button" aria-label="close" class="toast-notification-close-button">&times;</button>`.trim();

    if (className !== '') {
      $notification.classList.add(className);
    }

    $notification.classList.remove('hidden');

    const hideToast = () => {
      $notification.classList.add('hidden');

      if (className !== '') {
        $notification.classList.remove(className);
      }
      resolve();
    };

    document.querySelector(
      '.toast-notification-close-button'
    ).onclick = hideToast;

    if (delay !== Infinity) {
      setTimeout(hideToast, delay);
    }
  });
