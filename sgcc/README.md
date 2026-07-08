<h1 align="center">
  <img alt="logo" src="/src/sgc_logo.svg" />
  sgcc II
</h1>

<p align="center">
基于Scratch 3.0实现的编程语言
</p>


## 介绍

不同于[GoboScript](https://github.com/aspizu/goboscript,)和[Fuse](https://github.com/scratch-fuse/core,)，sgcc是在Scratch内部完成编译和运行，而它们则是在外部依赖其他语言。

sgcc是面向数学的脚本语言，内嵌于SGC v4.3+，与SGC绘图函数结合可以制作简易的演示动画与游戏。sgcc极大地扩展了原生Scratch对于列表（尤其是嵌套）和字符串的处理能力，语法清晰且精简；源代码命名规范，易于维护。

### 一、特性

 -  动态类型：变量无需声明类型，支持浮点数、字符串、数组、函数、对象（未实现）等。
 -  作用域：全局、函数级、块级，变量沿作用域链向上查找。
 -  异常处理：`try-catch-throw`。
 -  并发：无（单线程）。
 -  内存管理：手动（无垃圾回收）。

### 二、词法规则

 -  注释：`// 单行注释`和`/*块状注释*/`。块状注释不支持嵌套。
 -  标识符：`[a-zA-Z_][a-zA-Z0-9_]*`。
 -  关键字：
  ```
  if, elif, else, while, for, break, continue, return, define, class, var, local,
  try, catch, throw, print, null, true, false, and, or,
  not, in, is, eval, when, length, append, insert, remove, split,
  sin, cos, tan, sqrt, log, abs, ... (用户自定义函数名)
  ```
 -  运算符：
  ```
  +, -, *, /, ^, %, =, +=, -=, *=, /=, ++, --, ==, !=, <, >, <=, >=,
  && (and), || (or), ! (not), ? :
  ```
 -  字面量：
   -  浮点数：`123`, `-456.78`, `0.0`
   -  字符串：`"hello"`
   -  数组：`[1, 2, 3]`
   -  布尔：`true`, `false`

### 三、语句语法

1. 表达式语句

```
expr ;
```

示例：`a = 5;`, `print(1+2);`

2. 变量声明

```
identifier = expr;
local identifier [ = expr ] , ... ;
```

局部变量，默认值 0。全局变量无需声明，直接赋值。

3. 赋值与复合赋值

```
left = expr ;
left += expr ;   // -=, *=, /= 
left ++ ;        // --
```

left 可以是变量、数组元素。

4. 控制流

```
if expr statement [ elif expr statement ]... [ else statement ]
while expr statement
break ;
continue ;
return [ expr ] ;
```

if和while条件中的圆括号不是必须，不建议添加。

5. 函数定义

```
define identifier ( [ param , ... ]) { statement... }
```

6. 异常处理

```
try { statement... } catch ( identifier ) { statement... }
throw expr ;
```

7. 打印

```
print(expr);
```

8. 方法调用

```
expr . identifier ( [ expr , ... ] ) ;
```

左侧作为隐含 self 参数。

### 四、表达式优先级（从低到高）

1. `= , += , -= , *= , /= , ++ , --`
2. `or`
3. `and`
4. `not`
5. `< , > , <= , >= , == , !=`
6. `+ , -`
7. `* , /`
8. `^`
9. `-` 一元负号
10. `[ ] , .` （后缀索引/成员访问）
11. 字面量、标识符、(expr)、函数调用、数组字面量、? :

### 五、内置函数库

数学
```
sin(x), cos(x), tan(x), 
asin(x), acos(x), atan(x),
sqrt(x), log(x), ln(x), abs(x), 
round(x[,digit]), floor(x), ceil(x),
exp(x), alog(x)
```

数组（已实现）
```
length(arr), 
arr.append(arr, val), arr.insert(idx, val), arr.remove(idx), 
str.split(delim),
arr.find(item), arr.count(item), arr.include(item)
```

字符串
```
length(str),
string(num), number(str),
substr(str, start, end),
str.find(sub), str.count(sub), str.include(sub)
```

注意: 可以使用索引访问字符串指定位置的字符。例如`"114514good"[-1]`将会返回"d"。
substr后面两个参数是索引，最后一个参数不是长度。

其他
```
type(expr), eval(str), 
when(cond, trueVal, falseVal)
```

`type(obj)`函数将返回对象的类型，为下面三者之一：
```
"string", "number", "array"
```

可变参数
```
min(val1[, val2[, val3[, ... ]]]), 
max(val1[, val2[, val3[, ... ]]]),
concat(val1[, val2[, val3[, ... ]]])
```

`concat`可用于拼接数组。如果所有的参数都不是数组，那么把它们拼接成字符串，否则才拼接成数组。

### 六、作用域规则

 -  全局：最外层，变量默认全局。
 -  函数：每次调用新建作用域，参数和 local 变量为局部。
 -  块：if、while、catch、for 等大括号块创建新作用域。
 -  变量访问沿作用域链向上查找；赋值时从当前层向上找，找到则修改，否则在当前层新建。

### 七、完整示例

递归与数组

```
define fib(n) {
    if (n <= 2) { return 1; }
    return fib(n-1) + fib(n-2);
}
print(fib(10));  // 55

a = [1,2,3];
a.append(4);
i = 1; 
while i <= length(a) {
    print(a[i]);   // 1 2 3 4
    i++;
}
```

异常捕获

```
data = ["good", "sgc"];
try {
    print(data[3]);
} catch (e) {
    print("Err: " + e);
}
```

### 八、注意事项

 -  数组索引从 1 开始，负索引 -k 表示倒数第 k 个。
 -  and / or 支持短路求值。
 -  所有内置函数均可扩展。
 -  不建议使用!代替not，这可能会与阶乘函数混淆。只有`!(expr)`会被识别为`not(expr)`，`!expr`将会抛出错误。

***

## 二次开发

### 概览

当运行sgcc脚本时，脚本内容`Script`传入函数`Parser`。之后运行`parse_program`, `init`, `execute`。

打印输出的内容存储在`output`列表中。

一个完整的例子是: 

```
hat:GreenFlagClicked
Parser("print(\"hello world!\");")
parse_program()
init()
execute()
```

点击绿旗应当观察到列表中有如下内容:
```
hello world!
```

函数`push`和`pop`用于压入和弹出总栈。`.last`变量存储总栈的项目数减一。

`push(value, type)`用于向总栈中压入类型为`type`的`value`。

### 函数

sgcc的函数位于`BUILTIN`, `BUILTIN_VAR`中。可变参数的函数均位于后者。

调用`BUILTIN_VAR`时，全局变量`count`将会记录收集的参数个数。每个函数均有自己的`funcId`，可以在同名列表中查看，通过这id调用指定的函数。例如`sin`的id为1，那么下列编译后的代码：
```
1 0.5 // push 0.5
31 1  // BUILTIN sin 0.5
8 0   // print last item of stack
```
将打印`sin(0.5)`的值。
表示指令的地址可能会变化，这里仅供参考。
