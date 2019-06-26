var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true });

nightmare
  .goto("https://www.nerdmuch.com/books/156309/best-fantasy-books/")
  .wait('h2')
  .evaluate(function () {
    var nameNodes = document.querySelectorAll('h2');
    var list = [].slice.call(nameNodes); 
    return list.map(function(node){
      return node.innerText
    });
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
