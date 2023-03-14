// 问题：
// 一个细胞，一小时分裂一次（一个变两个🥚），生命周期是三小时，求n小时后有多少细胞？

/**********
 * 分析：
 * 由题意可知，细胞生命周期共四个阶段，不如假设细胞消亡： 白色 -> 绿色 -> 黄色 -> 黑色
 * 白色：新细胞，分裂一次后产生一个白色细胞，自己则变成绿色
 * 绿色细胞再次分裂出一个白色细胞，自己则变成黄色
 * 黄色细胞再次分裂出一个白色细胞，自己则变成黑色，黑色即生命周期结束
 * 存活的细胞 = 白色 + 绿色 + 黄色，就是所求。
*************/

/*********
 * 解法一：动态规划（拆分子问题）
 * 这个解法存在问题，没有“备份”，存在重复计算，测试发现 n>30 计算就非常非常困难了。
 * ***********/
function total(n) {
  var yellow = function (n) {
    // 设置出口， 边界条件
    if (n === 0 || n === 1) return 0
    return green(n - 1)
  }

  var green = function (n) {
    // 设置出口， 边界条件
    if (n === 0) return 0
    return white(n - 1)
  }

  var white = function (n) {
    // 设置出口， 边界条件
    if (n === 0) return 1
    return white(n - 1) + green(n - 1) + yellow(n - 1)
  }
  return yellow(n) + green(n) + white(n)
}

console.log(total(0));
console.log(total(1));
console.log(total(2));
console.log(total(3));
console.log(total(4));
console.log(total(5));

/******
 *  解法二： 归纳法
 *  分析：
 *  每次细胞分裂产生的新细胞（最新鲜的🥚），等于分裂前（上一次）的细胞总数（重点）
 *  未开始计时之前，都是1个细胞， f(n) = 1, n <= 0
 *  未开始有细胞死亡时，f(n) = 2 * n, n < 3
 *  开始有细胞死亡时，f(n) = 2 * f(n - 1) - 死亡细胞数 ，n >= 3
 *  已知细胞生命周期是三小时，所以：
 *  开始有细胞死亡时的正确计算公式是: f(n) = 2 * f(n-1) - f(n-4)
 * *******/

function total02(n) {
  if (n <= 0) {
    return 1;
  }
  if (n < 3) {
    return 2 * n;
  }
  if (n >= 3) {
    return 2 * total02(n - 1) - total02(n - 4);
  }
}

console.log(total02(50))