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

  console.log(max + "maxxx");
  console.log(min + "minnn");

  if (max == min) {
    for (const [key, value] of array) {
      console.log(key);
      if (key != max) {
        min = key;
        console.log("chnaged");
        break;
      }
    }
  }

  console.log(max + "maxxx");
  console.log(min + "minnn");
  let ranking = max + min;
  console.log(ranking);
  return [max, min, ranking];
}
