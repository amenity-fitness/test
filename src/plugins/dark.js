export default async function ({}){
  const meta = document.querySelector('meta[name="theme-color"]'),
  { localStorage } = window
  if (localStorage['theme'] == 'dark' || localStorage['theme'] !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // var root = document.getElementsByTagName( 'html' )[0]
    // root.classList.add('dark')
    const manifest = document.createElement('link')
    manifest.href = "/manifest.json"
    manifest.rel = "manifest"
    document.head.appendChild(manifest)
    meta.setAttribute('content', "#1e293b")
  } else if (localStorage['theme'] == 'light' || !window.matchMedia('(prefers-color-scheme: dark)').matches) {
    const link = document.createElement('link')
    link.href = "/manifest-light.json"
    link.rel = "manifest"
    document.head.appendChild(link)
    meta.setAttribute('content', '#166534')
  }
}