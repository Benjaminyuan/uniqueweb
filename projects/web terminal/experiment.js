var mydate = new Date();
// console.log(mydate.toLocaleDateString().replace('/','-'))
console.log(mydate.toLocaleDateString().substr(0,8));
console.log(mydate.toLocaleString().replace(/\/|,/g,' '));
console.log(mydate.getDate().toString());