/**
 * Sets the entire text as selected in an input field
 */
export default function selectText(event) {
  event.target.setSelectionRange(0, event.target.value.length);
}

