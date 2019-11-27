// ------

let cena = new THREE.Scene();



let canv = document.getElementById('meuCanvas');
let renderer = new THREE.WebGLRenderer({canvas: canv});
renderer.setSize(800, 600);
renderer.shadowMap.enabled = true


//document.body.appendChild(renderer.domElement);


// -----

let camara = new THREE.PerspectiveCamera(70, 800/600, 0.01, 1000);

camara.position.x = 4;
camara.position.y = 3;
camara.position.z = 2;

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

var luzPonto1 = new THREE.PointLight("white")
luzPonto1.position.set(5, 6, 0)
luzPonto1.castShadow = true;

cena.add(luzPonto1)



var controlos = new THREE.OrbitControls(camara, renderer.domElement);

function animar() {
	requestAnimationFrame( animar )

	renderer.render( cena, camara )
}
animar()




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
}