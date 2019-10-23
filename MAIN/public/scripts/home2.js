import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r108/build/three.module.js';


let arrayobj = [];
let camera, scene, renderer;
let username;
//let shape_verf, color_verf;
let color_hexcode;
//HERE WE EXECUTE ALL THAT THE MAIN METHOD HAVE
main();

function main() {

    // OBJECTS THAT THE DATABASE NEEDS ADN FOR THE SESSIONS
    let projectname = "default";
    //var arrayobj = [];
    // MAIN METHOD THAT GOING TO INITIATE CAMERA, SCENE AND THE FIRST ROTATING CUBE
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({
        canvas
    });

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    //I DONT KNOW IF THIS IS NECCESARY, DOESNT SEEM TO HAVE ANY IMPACT
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    //

    scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshBasicMaterial({
        color: 0x44aa88
    }); // greenish blue

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    arrayobj.push(['cube', 0xf9d62e]);

    function render(time) {
        time *= 0.001; // convert time to seconds

        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    //THIS IS THE NATIVE METHOD THAT UPDATE THE CANVAS ON EACH FRAME
    requestAnimationFrame(render);

    //GET USERNAME FROM OR OWN API
    fetch('/apiuser')
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            username = data;
        })
        .catch(err => {
            // Do something for an error here
        })




    //METHOD TO MANAGE THE CLICK METHOD IN THE RED BUTTON RECORD, HERE INITIATE THE RECORDING OF THE AUDIO BUFFER AND INSTANTIATE THE OBJECT

}

//A METHOD TO GENERATE RANDOM NUMBERS BETWEEN 0 AND A MAX NUMBER
function randBet(maxnum) {
    var num = Math.floor(Math.random() * maxnum) + 1; // this will get a number between 1 and 99;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    return num;
}

export function instanciateobj(tshape, tcolor) {
    console.log(arrayobj);
	console.log(arrayobj);
	let shape_verf, color_verf;

    // PART 2

    // if the shape name exist, here made a post to the backend to verify that
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/session/verif_shape", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        shape: tshape
    }));
    xhr.onload = function () {
        console.log("shape validation")
        //			console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        shape_verf = data.status;
        console.log(shape_verf);
		
		var xhr2 = new XMLHttpRequest();
		xhr2.open("POST", "/session/verif_color", true);
		xhr2.setRequestHeader('Content-Type', 'application/json');
		xhr2.send(JSON.stringify({
        color: tcolor
		}));
			xhr2.onload = function () {
			console.log("color validation")
			//			console.log(this.responseText);
			var data = JSON.parse(this.responseText);
			color_verf = data.status;
			if (color_verf) {
				color_hexcode = data.result;
			}
			console.log(color_verf);
			console.log(color_hexcode);
				
				console.log(shape_verf + ": " + color_verf);
				if (shape_verf === true && color_verf === true) {
					console.log("entro a la validacion final");
					if (tshape.localeCompare("cube") === 0) {
						const geometry = new THREE.BoxGeometry(1, 1, 1);
						const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
						const cube = new THREE.Mesh(geometry, material);
						scene.add(cube);
						cube.position.set(randBet(2), randBet(2), 0);
						console.log("NEW CUBE");
					}
					else if (tshape.localeCompare("triangle") === 0) {
						//var geometry = new THREE.ConeGeometry(5, 20, 32);
						//var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
						//var cone = new THREE.Mesh(geometry, material);
						//scene.add(cone);
						//cone.position.set(randBet(2), randBet(2), 0);
						//console.log("NEW TRIANGLE");
						const geometry = new THREE.BoxGeometry(1, 1, 1);
						const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
						const cube = new THREE.Mesh(geometry, material);
						scene.add(cube);
						cube.position.set(randBet(2), randBet(2), 0);
						console.log("NEW CUBE");
					}
					else if (tshape.localeCompare("circle") === 0) {
						//var geometry = new THREE.CircleGeometry(5, 32);
						//var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
						//var circle = new THREE.Mesh(geometry, material);
						//scene.add(circle);
						//circle.position.set(randBet(2), randBet(2), 0);
						//console.log("NEW CIRCLE");						
						const geometry = new THREE.BoxGeometry(1, 1, 1);
						const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
						const cube = new THREE.Mesh(geometry, material);
						scene.add(cube);
						cube.position.set(randBet(2), randBet(2), 0);
						console.log("NEW CUBE");
					}
					else if (tshape.localeCompare("cylinder") === 0) {
						//var geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
						//var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
						//var cylinder = new THREE.Mesh(geometry, material);
						//scene.add(cylinder);
						//cylinder.position.set(randBet(2), randBet(2), 0);
						//console.log("NEW CYLINDER");
						const geometry = new THREE.BoxGeometry(1, 1, 1);
						const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
						const cube = new THREE.Mesh(geometry, material);
						scene.add(cube);
						cube.position.set(randBet(2), randBet(2), 0);
						console.log("NEW CUBE");
					}
				}
				//console.log(dataRecieved);
				// if the color exist, here made a post to the backend to verify that
				//console.log(username.username);
				arrayobj.push([username.username, tshape, tcolor, color_hexcode]);	
					
			}
		
		
    }



	
}

//document.getElementById("recordbtn").onclick = function () {
//    console.log(arrayobj);
//    const geometry = new THREE.BoxGeometry(1, 1, 1);

//    const material = new THREE.MeshBasicMaterial({
//        color: 0xff0000
//    }); // greenish blue

//    const cube = new THREE.Mesh(geometry, material);
//    scene.add(cube);
//    cube.position.set(randBet(2), randBet(2), 0);

//    // PART 2

//    // if the shape name exist, here made a post to the backend to verify that
//    var xhr = new XMLHttpRequest();
//    xhr.open("POST", "/session/verif_shape", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    xhr.send(JSON.stringify({
//        shape: 'cube'
//    }));
//    xhr.onload = function () {
//        console.log("shape validation")
//        //			console.log(this.responseText);
//        var data = JSON.parse(this.responseText);
//        shape_verf = data.status;
//        console.log(shape_verf);
//    }

//    var xhr2 = new XMLHttpRequest();
//    xhr2.open("POST", "/session/verif_color", true);
//    xhr2.setRequestHeader('Content-Type', 'application/json');
//    xhr2.send(JSON.stringify({
//        color: 'red'
//    }));
//    xhr2.onload = function () {
//        console.log("color validation")
//        //			console.log(this.responseText);
//        var data = JSON.parse(this.responseText);
//        color_verf = data.status;
//        if (color_verf) {
//            color_hexcode = data.result;
//        }
//        console.log(color_verf);
//        console.log(color_hexcode);
//    }

//    if (shape_verf === true && color_verf === true) {

//    }
//    //console.log(dataRecieved);
//    // if the color exist, here made a post to the backend to verify that
//    console.log(username.username);
//    arrayobj.push(['cube', 0xf9d62e]);
//}

