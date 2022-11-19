export default async function ({ }, inject ){
  window.addEventListener("load", async () => {
    let newWorker,
    refreshing,
    reloadDialog = document.getElementById('reloadDialog'),
    reloadForm = document.getElementById('reloadForm');

    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.register("/sw.js");
      reg.onupdatefound = () => {
        newWorker = reg.installing;
        reloadForm
          .addEventListener('submit', () => {
            newWorker.postMessage({ action: 'skipWaiting' });
            if (refreshing) return;
            window.location.reload();
            refreshing = true;
          });
        newWorker.addEventListener('statechange', () => {
          switch (newWorker.state) {
            case 'installed':
              console.log('new SW')
              if (navigator.serviceWorker.controller) {
                reloadDialog.classList.remove('hidden')
              }
              break
          }
        });
      }
    }
    // Unknown Listener?,
    // navigator.serviceWorker
    //   .addEventListener('controllerchange', () => {
    //     if (refreshing) return;
    //     window.location.reload();
    //     refreshing = true;
    //   });
  })
}