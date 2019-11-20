var cena = new THREE.Scene();
var camara = new THREE.PerspectiveCamera( 70, 800 / 600, 0.1, 500 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( 800, 600 );
document.body.appendChild(renderer.domElement);
renderer.render(cena, camara);


var eixos = new THREE.AxesHelper();
cena.add(eixos);

camara.position.x = 2;
camara.position.y = 3;
camara.position.z = 5;
camara.lookAt(0, 0, 0);


var grelha = new THREE.GridHelper();
cena.add(grelha);


var carregador = new THREE.GLTFLoader()
carregador.load(
 'TV.glb',
 function ( gltf ) {
 cena.add( gltf.scene )
 }
)

var luzAmbiente = new THREE.AmbientLight( "lightgreen" )
cena.add(luzAmbiente)

var luzPonto1 = new THREE.PointLight( "blue" )
luzPonto1.position.set( 0, 0, 3 )
cena.add( luzPonto1 )
var luzPonto2 = new THREE.PointLight( "red" )
luzPonto2.position.set( 3, 2, 0 );
cena.add( luzPonto2 )

var controlos = new THREE.OrbitControls(camara, renderer.domElement);
var stats = new Stats()
document.body.appendChild( stats.domElement )

function animar() {
	requestAnimationFrame( animar )

	stats.update()

	renderer.render( cena, camara )
}
animar()


