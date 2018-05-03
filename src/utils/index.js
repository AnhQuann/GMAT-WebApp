export function elipsis(text, maxLength=100) {
  if(text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}