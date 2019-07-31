# 番外
## webgl与四元数
最近一直琢磨着实（手）现（撕）一个精简three.js的库，在实现过程中总会想到利用ArrowHelper那东西进行可视化的调试，所以决定优先实现一个ArrowHelper，在几番尝试后发现，实现ArrowHelper关键的知识点是就是四元数，使用其他稀奇古怪方式实现都不靠谱。之前也有接触过四元数，但都是停留在会用的程度上，不知其中的原理，在实现ArrowHelper的过程中也研究了一番四元数，决定把过程记录下来。

ArrowHelper的构成有两部分组成，一部分是一条线段，另外一部分是一个Cone模型，线段的构成很简单，给出两个顶点把它绘制出来就行了，线段相关代码是：
```js
//通过绑定点向缓冲中存放数据
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
 ...this.vertices // [x1,y1,z1, x2,y2,z2]
]), gl.STATIC_DRAW)
//...
// 绘制参数使用gl.LINE_STRIP
gl.drawArrays(gl.LINE_STRIP, 0, 2)
```
这里已经可以表示出一个指向任意方向的线段了，但麻烦的是其中的Cone模型，模型需要往线段的方向进行自身旋转，四元数是处理这类问题的绝佳工具，最终解决方式是往模模型矩阵中乘上一个旋转四元数矩阵，Cone模型的顶点着色器中大概是这样的：
```glsl
//...
void main(){
  // quaternions_matrix是旋转四元数矩阵
  // mov_matrix是平移矩阵
  gl_Position = projection_matrix*(quaternions_matrix*mov_matrix)*a_position;
}
```
在获得旋转四元数矩阵前，得知道一个点是如何利用四元数进行旋转的。接下来简单的进行四元数的说明，并推导出旋转四元数的一般式q=[cos(th/2),sin(th/2)v]

四元数是由一个实数和三个虚数数组成的复数（超复数）

根据四元数与复数的相似性，那么有可能可以表示一个旋转三维的一个点q=[cos(th),sin(th)v]
现在假设有一个绕k轴旋转45&deg;的q，那q就变成了q=[&radic;2/2,&radic;2/2k]，然后选择一个p，p与k正交p=[0,2i],计算p'=pq, p'=[&radic;2/2,&radic;2/2k][0,2i]=[0,&radic;2i+&radic;2j]



<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

