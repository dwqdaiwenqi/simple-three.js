
{
  var createFragmentShader = (gl, source) => {
    var shader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
      return shader
    }
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
  }
  var createVertexShader = (gl, source) => {
    var shader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
      return shader
    }
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
  }
  
  var createProgram = (gl, vertexShader, fragmentShader) => {
    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    var success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
      return program
    }
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
  }
  
  var createVideoTexture = (source='',width=300,height=200)=>{
		return new Promise(resolve=>{
			var $video = document.createElement('video')

			$video.addEventListener('loadeddata',()=>{


				var tex = gl.createTexture()
        
        gl.bindTexture(gl.TEXTURE_2D, tex)

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, $video)
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        
        resolve({$video,texture:tex})
        
        // gl.bindTexture(gl.TEXTURE_2D, null)
			})
			$video.crossOrigin = '*'
			$video.width = width
			$video.height = height
			$video.src = source
			$video.loop = true

		})
	}
  var createTexture =(source)=>{
  
    var img = document.createElement('img')
    
    return new Promise(resolve=>{
      img.onload = ()=>{
        var tex = gl.createTexture()
        
        gl.bindTexture(gl.TEXTURE_2D, tex)
        
        //gl.generateMipmap(gl.TEXTURE_2D)

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        
        resolve(tex)
        
        gl.bindTexture(gl.TEXTURE_2D, null)
      }
    
      img.src = source
    })
   
  }
  var Cube = ()=>{
		var vertices = [
			// x,    y,    z
			// front face (z: +1)
			 1.0,  1.0,  1.0, // top right
			-1.0,  1.0,  1.0, // top left
			-1.0, -1.0,  1.0, // bottom left
			 1.0, -1.0,  1.0, // bottom right
			// right face (x: +1)
			 1.0,  1.0, -1.0, // top right
			 1.0,  1.0,  1.0, // top left
			 1.0, -1.0,  1.0, // bottom left
			 1.0, -1.0, -1.0, // bottom right
			// top face (y: +1)
			 1.0,  1.0, -1.0, // top right
			-1.0,  1.0, -1.0, // top left
			-1.0,  1.0,  1.0, // bottom left
			 1.0,  1.0,  1.0, // bottom right
			// left face (x: -1)
			-1.0,  1.0,  1.0, // top right
			-1.0,  1.0, -1.0, // top left
			-1.0, -1.0, -1.0, // bottom left
			-1.0, -1.0,  1.0, // bottom right
			// bottom face (y: -1)
			 1.0, -1.0,  1.0, // top right
			-1.0, -1.0,  1.0, // top left
			-1.0, -1.0, -1.0, // bottom left
			 1.0, -1.0, -1.0, // bottom right
			// back face (z: -1)
			-1.0,  1.0, -1.0, // top right
			 1.0,  1.0, -1.0, // top left
			 1.0, -1.0, -1.0, // bottom left
			-1.0, -1.0, -1.0  // bottom right
		]
	
		var normals = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
	
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
	
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
	
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
	
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
	
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0
		];
	
		var textures = [
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
	
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
	
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
	
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
	
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
	
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
		]
	
		var indices = [
			 0,  1,  2,   0,  2,  3,
			 4,  5,  6,   4,  6,  7,
			 8,  9, 10,   8, 10, 11,
			12, 13, 14,  12, 14, 15,
			16, 17, 18,  16, 18, 19,
			20, 21, 22,  20, 22, 23
		]
	
		return {
			vertices: vertices,
			textures: textures,
			normals: normals,
			indices: indices
		}
	}
  
  var glsl = glsl => glsl
  
}

// //////////////////////////////////////////////////////////////////////////




var gl = document.querySelector('canvas').getContext('webgl')
gl.canvas.width = innerWidth
gl.canvas.height = innerHeight

