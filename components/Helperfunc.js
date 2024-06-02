export default function Helperfunc(array) {
  let max = "";
  let min = "";
  let first = true;
  let maxval = 0;
  let minval = 0;
  for (const [key, value] of array) {
    if (first) {
      max = key;
      min = key;
      maxval = value;
      minval = value;
      first = false;
    } else if (value > maxval) {
      maxval = value;
      max = key;
    } else if (value < minval) {
      minval = value;
      min = key;
    }
  }
  return [max, min];
}
