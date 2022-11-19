window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-93WEPK588T');

gtag('get', 'G-93WEPK588T', 'client_id', (clientID) => {
  window.localStorage['analytics_id'] = clientID
});