var program = createProgram(gl,
  createVertexShader(gl, glsl`
		attribute vec4 a_position;
		attribute vec3 a_normal;

    uniform mat4 u_projector_pro_mat;
    uniform mat4 u_projector_view_mat;

    uniform mat4 u_world_mat;

    uniform mat4 u_projection_mat;
    uniform mat4 u_view_mat;

    varying vec4 v_projector_texcoord;
		varying vec3 v_normal;
    void main(){
      // -1 --- 1
			v_projector_texcoord = u_projector_pro_mat*u_projector_view_mat*u_world_mat*a_position;
			v_normal = mat3(u_world_mat) * a_normal;
      gl_Position = u_projection_mat*u_view_mat*u_world_mat*a_position;
    }
  `),

  createFragmentShader(gl, glsl`
    precision mediump float;
 
    uniform vec4 u_co;
		uniform sampler2D u_projector_texture;
		uniform vec3 u_light_position;
		varying vec4 v_projector_texcoord;
		varying vec3 v_normal;
    void main(){

			vec3 normal = normalize(v_normal);

      float light = dot(normal, normalize(u_light_position));
      
      vec3 projector_texcoord = (v_projector_texcoord.xyz/v_projector_texcoord.w)*.5+.5;

      bool in_range = 
        projector_texcoord.x >= 0. &&
        projector_texcoord.x <= 1. &&
        projector_texcoord.y >= 0. &&
        projector_texcoord.y <= 1.;

      if(in_range ){
				gl_FragColor = vec4(texture2D(u_projector_texture,projector_texcoord.xy).rgb*light,1);
      }else{
				gl_FragColor = vec4(u_co.rgb*light,1);
      }

    }
  `)
)

var program_visual = createProgram(gl,
  createVertexShader(gl, glsl`
		attribute vec4 a_position;
    uniform mat4 u_projection_mat;
    uniform mat4 u_view_mat;
    uniform mat4 u_world_mat;
    void main(){
      gl_Position = u_projection_mat*u_view_mat*u_world_mat*a_position;
    }
  `),
  createFragmentShader(gl, glsl`
    precision mediump float;
    uniform vec4 u_co;
    void main(){
			gl_FragColor = u_co;
    }
  `)
)


{

  var [
    $camX,$camY,$camZ,
    $projectorX,$projectorY,$projectorZ,
    $lightX,$lightY,$lightZ
  ] = [...document.querySelectorAll('input')]


  var pro_location = gl.getUniformLocation(program,'u_projection_mat')
  var view_location = gl.getUniformLocation(program,'u_view_mat')
  var light_location = gl.getUniformLocation(program,'u_light_position')
  var lookAt = [[$camX.value*1,$camY.value*1,$camZ.value*1],[0,0,-20],[0,1,0]]
  var perspective = [45/180*Math.PI,gl.canvas.width/gl.canvas.height,.1,8000]
    

  $camX.oninput = function(){
    lookAt[0][0] = this.value*1 
    console.log(lookAt[0])
  }
  $camY.oninput = function(){
    lookAt[0][1] = this.value*1 
    console.log(lookAt[0])
  }
  $camZ.oninput = function(){
    lookAt[0][2] = this.value*1 
  }

  $projectorX.oninput = function(){
    Projector.lookAt[0][0] = this.value*1 
    console.log(Projector.lookAt[0])
  }
  $projectorY.oninput = function(){
    Projector.lookAt[0][1] = this.value*1 
    console.log(Projector.lookAt[0])
  }
  $projectorZ.oninput = function(){
    Projector.lookAt[0][2] = this.value*1 
    console.log(Projector.lookAt[0])
  }
}


// // 理解为往这个空间变换，再z方向缩放1000
// const mat = m4.scale(textureWorldMatrix, 1, 1, 1);

// // Set the uniforms we just computed
// webglUtils.setUniforms(colorProgramInfo, {
//   u_color: [0, 0, 0, 1],
//   u_view: viewMatrix,
//   u_projection: projectionMatrix,
//   u_world: mat,
// });

// pro*view* (light_pro*light_view)*a_position



{
  var Board = {
    position_location:gl.getAttribLocation(program,'a_position'),
    co_location:gl.getUniformLocation(program,'u_co'),
    world_location:gl.getUniformLocation(program,'u_world_mat'),
    normal_location:gl.getAttribLocation(program,'a_normal'),
    width:50,
    height:50,
    co:[1,0,1,1],
    position:[0,-5,-30],
    rotation:[0/180*Math.PI,0,0],
    position_buffer:null
  }

  Board.position_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Board.position_buffer)

  let {width,height} =Board
  let [tx,ty] = [width*.5,height*.5]
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
    0-tx,0-ty,0,  
    width-tx,0-ty,0, 
    width-tx,height-ty,0,
    -tx,height-ty,0
  ]),gl.STATIC_DRAW)


  Board.normal_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Board.normal_buffer)
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
  ]),gl.STATIC_DRAW)
}

