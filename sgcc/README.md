sgcc

一、语言特性概览

· 动态类型：变量无需声明类型，支持整数、字符串、数组、函数、对象（计划实现）等。
· 作用域：全局、函数级、块级（if/while/catch 等），变量沿作用域链向上查找。
· 面向对象（还未实现）：支持类、单继承、实例属性、方法。
· 函数式（不完全）：支持匿名函数（闭包）、高阶函数。
· 异常处理：try-catch-throw。
· 并发：无（单线程）。
· 内存管理：手动（基于堆分配，无垃圾回收）。

二、词法规则

· 注释：// 单行注释。
· 标识符：[a-zA-Z_][a-zA-Z0-9_]*。
· 关键字：
  ```
  if, elif, else, while, for, break, continue, return, def, class, var, local,
  try, catch, throw, print, null, true, false, and, or,
  not, in, is, eval, when, len, append, insert, remove, split,
  sin, cos, tan, sqrt, log, abs, ... (用户自定义函数名)
  ```
· 运算符：
  ```
  +, -, *, /, ^, %, =, +=, -=, *=, /=, ++, --, ==, !=, <, >, <=, >=,
  && (and), || (or), ! (not), ? :, ., [, ], (, ), ,, ;, :
  ```
· 字面量：
  · 浮点数：123, -456.78
  · 字符串："hello"
  · 数组：[1, 2, 3]
  · 字典（未实现）：{"name": "Alice", "age": 30}
  · 布尔：true, false
  · 空值（未实现）：null

三、语句语法

1. 表达式语句

```
expr ;
```

示例：a = 5;, print(1+2);

2. 变量声明

```
local identifier [ = expr ] , ... ;
```

局部变量，默认值 0。全局变量无需声明，直接赋值。

3. 赋值与复合赋值

```
left = expr ;
left += expr ;   // -=, *=, /= 
left ++ ;        // --
```

left 可以是变量、数组元素、属性、字典键。

4. 控制流

```
if ( expr ) statement [ elif ( expr ) statement ]... [ else statement ]
while ( expr ) statement
break ;
continue ;
return [ expr ] ;
```

5. for 循环（语法糖，未实现）

```
for ( [init] ; [cond] ; [inc] ) statement
```

等价于 while。

6. switch 语句（未实现）

```
switch ( expr ) {
    case const_expr : statement... break ;
    case const_expr : statement... break ;
    default : statement...
}
```

7. 函数定义

```
def identifier ( [ param [ : type ] , ... ] [ , ...rest ] ) [ : return_type ] { statement... }
```

· ...rest 收集剩余参数为数组（不支持）。

8. 类定义（未实现）

```
class identifier [ ( parent ) ] {
    var identifier [ = expr ] ; ...
    def identifier ( param , ... ) { statement... } ...
}
```

支持单继承。self 为第一个方法参数。

9. 异常处理

```
try { statement... } catch ( identifier ) { statement... }
throw expr ;
```

10. 打印

```
print expr ;
```

11. 方法调用

```
expr . identifier ( [ expr , ... ] ) ;
```

左侧作为隐含 self 参数。

四、表达式优先级（从低到高）

1. = , += , -= , *= , /= , ++ , -- （赋值类）
2. or
3. and
4. not
5. < , > , <= , >= , == , !=
6. + , -
7. * , /
8. ^ （右结合）
9. - 一元负号
10. [ ] , . （后缀索引/成员访问）
11. Unit：字面量、标识符、(expr)、函数调用、数组字面量、字典字面量、复数、? :、匿名函数 (params) => expr

五、数据类型与操作

类型 表示 操作
整数 整数值 算术、比较、位运算（无）
字符串 双引号括起 拼接（+）、索引（str[i]）、长度（len）、拆分（split）
数组 [1,2] 索引（1‑based，负索引）、长度、追加、插入、删除、遍历
字典 {"key":val} 键访问（d["key"]）、遍历（循环键）
复数 3+4i 或 (3,4) 算术运算（+,-,*,/）、实部虚部、共轭、模长
函数 函数入口地址 调用、闭包（捕获自由变量）
对象 实例基地址 属性访问、方法调用
空值 null 条件为假，算术异常

六、内置函数库

数学

sin(x), cos(x), tan(x), pow(x,y), sqrt(x), log(x), abs(x), real(z), imag(z), conj(z), arg(z), complex(r,i)

数组（已实现）/字典（未实现）

length(obj), append(arr, val), insert(arr, idx, val), remove(arr, idx), split(str, delim)

其他

print(expr), eval(str), when(cond, trueVal, falseVal)

七、作用域规则

· 全局：最外层，变量默认全局。
· 函数：每次调用新建作用域（level 增加），参数和 local 变量为局部。
· 块：if、while、catch、for 等大括号块创建新作用域（ENTER_SCOPE/EXIT_SCOPE）。
· 变量访问沿作用域链向上查找；赋值时从当前层向上找，找到则修改，否则在当前层新建。

八、完整示例

递归与数组

```
def fib(n) {
    if (n <= 2) { return 1 };
    return fib(n-1) + fib(n-2);
}
print(fib(10));  // 55

a = [1,2,3];
a.append(4);
for (i = 1; i <= len(a); i++) {
    print(a[i]);   // 1 2 3 4
}
```

异常与字典

```
data = {"name": "Alice"};
try {
    print(data["age"]);
} catch (e) {
    print("Missing age: " + e);
}
```

类与继承

```
class Animal {
    var name = "unknown";
    def speak(self) { print(self.name + " speaks"); }
}
class Dog(Animal) {
    def speak(self) { print(self.name + " barks"); }
}
d = Dog();
d.name = "Buddy";
d.speak();  // Buddy barks
```

匿名函数与闭包

```
def make_adder(x) {
    return (y) => x + y;
}
add5 = make_adder(5);
print(add5(3));  // 8
```

复数运算

```
c1 = 3+4i;
c2 = 1-2i;
c3 = c1 + c2;
print(c3);           // 4+2i
print(real(c3));     // 4
print(abs(c1));      // 5 (模长)
```

绘图示例

```
setColor(50);
setPenSize(3);
for (i = 1; i <= 100; i++) {
    drawLine(i*2, 0, i*2, 100);
}
```

九、注意事项

· 数组索引从 1 开始，负索引 -k 表示倒数第 k 个。
· 字符串不可变，+ 为拼接。
· and / or 支持短路求值。
· null 参与算术运算或属性访问会抛出异常（未实现）。
· 所有内置函数均通过 BUILTIN/BUILTIN_VAR 指令实现，可扩展。

以上为当前编译器实现的语言完整语法及特性总结，可作为用户手册或开发参考。
