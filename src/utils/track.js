export default function track(category, action, label) {
  if (window.ga) {
    window.ga('send', 'event', category, action, label);
  }
}