{
  var Board_b = {
    position_location:gl.getAttribLocation(program,'a_position'),
    co_location:gl.getUniformLocation(program,'u_co'),
    world_location:gl.getUniformLocation(program,'u_world_mat'),
    normal_location:gl.getAttribLocation(program,'a_normal'),
    width:35,
    height:35,
    co:[0,.5,.2,1],
    position:[20,-1,-15],
    rotation:[10/180*Math.PI,0,0],
    position_buffer:null
  }

  Board_b.position_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Board_b.position_buffer)

  let {width,height} =Board_b
  let [tx,ty] = [width*.5,height*.5]
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
    0-tx,0-ty,0, 
    width-tx,0-ty,0, 
    width-tx,height-ty,0,
    -tx,height-ty,0
  ]),gl.STATIC_DRAW)

  Board_b.normal_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Board_b.normal_buffer)
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
  ]),gl.STATIC_DRAW)
}

{
	
	var Cube1 = Cube()
	Cube1 = {
		...Cube1,
		position_location:gl.getAttribLocation(program,'a_position'),
    co_location:gl.getUniformLocation(program,'u_co'),
		world_location:gl.getUniformLocation(program,'u_world_mat'),
		normal_location:gl.getAttribLocation(program,'a_normal'),
		co:[.3,.3,.3,1],
		position:[0,0,-15],
		rotation:[0/180*Math.PI,0,0],
		scale:[10,10,10]
	}
	Cube1.position_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Cube1.position_buffer)
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([...Cube1.vertices]),gl.STATIC_DRAW)
	
	Cube1.normal_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Cube1.normal_buffer)
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([...Cube1.normals]),gl.STATIC_DRAW)
}

{
	
	var Cube2 = Cube()
	Cube2 = {
		...Cube2,
		position_location:gl.getAttribLocation(program,'a_position'),
    co_location:gl.getUniformLocation(program,'u_co'),
		world_location:gl.getUniformLocation(program,'u_world_mat'),
		normal_location:gl.getAttribLocation(program,'a_normal'),
		co:[.3,.3,.3,1],
		position:[-30,0,-15],
		rotation:[15/180*Math.PI,0,0],
		scale:[6,6,6]
	}
	Cube2.position_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Cube2.position_buffer)
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([...Cube2.vertices]),gl.STATIC_DRAW)
	
	Cube2.normal_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,Cube2.normal_buffer)
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([...Cube2.normals]),gl.STATIC_DRAW)
}


{

  var Projector = {
		source:'//static.xyimg.net/cn/static/fed/common/media/Galileo180.mp4',
    perspective:[60/180*Math.PI, 1 ,.1,8000],
    lookAt:[ 
      [$projectorX.value*1,$projectorY.value*1,$projectorZ.value*1],
      // [$projectorX.value*1,$projectorY.value*1,$projectorZ.value*1-1],
      [...Board.position],
      [0,1,0]   
    ],
    texture:null,

    pro_location:gl.getUniformLocation(program,'u_projector_pro_mat'),
    view_location:gl.getUniformLocation(program,'u_projector_view_mat'),
    tex_location:gl.getUniformLocation(program,'u_projector_texture')
	}

	const p = 750/426
	// debugger
	createVideoTexture(Projector.source,300,300/p).then(({$video,texture})=>{
    
		Projector.texture = texture
    Projector.$video = $video
    
		$video.play().then(()=>{}).catch(()=>{})

    $video.volume =  0
    Projector.perspective[1] = $video.width/$video.height

	})

}



