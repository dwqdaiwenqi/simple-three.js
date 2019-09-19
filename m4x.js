

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

      // loadeddata
      // loadedmetadata 
			$video.addEventListener('loadedmetadata',()=>{


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


/////////////////////////////////////////////////////////////////////////////////////////////


{
  var  subtractVectors= (a, b)=> {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  }
  var normalize =(v)=> {
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
    // make sure we don't divide by 0.
    if (length > 0.00001) {
      return [v[0] / length, v[1] / length, v[2] / length]
    } else {
      return [0, 0, 0]
    }
  }
  var cross =(a, b) =>{
    return [a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]]
  }
  
  var m4 = {
  
    lookAt(cameraPosition, target, up){
      var zAxis = normalize(
          subtractVectors(cameraPosition, target))
      var xAxis = normalize(cross(up, zAxis))
      var yAxis = normalize(cross(zAxis, xAxis))
  
      return [
         xAxis[0], xAxis[1], xAxis[2], 0,
         yAxis[0], yAxis[1], yAxis[2], 0,
         zAxis[0], zAxis[1], zAxis[2], 0,
         cameraPosition[0],
         cameraPosition[1],
         cameraPosition[2],
         1
      ]
    },
    lookAt_(cameraPosition, target, up){
      // +----+----+----+----+
      // | Xx | Xy | Xz |  0 |  <- x axis
      // +----+----+----+----+
      // | Yx | Yy | Yz |  0 |  <- y axis
      // +----+----+----+----+
      // | Zx | Zy | Zz |  0 |  <- z axis
      // +----+----+----+----+
      // | Tx | Ty | Tz |  1 |  <- 相机位置
      // +----+----+----+----+
      // var zAxis = normalize(
      //     subtractVectors(cameraPosition, target));
      var zAxis = normalize(
          subtractVectors(cameraPosition, target))
      var xAxis = normalize(cross(up, zAxis))
      var yAxis = normalize(cross(zAxis, xAxis))
  
      return [
         xAxis[0], xAxis[1], xAxis[2], 0,
         yAxis[0], yAxis[1], yAxis[2], 0,
         zAxis[0], zAxis[1], zAxis[2], 0,
         -cameraPosition[0], -cameraPosition[1], cameraPosition[2], 1
      ]
    },
  
    perspective(fieldOfViewInRadians, aspect, near, far) {
      var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians)
      var rangeInv = 1.0 / (near - far)
  
      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ]
    },
  
    projection(width, height, depth) {
      // Note: This matrix flips the Y axis so 0 is at the top.
      return [
         2 / width, 0, 0, 0,
         0, -2 / height, 0, 0,
         0, 0, 2 / depth, 0,
        -1, 1, 0, 1
      ]
    },
    multiply(a, b, dst) {
      dst = dst || new Float32Array(16)
      var b00 = b[0 * 4 + 0]
      var b01 = b[0 * 4 + 1]
      var b02 = b[0 * 4 + 2]
      var b03 = b[0 * 4 + 3]
      var b10 = b[1 * 4 + 0]
      var b11 = b[1 * 4 + 1]
      var b12 = b[1 * 4 + 2]
      var b13 = b[1 * 4 + 3]
      var b20 = b[2 * 4 + 0]
      var b21 = b[2 * 4 + 1]
      var b22 = b[2 * 4 + 2]
      var b23 = b[2 * 4 + 3]
      var b30 = b[3 * 4 + 0]
      var b31 = b[3 * 4 + 1]
      var b32 = b[3 * 4 + 2]
      var b33 = b[3 * 4 + 3]
      var a00 = a[0 * 4 + 0]
      var a01 = a[0 * 4 + 1]
      var a02 = a[0 * 4 + 2]
      var a03 = a[0 * 4 + 3]
      var a10 = a[1 * 4 + 0]
      var a11 = a[1 * 4 + 1]
      var a12 = a[1 * 4 + 2]
      var a13 = a[1 * 4 + 3]
      var a20 = a[2 * 4 + 0]
      var a21 = a[2 * 4 + 1]
      var a22 = a[2 * 4 + 2]
      var a23 = a[2 * 4 + 3]
      var a30 = a[3 * 4 + 0]
      var a31 = a[3 * 4 + 1]
      var a32 = a[3 * 4 + 2]
      var a33 = a[3 * 4 + 3]
      dst[ 0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30
      dst[ 1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31
      dst[ 2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32
      dst[ 3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33
      dst[ 4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30
      dst[ 5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31
      dst[ 6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32
      dst[ 7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33
      dst[ 8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30
      dst[ 9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31
      dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32
      dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33
      dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30
      dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31
      dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32
      dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
      return dst
    },
    /**
     * Makes an rotation matrix around an arbitrary axis
     * @param {Vector3} axis axis to rotate around
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    axisRotation(axis, angleInRadians, dst){
      dst = dst || new Float32Array(16)
  
      var x = axis[0]
      var y = axis[1]
      var z = axis[2]
      var n = Math.sqrt(x * x + y * y + z * z)
      x /= n
      y /= n
      z /= n
      var xx = x * x
      var yy = y * y
      var zz = z * z
      var c = Math.cos(angleInRadians)
      var s = Math.sin(angleInRadians)
      var oneMinusCosine = 1 - c
  
      dst[ 0] = xx + (1 - xx) * c
      dst[ 1] = x * y * oneMinusCosine + z * s
      dst[ 2] = x * z * oneMinusCosine - y * s
      dst[ 3] = 0
      dst[ 4] = x * y * oneMinusCosine - z * s
      dst[ 5] = yy + (1 - yy) * c
      dst[ 6] = y * z * oneMinusCosine + x * s
      dst[ 7] = 0
      dst[ 8] = x * z * oneMinusCosine + y * s
      dst[ 9] = y * z * oneMinusCosine - x * s
      dst[10] = zz + (1 - zz) * c
      dst[11] = 0
      dst[12] = 0
      dst[13] = 0
      dst[14] = 0
      dst[15] = 1
  
      return dst
    },
    translation(tx, ty, tz, dst) {
      dst = dst || new Float32Array(16)
  
      dst[ 0] = 1
      dst[ 1] = 0
      dst[ 2] = 0
      dst[ 3] = 0
      dst[ 4] = 0
      dst[ 5] = 1
      dst[ 6] = 0
      dst[ 7] = 0
      dst[ 8] = 0
      dst[ 9] = 0
      dst[10] = 1
      dst[11] = 0
      dst[12] = tx
      dst[13] = ty
      dst[14] = tz
      dst[15] = 1
  
      return dst
    },
  
    // translation: function (tx, ty, tz) {
    //   return [
    //      1, 0, 0, 0,
    //      0, 1, 0, 0,
    //      0, 0, 1, 0,
    //      tx, ty, tz, 1
    //   ]
    // },
  
    // xRotation: function (angleInRadians) {
    //   var c = Math.cos(angleInRadians)
    //   var s = Math.sin(angleInRadians)
  
    //   return [
    //     1, 0, 0, 0,
    //     0, c, s, 0,
    //     0, -s, c, 0,
    //     0, 0, 0, 1
    //   ]
    // },
     xRotation(angleInRadians, dst) {
      dst = dst || new Float32Array(16)
      var c = Math.cos(angleInRadians)
      var s = Math.sin(angleInRadians)
  
      dst[ 0] = 1
      dst[ 1] = 0
      dst[ 2] = 0
      dst[ 3] = 0
      dst[ 4] = 0
      dst[ 5] = c
      dst[ 6] = s
      dst[ 7] = 0
      dst[ 8] = 0
      dst[ 9] = -s
      dst[10] = c
      dst[11] = 0
      dst[12] = 0
      dst[13] = 0
      dst[14] = 0
      dst[15] = 1
  
      return dst
    },
  
    // yRotation: function (angleInRadians) {
    //   var c = Math.cos(angleInRadians)
    //   var s = Math.sin(angleInRadians)
  
    //   return [
    //     c, 0, -s, 0,
    //     0, 1, 0, 0,
    //     s, 0, c, 0,
    //     0, 0, 0, 1
    //   ]
    // },
  
     yRotation(angleInRadians, dst) {
      dst = dst || new Float32Array(16)
      var c = Math.cos(angleInRadians)
      var s = Math.sin(angleInRadians)
  
      dst[ 0] = c
      dst[ 1] = 0
      dst[ 2] = -s
      dst[ 3] = 0
      dst[ 4] = 0
      dst[ 5] = 1
      dst[ 6] = 0
      dst[ 7] = 0
      dst[ 8] = s
      dst[ 9] = 0
      dst[10] = c
      dst[11] = 0
      dst[12] = 0
      dst[13] = 0
      dst[14] = 0
      dst[15] = 1
  
      return dst
    },
    // zRotation: function (angleInRadians) {
    //   var c = Math.cos(angleInRadians)
    //   var s = Math.sin(angleInRadians)
  
    //   return [
    //      c, s, 0, 0,
    //     -s, c, 0, 0,
    //      0, 0, 1, 0,
    //      0, 0, 0, 1
    //   ]
    // },
     zRotation(angleInRadians, dst) {
      dst = dst || new Float32Array(16)
      var c = Math.cos(angleInRadians)
      var s = Math.sin(angleInRadians)
  
      dst[ 0] = c
      dst[ 1] = s
      dst[ 2] = 0
      dst[ 3] = 0
      dst[ 4] = -s
      dst[ 5] = c
      dst[ 6] = 0
      dst[ 7] = 0
      dst[ 8] = 0
      dst[ 9] = 0
      dst[10] = 1
      dst[11] = 0
      dst[12] = 0
      dst[13] = 0
      dst[14] = 0
      dst[15] = 1
  
      return dst
    },
  
    scaling (sx, sy, sz) {
      return [
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, sz, 0,
        0, 0, 0, 1
      ]
    },
     scale (m, sx, sy, sz, dst) {
      // This is the optimized verison of
      // return multiply(m, scaling(sx, sy, sz), dst);
      dst = dst || new Float32Array(16)
  
      dst[ 0] = sx * m[0 * 4 + 0]
      dst[ 1] = sx * m[0 * 4 + 1]
      dst[ 2] = sx * m[0 * 4 + 2]
      dst[ 3] = sx * m[0 * 4 + 3]
      dst[ 4] = sy * m[1 * 4 + 0]
      dst[ 5] = sy * m[1 * 4 + 1]
      dst[ 6] = sy * m[1 * 4 + 2]
      dst[ 7] = sy * m[1 * 4 + 3]
      dst[ 8] = sz * m[2 * 4 + 0]
      dst[ 9] = sz * m[2 * 4 + 1]
      dst[10] = sz * m[2 * 4 + 2]
      dst[11] = sz * m[2 * 4 + 3]
  
      if (m !== dst) {
        dst[12] = m[12]
        dst[13] = m[13]
        dst[14] = m[14]
        dst[15] = m[15]
      }
  
      return dst
    },
  
    translate(m, tx, ty, tz) {
      return m4.multiply(m, m4.translation(tx, ty, tz))
    },
  
    xRotate (m, angleInRadians) {
      return m4.multiply(m, m4.xRotation(angleInRadians))
    },
  
    yRotate(m, angleInRadians) {
      return m4.multiply(m, m4.yRotation(angleInRadians))
    },
  
    zRotate(m, angleInRadians) {
      return m4.multiply(m, m4.zRotation(angleInRadians))
    },
  
    copy(src, dst) {
      dst = dst || new Float32Array(16)
  
      dst[ 0] = src[ 0]
      dst[ 1] = src[ 1]
      dst[ 2] = src[ 2]
      dst[ 3] = src[ 3]
      dst[ 4] = src[ 4]
      dst[ 5] = src[ 5]
      dst[ 6] = src[ 6]
      dst[ 7] = src[ 7]
      dst[ 8] = src[ 8]
      dst[ 9] = src[ 9]
      dst[10] = src[10]
      dst[11] = src[11]
      dst[12] = src[12]
      dst[13] = src[13]
      dst[14] = src[14]
      dst[15] = src[15]
      return dst
    },
    identity (dst){
      dst = dst || new Float32Array(16)
  
      dst[ 0] = 1
      dst[ 1] = 0
      dst[ 2] = 0
      dst[ 3] = 0
      dst[ 4] = 0
      dst[ 5] = 1
      dst[ 6] = 0
      dst[ 7] = 0
      dst[ 8] = 0
      dst[ 9] = 0
      dst[10] = 1
      dst[11] = 0
      dst[12] = 0
      dst[13] = 0
      dst[14] = 0
      dst[15] = 1
      return dst
    },
    inverse (m) {
      var m00 = m[0 * 4 + 0]
      var m01 = m[0 * 4 + 1]
      var m02 = m[0 * 4 + 2]
      var m03 = m[0 * 4 + 3]
      var m10 = m[1 * 4 + 0]
      var m11 = m[1 * 4 + 1]
      var m12 = m[1 * 4 + 2]
      var m13 = m[1 * 4 + 3]
      var m20 = m[2 * 4 + 0]
      var m21 = m[2 * 4 + 1]
      var m22 = m[2 * 4 + 2]
      var m23 = m[2 * 4 + 3]
      var m30 = m[3 * 4 + 0]
      var m31 = m[3 * 4 + 1]
      var m32 = m[3 * 4 + 2]
      var m33 = m[3 * 4 + 3]
      var tmp_0 = m22 * m33
      var tmp_1 = m32 * m23
      var tmp_2 = m12 * m33
      var tmp_3 = m32 * m13
      var tmp_4 = m12 * m23
      var tmp_5 = m22 * m13
      var tmp_6 = m02 * m33
      var tmp_7 = m32 * m03
      var tmp_8 = m02 * m23
      var tmp_9 = m22 * m03
      var tmp_10 = m02 * m13
      var tmp_11 = m12 * m03
      var tmp_12 = m20 * m31
      var tmp_13 = m30 * m21
      var tmp_14 = m10 * m31
      var tmp_15 = m30 * m11
      var tmp_16 = m10 * m21
      var tmp_17 = m20 * m11
      var tmp_18 = m00 * m31
      var tmp_19 = m30 * m01
      var tmp_20 = m00 * m21
      var tmp_21 = m20 * m01
      var tmp_22 = m00 * m11
      var tmp_23 = m10 * m01
  
      var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
          (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31)
      var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
          (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31)
      var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
          (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31)
      var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
          (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21)
  
      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3)
  
      return [
        d * t0,
        d * t1,
        d * t2,
        d * t3,
        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
              (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
              (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
              (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
              (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
              (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
              (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
              (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
              (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
              (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
              (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
              (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
              (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
      ]
    },
  
    vectorMultiply(){
      var dst = []
      for (let i = 0; i < 4; ++i) {
        dst[i] = 0.0
        for (let j = 0; j < 4; ++j) {
          dst[i] += v[j] * m[j * 4 + i]
        }
      }
      return dst
    }
  
  }
  

}
