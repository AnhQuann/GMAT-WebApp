export function elipsis(text, maxLength=100) {
  if(text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

export function tryGet(obj, key, defaultValue) {
  if(obj[key]) return obj[key];
  return defaultValue;
}

// export function elipsis(text, n) {

// }