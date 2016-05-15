export default function clickLink(href, download) {
  let a = document.createElement('a');
  a.href = href;
  a.download = download;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
