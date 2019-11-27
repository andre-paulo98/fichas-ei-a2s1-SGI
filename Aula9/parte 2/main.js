// ------

let cena = new THREE.Scene();


let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

//document.getElementById('meuCanvas').appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);


// -----

let camara = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);

camara.position.x = 4;
camara.position.y = 3;
camara.position.z = 2;

let candidatos = [];
let cubo;

var carregador = new THREE.GLTFLoader()
carregador.load(
	'../ficheiro-gltf/cena.gltf',
	function ( gltf ) {
		cena.add( gltf.scene )

		cena.traverse((elemento) => {
			if(elemento.isMesh){
				elemento.castShadow = true;
				elemento.receiveShadow = true;
			}
			if (elemento.name == "Cubo"){
					cubo = elemento;
				}
			if (elemento.name.includes("Botao")){
				candidatos.push(elemento);
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

var raycaster = new THREE.Raycaster()
var rato = new THREE.Vector2()

window.onclick = function(evento) {
	rato.x = (evento.clientX / window.innerWidth) * 2 - 1
	rato.y = -(evento.clientY / window.innerHeight) * 2 + 1
	// invocar raycaster
	let todos = pegarTodos();
	if(todos.length > 0) {
		cubo.material = todos[0].object.material;
	}
}


function pegarTodos() {
	raycaster.setFromCamera(rato, camara)

	var intersetados = raycaster.intersectObjects(candidatos)
	return intersetados;
}
