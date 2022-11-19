export default function ({ $ga }) {
  if (!process.server) {
    const { href } = window.location,
    { title } = document
    $ga('event', 'page_view', {
      page_title: title,
      page_location: href,
      send_to: 'G-93WEPK588T'
    })
  }
}