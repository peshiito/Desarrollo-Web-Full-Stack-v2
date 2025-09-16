//callbacks
function addToArray(data, array, callback) {
  if (!array) {
    callback(new Error("No existe el array"), null);
  } else {
    array.push(data);
    callback(null, array);
  }
}

let array = [1, 2, 3];
addToArray(6, array, function (err) {
  console.log(array);
});
