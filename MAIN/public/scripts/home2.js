import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r108/build/three.module.js';

function main() {
	// MAIN METHOD THAT GOING TO INITIATE CAMERA, SCENE AND THE FIRST ROTATING CUBE
	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({
			canvas
		});

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;
	
	//I DONT KNOW IF THIS IS NECCESARY, DOESNT SEEM TO HAVE ANY IMPACT
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
	//

	const scene = new THREE.Scene();

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const material = new THREE.MeshBasicMaterial({
			color: 0x44aa88
		}); // greenish blue

	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	function render(time) {
		time *= 0.001; // convert time to seconds

		cube.rotation.x = time;
		cube.rotation.y = time;

		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}
	//THIS IS THE NATIVE METHOD THAT UPDATE THE CANVAS ON EACH FRAME
	requestAnimationFrame(render);

	//A METHOD TO GENERATE RANDOM NUMBERS BETWEEN 0 AND A MAX NUMBER
	function randBet(maxnum) {
		var num = Math.floor(Math.random()*maxnum) + 1; // this will get a number between 1 and 99;
		num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
		return num;
	}
	
	//METHOD TO MANAGE THE CLICK METHOD IN THE RED BUTTON RECORD, HERE INITIATE THE RECORDING OF THE AUDIO BUFFER AND INSTANTIATE THE OBJECT
	document.getElementById("recordbtn").onclick = function () {
		console.log("NEW CUBE");
		const geometry = new THREE.BoxGeometry(1, 1, 1);

		const material = new THREE.MeshBasicMaterial({
				color: 0xff0000
			}); // greenish blue

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		cube.position.set(randBet(2), randBet(2), 0);
	}
}

//HERE WE EXECUTE ALL THAT THE MAIN METHOD HAVE
main();
