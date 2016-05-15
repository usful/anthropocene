export default function fontWidth(ems) {
  return (parseInt(window.getComputedStyle(document.body).fontSize) || 10) * ems;
}