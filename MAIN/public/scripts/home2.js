import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r108/build/three.module.js';


let arrayobjs = [];
let camera, scene, renderer;
let username;
let user_id;
//let shape_verf, color_verf;
let color_hexcode;
let color_id;
let shape_id;

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

    const fov = 30;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 20;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 12;

    //I DONT KNOW IF THIS IS NECCESARY, DOESNT SEEM TO HAVE ANY IMPACT
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    //

    scene = new THREE.Scene();
    const intensity = 1;
    const color = "0xFFFFFF";
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    scene.background = new THREE.Color(0xd2d2d2);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshPhongMaterial({
        color: 0x44aa88
    }); // greenish blue

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    arrayobjs.push(['cube', 0xf9d62e]);


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
            xhr.open("POST", "/session/req_user", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                user_name: user_name
            }));
            xhr.onload = function () {
                let data = JSON.parse(this.responseText);
                user_id = data.user_id;
            }
            console.log("user access to: " + username.username + " id: " + user_id);
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
    console.log(arrayobjs);
    let shape_verf, color_verf;
    let command_three;

    // PART 2

    // if the shape name exist, here made a post to the backend to verify that
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/session/verif_shape", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        shape: tshape
    }));
    xhr.onload = function () {
        console.log("shape validation")
        //			console.log(this.responseText);
        let data = JSON.parse(this.responseText);
        shape_verf = data.status;
        command_three = data.constructor;
        shape_id = data.shape_id;
        console.log(shape_verf);
        console.log(command_three);

        let xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "/session/verif_color", true);
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.send(JSON.stringify({
            color: tcolor
        }));
        xhr2.onload = function () {
            console.log("color validation")
            //			console.log(this.responseText);
            let data = JSON.parse(this.responseText);
            color_verf = data.status;
            if (color_verf) {
                color_hexcode = data.result;
                color_id = data.color_id;
            }
            console.log(color_verf);
            console.log(color_hexcode);

            console.log(shape_verf + ": " + color_verf);
            if (shape_verf === true && color_verf === true) {
                console.log("entro a la validacion final");
                const geometry = eval(command_three);
                const material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
                const cube = new THREE.Mesh(geometry, material);
                cube.material.color.setHex(color_hexcode);
                scene.add(cube);
                cube.position.set(randBet(2), randBet(2), 0);
                console.log("NEW CUBE");
                arrayobjs.push([tshape, tcolor, color_id, shape_id]);
            }
            //console.log(dataRecieved);
            // if the color exist, here made a post to the backend to verify that
            //console.log(username.username);

        }
    }
}

const cleanButton = document.getElementById("cleanbtn");
document.addEventListener('DOMContentLoaded', function () {
    cleanButton.addEventListener('click', clean);
});

function clean() {
    console.log("OBJS LEN: " + scene.children.length);
    console.log("DELETED LIST OBJS");
    while (scene.children.length > 1) {
        //console.log(scene.children[cont]);
        if (scene.children[1].type == "Mesh") {
            scene.remove(scene.children[1]);
            console.log("OBJ DELETED: " + scene.children[1]);
        }
    }
}

const delete_lastButton = document.getElementById("deletebtn");
document.addEventListener('DOMContentLoaded', function () {
    delete_lastButton.addEventListener('click', delete_last);
});

function delete_last() {
    const last_shape = scene.children.length - 1;
    if (scene.children[last_shape].type == "Mesh") {
        scene.remove(scene.children[last_shape]);
        console.log("OBJ DELETED: " + scene.children[last_shape]);
    }
}

const saveButton = document.getElementById("savebtn");
document.addEventListener('DOMContentLoaded', function () {
    saveButton.addEventListener('click', save);
});


function save() {
    console.log("function save");
    let project_name = document.getElementById("projectname").textContent;
    console.log(shape_id + " " + color_id);
    console.log(user_id + " " + project_name);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/session/save_project", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        user_name: username.username,
        user_id: user_id,
        project_name: document.getElementById("projectname").textContent,
        shapes_id: shape_id,
        colors_id: color_id
    }));

}