# **symScratch**

比较基础的计算机代数系统，为你的原版Scratch 3.0提供符号计算能力。基于二叉树和模式匹配。

支持数组字面量。支持嵌套数组。

**欢迎反馈bug**。三角函数、collect可能有bug。

***

**例子**

1+2*3
```
    add
   /   \
  1    mul
      /   \
     2     3
```

对每个输入尝试一次normalize。

**算法**

 - 一元GCD：欧几里得+伪除

 - 多元GCD：Kronecker替换

 - 字典序：a ~ z，实际比较迷惑（

 - 高精度整数：压位

***

mathIO: STeX

若要省略乘号，请使用空格代替。
```
[y] 5*x
[y] 5 x
[x] 5x
[y] (x+y)*(x-y)
[y] (x+y)(x-y)
```

```
1+1
> 2

2^20
> 1048576

sqrt(3/4)
>  +---
  \| 3
  -----
    2

subst(f(x), x, y+1)
> f(y+1)

approx(1/3)
> 0.333333333333333

simplify(seq(1/x^2, x, range(0, 3)))
>                 1     1
  [ Infinity, 1, --- , --- ]
                  4     9
```

```
simplify(x + 2 x)
> 3*x

simplify((2 + 2 x) / (1 + x))
> 2

simplify(sqrt(4 - 2 sqrt(3)))
>       +---
  -1 + \| 3
```

因式分解（目前只有一元）

```
factor(x^2-1)
> (x+1) * (x-1)

factor(x^3+1)
>           2
  (x-1) * (x  + x + 1)
```

导数 `diff(f(var)[, var])`

```
diff(sin(t), t)
> cos(t)

diff(x^x, x)
>   x             x
  x   + ln(x) * x
```

求解

```
solve(x^2-1, x)
> [-1, 1]
```

还没实现的：
```
series(sin(x),x,0,5)
>       3     5
      x     x             6
  x - --- + --- + Order(x  )
       6    120

```
**鲁棒**
```
2+
> Error: Missing number(s) @ applyOperations

-
> Error: Missing number @ neg

))
> Error: Unexpected )
```
**按钮**

`<theme>` 按钮切换主题。

`<input>` 添加表达式。

`<num(>` 数值相关菜单。

`<algebra(>` 代数相关菜单。

**借物表**

 - Adobe: Source Code Pro fonts

 - STIX TWO MATH fonts

 - Rex scratch studio: SFE++ font injector

**快照**

![](https://asset.gitblock.cn/Media?name=F862EE9E4B0BCD692D16B6DD5D0545FF.png)

![](https://asset.gitblock.cn/Media?name=39DD8351E61015715E911DF0613A0D65.png)
