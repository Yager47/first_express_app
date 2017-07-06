var elements = [
  "Some element",
  "Another element",
  "Last element"
];

exports.getElement = function () {
  var index = Math.floor(Math.random() * elements.length);
  return elements[index];
};