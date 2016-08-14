var makeArray = function(arr) {
  var newArray = [];
  arr.forEach(function(casino) {
    var string = casino.name + ' - ' + casino.state;
    newArray.push(string);
  });
  return newArray;
} 

module.exports = makeArray;