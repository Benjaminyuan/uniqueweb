// var mydate = new Date();
// // console.log(mydate.toLocaleDateString().replace('/','-'))
// console.log(mydate.toLocaleDateString().substr(0,8));
// console.log(mydate.toLocaleString().replace(/,/g,' '));
// console.log(mydate.getDate().toString());
// var cmdwords = ['cd','ls','html','tostring'];
// console.log(cmdwords.pop());
// console.log(cmdwords);
var reg =/\s*(cd)\s*((\.\.|\.|[a-zA-Z0-9]|\/)+)?/;
console.log(reg);
var text1 = 'cd';
var text2 = 'cd .././ ';
var text3 = 'cd adf';
var text4 = 'file-ln';
console.log(text1.match(reg));
console.log(text2.match(reg));
console.log(text3.match(reg));
console.log(text4 === 'file'|'file-ln');
console.log('~'.split('/'));