# simple-three.js
一个简单的three.js引擎，用于说明webgl原理，不要用于生产环境！不要用于生产环境！不要用于生产环境！

实现了我觉得特别常用的一些核心功能..    

## 文章列表
* 番外-1 [我的webgl不可能会不使用四元数旋转OuO](https://github.com/dwqdaiwenqi/simple-three.js/blob/master/webgl%26quaternions.MD)
* 番外-2 [我的webgl不可能创建一个投影仪OwO](https://github.com/dwqdaiwenqi/simple-three.js/blob/master/webgl%26projection_mapping.MD)
* 番外-3 [我的webgl不可能为世界创建阴影OvO](https://github.com/dwqdaiwenqi/simple-three.js/blob/master/webgl%26shadow_mapping.MD)
* 番外-4 [我的webgl不可能会使用各式各样的滤波器QvQ](https://github.com/dwqdaiwenqi/simple-three.js/blob/master/webgl%26shadow_mapping.MD)
* ......创作中
* 正传-1  ..  
* 正传-2  ..      

## 使用
```html
<script type="module">   
  import owo from './gl-owo.js' 

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

</script>
```

## License

MIT
