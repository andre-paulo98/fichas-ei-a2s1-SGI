let geometria = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshNormalMaterial();

let cubo = new THREE.Mesh(geometria, material);


// ------

let cena = new THREE.Scene();
cena.add(cubo);


let renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);

document.body.appendChild(renderer.domElement);



// -----

let camara = new THREE.PerspectiveCamera(70, 800/600, 0.01, 1000);

camara.position.z = 5;


renderer.render(cena, camara);
animar();

function animar() {

	requestAnimationFrame(animar);
	// mostrar...
	renderer.render(cena, camara);
	// atualizar posição do cubo
	cubo.rotateX(0.2);
	cubo.rotateY(20);

}
