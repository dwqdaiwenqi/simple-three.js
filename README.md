# simple-three.js
一个简单的three.js引擎，用于说明webgl原理，不要用于生产环境！不要用于生产环境！不要用于生产环境！

实现了核心功能

## 文章列表
* 番外-1 [webgl与四元数](https://github.com/dwqdaiwenqi/simple-three.js/blob/master/webgl%26quaternions.MD)
* ...创作中...
* 正传-1  ..
* 正传-2  ..

## 使用
```js

let scene = new owo.Scene()
let camera = new owo.PerspectiveCamera( 45, innerWidth / innerHeight, 0.1, 1000)

let renderer = new owo.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

let cube = new owo.Mesh(
  new owo.BoxGeometry(20),
  new owo.MeshBasicMaterial({color:[0,0,1,1]})
)
scene.add(cube)
    
requestAnimationFrame(function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  cube.rotation.x += .1
})

```

## License

MIT
