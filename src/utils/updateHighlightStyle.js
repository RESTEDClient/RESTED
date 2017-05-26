/**
 * The link lies outside of the react context, so we can only reach
 * it with a plain old DOM select. That's not really a problem, though.
 */
export default function updateHighlightStyle(theme) {
  const newLink = `ext/highlight.js/${theme}.css`;
  document.getElementById('highlightJSLink').href = newLink;
}

