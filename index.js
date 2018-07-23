

// // const c=require('jquery');
// class myclass {
//   sum(a, b) {
//     return a + b;
//   }
// }
    
// export default myclass;

// -------------arrows
const evens=[1,3,5];
let odds = evens.map(v => v + 1);
let nums = evens.map((v, i) => v + i);
let pairs = evens.map(v => ({even: v, odd: v + 1}));

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
let bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}