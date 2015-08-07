(function(){

  'use strict';

  ///////////////////////////////
  //Scene
  var scene = new THREE.Scene();

  ///////////////////////////////
  //Camera
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(100, 0, 500);

  ///////////////////////////////
  //Renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x666666);
  document.body.appendChild(renderer.domElement);

  ///////////////////////////////
  //Lights
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(20, 50, 100);
  scene.add(light);

  var ambient = new THREE.AmbientLight(0x666666);
  scene.add(ambient);

  ///////////////////////////////
  //Controlls
  var controls = new THREE.OrbitControls(camera);

  ///////////////////////////////
  //Cubes

  function random(){
    var x = Math.random();
    return (x * 2 - 1) * 250;
  }

  var cubes = [];
  function createCube(){
    var num = 5;

    for(var i = 0; i < num; i++){
      var geo = new THREE.BoxGeometry(50, 50, 50);
      var mat = new THREE.MeshLambertMaterial({
        color: 0xff00ff
      });

      var x = random();
      var y = random();
      var z = random() * -1;

      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      cubes.push(mesh);

    }
  }
  createCube();

  ///////////////////////////////
  //Raycaster
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(1, 1);

  function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }


  ///////////////////////////////
  //Render
  function render(){

    cubes.forEach(function(cube, i){
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;
    });

    raycaster.setFromCamera(mouse, camera);
    var instersects = raycaster.intersectObjects(scene.children);

    if(instersects.length < 1){
      cubes.forEach(function (cube, i){
        cube.material.color.set(0xff0000);
      });
    }else{
      for(var i = 0; i < instersects.length; i++){
        instersects[i].object.material.color.set(0x0fff0f);
        console.log('hover');
      }
    }


    renderer.render(scene, camera);
//    controls.update();なくても動く
    requestAnimationFrame(render);
  }

  window.addEventListener('mousemove', onMouseMove, false);
  render();


})();
