import myclass from './index.js';


test('add two numbers', () => {
  var my=new myclass();
  expect(my.sum(1, 2)).toBe(3);
}
);