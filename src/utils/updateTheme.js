/**
 * The link lies outside of the react context, so we can only reach
 * it with a plain old DOM select. That's not really a problem, though.
 */
export default function updateTheme(theme) {
  const newLink = `ext/bootswatch/${theme}.min.css`;
  document.getElementById('bootstrapLink').href = newLink;

  const tempStyle = document.getElementById('removeWhenThemeLoaded');
  if (tempStyle) {
    tempStyle.remove();
  }
}

