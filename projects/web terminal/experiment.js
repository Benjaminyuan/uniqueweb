var mydate = new Date();
// console.log(mydate.toLocaleDateString().replace('/','-'))
console.log(mydate.toLocaleDateString().substr(0,8));
console.log(mydate.toLocaleString().replace(/,/g,' '));
console.log(mydate.getDate().toString());
var cmdwords = ['cd','ls','html','tostring'];
console.log(cmdwords.pop());
console.log(cmdwords);