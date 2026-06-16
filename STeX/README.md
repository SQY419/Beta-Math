<div align="center">

<p>
  <img alt="logo" src="/src/stex_logo.svg" />
</p>

基于Scratch实现的不完全LaTeX渲染器

</div>

## 简介

感谢各大Scratch社区用户`6`。

STeX用于：

 - STeX 0.2.2 beta
 - FastSTeX 0.2.3
 - SGC v4.5+
 
FastSTeX具有更快的渲染速度。

***

STeX 0.2.4能将LaTeX转义为STeX代码，反之亦然。

***

## 特性

### 括号匹配

STeX具有优雅的括号匹配功能。忘记烦人的`left`，`right`吧，你只需要输入需要的括号。
例如想要表示“三分之一的平方”，LaTeX需要输入：
```
\left( \frac{1}{3} \right) ^ {2}
```
而STeX只需要：
```
( \frac{1}{3} ) ^ {2}
```

### 稳定嵌套

STeX的嵌套功能具有稳定性。同期KaTeX在嵌套1k个sum符号时会显示错乱（现已修复），而STeX则不会。

### 符合规范

支持大量LaTeX标准符号。

### 简易连字符

打化学方程式的长等号只需要`==`，右推出符号不再需要`\Rightarrow`，而是`=>`。

***

## 问题

由于Scratch数据结构限制，不支持渲染数组和矩阵。

***

## 二次开发

STeX内部表示和LaTeX不同。其使用`identifier`和一个中括号表示关键字。`identifier`通常是单个大写字母。例如：平方根函数表示为

```
S[
  expr...
S]
```
也可以嵌套为
```
S[
  expr...
  +
  S[
    expr...
  S]
S]
```

绝对值是`A[ A]`，括号是`([ )]`。
