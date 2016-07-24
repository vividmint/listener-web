
var cube = function (x,y){
  if (typeof(x)=="number"){
    y('2','3');
  return ;
}else {
  throw new Error("传入的参数必须是数字")
  // return "出错了"
}
}
try {
  var result = cube(5,function(p,q){
    console.log(p,q);
  });
} catch (e) {
  console.log(e);
  return;
}
console.log(result);
if (result == "出错了"){
  console.log("error");
}else{
  console.log(`没出错${result}`);
}



var a = typeof("s");
console.log(a);


var get = function(url,cb){
  setTimeout(function(){
    cb({
      name:"john"
    });
  },1000);
}






var result = get("http://biadu.com/xxx/",funtion(data)jhk);
var xx = JSON.parse(result);
console.log(xx);


var countDown = function(time, tick, end) {
    var timer = setInterval(function() {
        time = time - 1;
        // console.log(time);
        if (time === 0) {
            end(0)
            clearInterval(timer);
            return;
        }
        tick(time)

    }, 1000)
}
var result = countDown(5, function(ticks) {
    console.log(ticks);
}, function(ends) {
    console.log(ends);
})


var a = "#";
for (var i = 0; i <= 6; i += 1){
      console.log(a);
    a += "#";

}

var number = 0;
for (var i = 0; i < 100; i += 1) {
    number = number + 1;
    if (number % 5 == 0 && ((number % 3) == 0)) {
        console.log("FizzBuzz");
    } else if (number % 3 == 0) {
        console.log("Fizz");
    } else if (number % 5 == 0 && !((number % 3) == 0)) {
        console.log("Buzz");
    } else {
        console.log(number);
    }
}

var result = Math.min(2,3,8,1);
console.log(result);
var x="dafd";
//length,toUpperCase(),toLowerCase()
var xx = x.toUpperCase();
console.log(xx);

var range = function(start, end) {
  var a = [];
for(var i=0;i<(end-start+1);i+=1){
  a[i]=start+i;

}
return a;
}
var result = range(1, 9);
console.log(result);


var sum = function(a) {
    var total = 0;
    for (var i = 0; i < a.length; i += 1) {
        total += a[i]

    }
  return total;
}
var result = sum([3, 4])
console.log(result);
console.log(result===55);


var arr = ['apple','orange','pear'];
console.log("found:", arr.indexOf("orange") != -1);

var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];
function getNewArr(){
    return oldArr.map(function(item){
        item.full_name = [item.first_name,item.last_name].join(" ");
        return item;
    });
}
console.log(getNewArr());

var arr = ["apple","orange","apple","orange","pear","orange"];
function getWordCnt(){
    return arr.reduce(function(prev,next){
        prev[next] = (prev[next] + 1) || 1;
        return prev;
    },{});
}
console.log(getWordCnt());

//
var a = [{first:"11",last:"22"},{first:"33",last:"44"},{first:"55",last:"66"}];
function newA(){
  return a.map(function(item){
item.combine = [item.first,item.last].join("#")
return item;
  });
}
console.log(newA());

var empty={};
console.log(empty.toString );



function person(name, age, sex) {
   this.name = name;
   this.age = age;
   this.sex = sex;
}


var rand = new person("Rand McNally", 33, "M");
console.log(typeof rand);
var ken = new person("Ken Jones", 39, "M");
console.log(rand);


function car(make, model, year, owner) {
   this.make = make;
   this.model = model;
   this.year = year;
   this.owner = owner;
}


var car1 = new car("Eagle", "Talon TSi", 1993, rand);
var car2 = new car("Nissan", "300ZX", 1992, ken);

console.log(car2.owner.name);
console.log(car1);
