export default function (req, res, next) {
  // Signal that you would like color scheme
  res.setHeader("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  res.setHeader("Vary", "Sec-CH-Prefers-Color-Scheme");
  res.setHeader("Critical-CH", "Sec-CH-Prefers-Color-Scheme");
  next()
}