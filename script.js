document.addEventListener("DOMContentLoaded", function () {

    let subjects = {
        'A': 'Interfaces',
        'B': 'Android',
        'C': 'Gestión',
        'D': 'Datos',
        'E': 'Empresa',
        'F': 'Servicios',
    };

    // Selecciona todos los divs dentro de .week
    let divs = document.querySelectorAll(".week div");

    divs.forEach(div => {
        let children = div.children;

        // Iteramos a través de cada div hijo del div (los que contienen A, B, C, etc.)
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (subjects[child.textContent]) { // si el texto coincide con una clave en nuestro objeto subjects
                child.textContent = subjects[child.textContent]; // sustituimos el texto
            }
        }
    });
});
