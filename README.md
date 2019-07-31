# simple-three
一个极简的three.js库，用于说明webgl原理，不要用于生产环境

实现了Scene,WebGLRenderer,PerspectiveCamera, AmbientLight, Geometry, Group,MeshLambertMaterial、MeshPhongMaterial、Mesh 等常用核心的功能

## 目录
### 番外
* webgl与四元数
### 正片
* 创建一个场景

## 使用
```js
 import owo from '../src/owo-gl.js'

    var scene = new owo.Scene()
    var camera = new owo.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 )
    camera.position.z = 200

    var renderer = new owo.WebGLRenderer({antialias:true})
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
```


## LISCENSE
MIT
