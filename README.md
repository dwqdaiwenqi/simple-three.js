# simple-three.js
一个简单的three.js引擎，用于说明webgl原理，不要用于生产环境！不要用于生产环境！不要用于生产环境！

实现了核心功能

## 文章列表
* 番外-1 [webgl与四元数](https://github.com/dwqdaiwenqi/simple-three.js/blob/master/webgl%26quaternions.MD)
* 正传-1  ..

## 使用
```js
var scene = new owo.Scene()
var camera = new owo.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

var renderer = new owo.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )


```
