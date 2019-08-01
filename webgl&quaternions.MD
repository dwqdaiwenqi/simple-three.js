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
  // projection_matrix是投影矩阵
  // quaternions_matrix是旋转四元数矩阵
  // mov_matrix是平移矩阵
  gl_Position = projection_matrix*(quaternions_matrix*mov_matrix)*a_position;
}
```
cone模型对象的quaternions_matrix属性赋值为旋转四元数矩阵，render中往着色器中quaternions_matrix变量地址传递数据：
```js
//...
cone.quaternions_matrix = new Float32Array([
 ...  //4*4
])
//...
//render中
gl.uniformMatrix4fv(this.qua_location, false, this.quaternions_matrix))
 
```
在获得quaternions_matrix旋转四元数矩阵前，得先知道一个点是如何利用四元数进行旋转的。接下来说说为啥要用就四元数，以及我对四元数的认识

### 欧拉角
一般情况下描述一个物体的旋转会使用欧拉角，通过先给定旋转序列xyz，yxz，zxy...，接着再按照顺序分别旋转三个角，有时候你会发现，通过这种方式进行旋转，物体的朝向会显得很怪异，应为你可能旋转了一个正负90度，导致轴和轴重合了，失去了一个自由度，产生了**欧拉角万向死锁**。还有一种情况是，把物体的朝向从一个方向旋转到另一个方向，如果使用欧拉角，那可能会绕个大大的圈子进行旋转，相当的怪异。

### 四元数
用四元数来描述点的旋转的话，就不是单纯的旋转那三个方位角了。**四元数是由一个实数和三个虚数构成的超复数**，四元数可以这么来表示 **q=[s,xi+yj+zk]** ，看的出来和复数有点相似。我们这里需要用四元数来处理物体旋转，旋转四元数的一般形式为**q=[cos(th/2),sin(th/2)v]** ，th就是需要旋转的弧度，实数部分是cos(th/2)，虚数部分是sin(th/2)v,注意虚数部分是矢量，因为v是个向量，并且是个单位向量。你有没有注意到为啥th要除2，旋转的弧度需要除2。这里由介绍了这个形式的由来，感兴趣的看[这一篇understanding-quaternions](https://www.3dgep.com/understanding-quaternions/)很完整，里面由详细的推导过程。

简要概括来说，因为四元数和复数的相似性，那么可以设计一个旋转点的四元数，可以表示为`q=[cos(th),sin(th)v]`,设定一个特殊的与某个轴正交的旋转轴q，然后再选一个旋转点p，结果是，如果使用这个正交的旋转轴p，那`p'=qp` 就可以求出了，计算结果是个正确的纯四元数，直接就能用！

但是，如果旋转轴q不是特殊的正交轴，p'的结果就不是纯四元数，要使得结果是纯四元数的话必须右乘上共轭q`*`， **p'=qpq`*`** ，在推导过程中还会发现向量的旋转多出了一倍，所以最后得出旋转四元数一般形式为**q=[cos(th/2),sin(th/2)v]**

#### 旋转一个点
用伪代码来演示下如何用四元数来旋转一个点：
```js

// [sa,a][sb,b]=[sa*sb−a⋅b,sa*b+sb*a+a×b]
let multiply = ([sa, a], [sb, b]) => {
  return [
    sa * sb - a.dot(b),
    b.clone().multiplyScalar(sa)
    .add(a.clone().multiplyScalar(sb))
    .add(a.clone().cross(b))
  ]
}

// 需要被旋转的点
let a = Vector3(10,10,10)
// 旋转弧度为.5
let th = .5
// 旋转轴
let axis = Vector3(.1,.1,0).normalize()

requestAnimationFrame(function animate(){
 // 需要被旋转的点a，让他为纯四元数，实数部分是0，虚数为一个Vector3向量
 let p = [a, Vector3(x,y,z)]
 // 旋转轴 q ,实数为cos(th/2)，虚数为Vector3的单位向量缩放至sin(th/2)
 let q = [cos(th/2), axis.clone().multiplyScalar(sin(th/2))]
 // q的共轭四元数
 let q_ = [cos(th/2), axis.clone().multiplyScalar(-sin(th/2))]

 //计算
 let qp = multiply(q,p)
 let res = multiply(qp,q_)

 //忽略w部分，取xyz
 a.set(res[1].x,res[1].y,res[1].z )
})

```
注释已经很详细了，不多说了，注意这里的q_，因为旋转轴单位化过了，所以这里q的共轭和q的逆是一样的，对虚部取反就行了`-sin(th/2)`,还有就是`multiply`是计算四元数之间的乘法，[这一篇understanding-quaternions](https://www.3dgep.com/understanding-quaternions/)也有乘法的推导过程，`multiply`使用的是四元数乘积的一般式。

戳这个[demo](https://www.xy.com/fed/gl/webgl&quaternions.html)，cone模型围绕一个轴进行四元数旋转：

<img src="https://raw.githubusercontent.com/dwqdaiwenqi/simple-three/master/quaternions1.gif"/>

#### 旋转模型
现在已经能使用四元数控制一个点（模型的世界坐标）的旋转，那么也能把四元数旋转应用模型上，让模型朝着目标方向自旋转，表示为旋转四元数q的矩阵形式如下：
```js
{
  // 确定目标方向
  let dir = line.p1.clone().sub(line.p0).normalize()
  // 与up点乘得到弧度
  let the = Math.acos(Vector3(0,1,0).dot(dir))
  // 目标方向与up叉乘得到旋转轴
  let axis = dir.clone().cross(Vector3(0,1,0))
  // 得到旋转四元数
  let q = [c(the * .5), axis.clone().normalize().multiplyScalar(s(the * .5))]

  // 旋转四元数转换为矩阵形式
  let x = q[1].x, y = q[1].y, z = q[1].z, w = q[0]
  let x2 = x + x, y2 = y + y, z2 = z + z
  let xx = x * x2, xy = x * y2, xz = x * z2
  let yy = y * y2, yz = y * z2, zz = z * z2
  let wx = w * x2, wy = w * y2, wz = w * z2
  cone.quaternions_matrix = new Float32Array([
    1 - (yy + zz), xy - wz, xz + wy, 0,
    xy + wz, 1 - (xx + zz), yz - wx, 0,
    xz - wy, yz + wx, 1 - (xx + yy), 0,
    0, 0, 0, 1
  ])
}
```

戳这个[demo](https://www.xy.com/fed/gl/webgl&quaternions.html)，cone模型朝着目标方向进行自旋转：

<img src="https://raw.githubusercontent.com/dwqdaiwenqi/simple-three/master/quaternions2.jpg"/>





