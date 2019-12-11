// ------

let cena = new THREE.Scene();



let canv = document.getElementById('meuCanvas');
let renderer = new THREE.WebGLRenderer({canvas: canv});
renderer.setSize(800, 600);
renderer.shadowMap.enabled = true


let camara = new THREE.PerspectiveCamera(70, 800/600, 0.01, 1000);
camara.position.x = 6;
camara.position.y = 4;
camara.position.z = 7;


var controlos = new THREE.OrbitControls(camara, renderer.domElement);

var grelha = new THREE.GridHelper();
cena.add(grelha);

var luzPonto1 = new THREE.PointLight("white")
luzPonto1.position.set(5, 3, 5)

cena.add(luzPonto1)

let relogio = new THREE.Clock();
let misturador = new THREE.AnimationMixer(cena);


let acaoLocY, acaoRotZ;

var carregador = new THREE.GLTFLoader()
carregador.load(
	'./blender/cena-rotZ-LocY-LocZ.glb',
	function (gltf) {
		cena.add(gltf.scene);

		acaoLocY = misturador.clipAction(THREE.AnimationClip.findByName(gltf.animations, 'LocY'));
		//acaoLocY.play();

		acaoRotZ = misturador.clipAction(THREE.AnimationClip.findByName(gltf.animations, 'RotZ'));
		//acaoRotZ.play();

	}
)




function animar() {
	requestAnimationFrame(animar);

	misturador.update(relogio.getDelta());
	renderer.render(cena, camara)
}
animar()


document.getElementById('btn_play').onclick = function() {
	var e = document.getElementById("menu_loop");
	var selected = e.options[e.selectedIndex].value;

	acaoLocY.clampWhenFinished = false;
	acaoRotZ.clampWhenFinished = false;
	if(selected == "1") {
		acaoRotZ.setLoop(THREE.LoopOnce);
		acaoLocY.setLoop(THREE.LoopOnce);
		acaoLocY.clampWhenFinished = true;
		acaoRotZ.clampWhenFinished = true;
	} else if(selected == "2"){
		acaoRotZ.setLoop(THREE.LoopRepeat);
		acaoLocY.setLoop(THREE.LoopRepeat);
	} else {
		acaoRotZ.setLoop(THREE.LoopPingPong);
		acaoLocY.setLoop(THREE.LoopPingPong);
	}

	acaoRotZ.reset();
	acaoLocY.reset();
	
	acaoRotZ.play();
	acaoLocY.play();


}

document.getElementById('btn_pause').onclick = function() {
	acaoRotZ.paused = !acaoRotZ.paused;
	acaoLocY.paused = !acaoLocY.paused;
}

document.getElementById('btn_stop').onclick = function() {
	acaoLocY.stop();
	acaoRotZ.stop();
}

document.getElementById('btn_reverse').onclick = function() {
	acaoRotZ.timeScale = acaoRotZ.timeScale * -1;
	acaoLocY.timeScale = acaoLocY.timeScale * -1;
}



/*



let cubo, matOrigem;

var carregador = new THREE.GLTFLoader()
carregador.load(
	'../ficheiro-gltf/cena.gltf',
	function ( gltf ) {
		cena.add( gltf.scene )

		 cena.traverse((elemento) => {
			if(elemento.isMesh){
				elemento.castShadow = true;
				elemento.receiveShadow = true;
				if (elemento.name == "Cubo"){
					cubo = elemento;
					matOrigem = cubo.material;
				}
			}
		})
		
	}
)












document.getElementById('btn_cor').onclick = function() {
	let cor = new THREE.Color("rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
	cubo.material.color = cor;
}

document.getElementById('btn_material').onclick = function() {
	cubo.material = new THREE.MeshNormalMaterial();
}

document.getElementById('btn_transparencia').onclick = function() {
	if(cubo.material.transparent) {
		cubo.material.opacity = 1;
		cubo.material.transparent = false;
	} else {
		cubo.material.opacity = 0.5;
		cubo.material.transparent = true;
	}
}

document.getElementById('btn_repor').onclick = function() {
	cubo.material = matOrigem;
}

document.getElementById('btn_vis').onclick = function() {
	cubo.visible = !cubo.visible;
}*/