requestAnimationFrame(function animate(){
  requestAnimationFrame(animate)


  gl.useProgram(program)

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  //gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)


  {
    // 板1
    gl.enableVertexAttribArray(Board.position_location)
    gl.bindBuffer(gl.ARRAY_BUFFER,Board.position_buffer)
    gl.vertexAttribPointer(Board.position_location,3,gl.FLOAT,false,0,0)

    gl.enableVertexAttribArray(Board.normal_location)
    gl.bindBuffer(gl.ARRAY_BUFFER,Board.normal_buffer)
    gl.vertexAttribPointer(Board.normal_location,3,gl.FLOAT,false,0,0)


    gl.uniform4fv(Board.co_location,Board.co)

    let [x,y,z] = Board.position
    let mat = m4.translation(x,y,z)
    mat = m4.multiply(mat,m4.xRotation(Board.rotation[0]))
    gl.uniformMatrix4fv(Board.world_location,false,mat)

    gl.drawArrays(gl.TRIANGLE_FAN,0,4)

    // // // 板2
    // gl.enableVertexAttribArray(Board_b.position_location)
    // gl.bindBuffer(gl.ARRAY_BUFFER,Board_b.position_buffer)
    // gl.vertexAttribPointer(Board_b.position_location,3,gl.FLOAT,false,0,0)

    // gl.enableVertexAttribArray(Board_b.normal_location)
    // gl.bindBuffer(gl.ARRAY_BUFFER,Board_b.normal_buffer)
    // gl.vertexAttribPointer(Board_b.normal_location,3,gl.FLOAT,false,0,0)


    // gl.uniform4fv(Board_b.co_location,Board_b.co)

    // ;[x,y,z] = Board_b.position
    // mat = m4.translation(x,y,z)
    // mat = m4.multiply(mat,m4.xRotation(Board_b.rotation[0]))
    // gl.uniformMatrix4fv(Board_b.world_location,false,mat)

    // gl.drawArrays(gl.TRIANGLE_FAN,0,4)


    // //  box
    // gl.enableVertexAttribArray(Cube1.position_location)
    // gl.bindBuffer(gl.ARRAY_BUFFER,Cube1.position_buffer)
    // gl.vertexAttribPointer(Cube1.position_location,3,gl.FLOAT,false,0,0)

    // gl.enableVertexAttribArray(Cube1.normal_location)
    // gl.bindBuffer(gl.ARRAY_BUFFER,Cube1.normal_buffer)
    // gl.vertexAttribPointer(Cube1.normal_location,3,gl.FLOAT,false,0,0)
    

    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array([...Cube1.indices]), gl.STATIC_DRAW)
    

    // gl.uniform4fv(Cube1.co_location,Board_b.co)

    // ;[x,y,z] = Cube1.position
    // mat = m4.translation(x,y,z)
    // mat = m4.multiply(mat,m4.xRotation(Cube1.rotation[0]))
    // ;[x,y,z] = Cube1.scale
    // mat = m4.multiply(mat, m4.scaling(x,y,z))

		// gl.uniformMatrix4fv(Cube1.world_location,false,mat)

    // gl.drawElements(gl.TRIANGLES, Cube1.indices.length, gl.UNSIGNED_SHORT, 0)


    //  //  box2
    //  gl.enableVertexAttribArray(Cube2.position_location)
    //  gl.bindBuffer(gl.ARRAY_BUFFER,Cube2.position_buffer)
    //  gl.vertexAttribPointer(Cube2.position_location,3,gl.FLOAT,false,0,0)
 
    //  gl.enableVertexAttribArray(Cube2.normal_location)
    //  gl.bindBuffer(gl.ARRAY_BUFFER,Cube2.normal_buffer)
    //  gl.vertexAttribPointer(Cube2.normal_location,3,gl.FLOAT,false,0,0)
     
 
    //  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
    //  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array([...Cube2.indices]), gl.STATIC_DRAW)
     
 
    //  gl.uniform4fv(Cube2.co_location,Board_b.co)
 
    //  ;[x,y,z] = Cube2.position
    //  mat = m4.translation(x,y,z)
    //  mat = m4.multiply(mat,m4.xRotation(Cube2.rotation[0]))
    //  ;[x,y,z] = Cube2.scale
    //  mat = m4.multiply(mat, m4.scaling(x,y,z))
 
    //  gl.uniformMatrix4fv(Cube2.world_location,false,mat)
 
    //  gl.drawElements(gl.TRIANGLES, Cube2.indices.length, gl.UNSIGNED_SHORT, 0)

  }
 

  // 场景相机视图
  gl.uniformMatrix4fv(
    pro_location,
    false,
    m4.perspective(...perspective)
  )
  gl.uniformMatrix4fv(
    view_location,
    false,
    m4.inverse(m4.lookAt(...lookAt))
  )

  {
    // 投影仪相机视图
    gl.uniformMatrix4fv(
      Projector.pro_location,
      false,
      m4.perspective(...Projector.perspective)
    )

    Projector.lookAt[1] = Projector.lookAt[0].concat([]).map((v,i)=>{
      return i===2? v-1:v
    })
    gl.uniformMatrix4fv(
      Projector.view_location,
      false,
      m4.inverse(m4.lookAt(...Projector.lookAt ))
    )
		// 投影仪投影贴图

		if(Projector.$video){
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,Projector.$video)
		}
	
    gl.activeTexture(gl.TEXTURE0)
		gl.uniform1i(Projector.tex_location, 0)  
		gl.bindTexture(gl.TEXTURE_2D, Projector.texture)
  }
  
  gl.uniform3fv(light_location,[$lightX.value*1,$lightY.value*1,$lightZ.value*1])
  
})

