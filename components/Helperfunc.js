export default function Helperfunc(array) {
  let max = array[0].scale;
  let value = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].scale > max) {
      max = array.scale;
      value = i;
    }
  }
  return array[value].catagory;
}
