export default function highlightAll(disableHighlighting) {
  if (!disableHighlighting) {
    // TODO jQuery. Kill it if possible
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }
}

