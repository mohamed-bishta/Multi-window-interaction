
const addClick = document.querySelector(".click");
const Core = document.querySelector(".CoreContainer");

let playe = 50;

    Core.onclick = () => {
        CoreFalling();
    }


function contentClick() {
    addClick.onclick = () => {
        addColor();
    }

};

let otherWindow;

document.getElementById('sendMessage').addEventListener('click', function () {

    if (otherWindow && !otherWindow.closed) {
        otherWindow.focus();

    } else {

        otherWindow = window.open('home.html', 'otherWindow');

        setTimeout(function () {

            if (otherWindow) {
                otherWindow.postMessage('Create Circle', '*');
            }

        }, 1000);

    }

});

function addElement() {

    let container = document.getElementById('container');
    let div = document.createElement('div');
    div.className = 'home';
    container.appendChild(div);

    let x = 0;
    let y = 0;
    const speed = 10;

    let isDragging = false;

    let startX, startY, initialX, initialY;
    let lastSentPosition = { x: 0, y: 0 };
    let updating = false;

    function updatePosition() {

        if (div) {
            
            div.style.transform = `translate(${x}px, ${y}px)`;
            console.log(`Position updated: x=${x}, y=${y}`);

            if (otherWindow && !otherWindow.closed) {

                if (Math.abs(x - lastSentPosition.x) > 1 || Math.abs(y - lastSentPosition.y) > 1) {
                    lastSentPosition = { x, y };
                    otherWindow.postMessage({ x, y }, '*');
                }
            }
        }

    }

    function handleKeydown(event) {
        if (event.key === 'ArrowUp') {
            y -= speed;
        } else if (event.key === 'ArrowDown') {
            y += speed;
        } else if (event.key === 'ArrowLeft') {
            x -= speed;
        } else if (event.key === 'ArrowRight') {
            x += speed;
        }
        updatePosition();
    }

    function handleMouseDown(event) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialX = x;
        initialY = y;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(event) {
        if (isDragging) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            x = initialX + dx;
            y = initialY + dy;
            updatePosition();
        }
    }

    function handleMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    div.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeydown);

    window.addEventListener('message', function (event) {
        if (event.data.x !== undefined && event.data.y !== undefined) {
            if (!updating) {
                updating = true;
                x = event.data.x;
                y = event.data.y;
                updatePosition();
                setTimeout(() => updating = false, 100);
            }
        }
    });
}

window.addEventListener('load', addElement);


document.getElementById('sendMessage').addEventListener('click', function () {
    if (otherWindow && !otherWindow.closed) {
        otherWindow.focus();
    } else {
        otherWindow = window.open('home.html', 'otherWindow');
        setTimeout(function () {
            if (otherWindow) {
                otherWindow.postMessage('Create Circle', '*');
            }
        }, 1000);
    }
});


function addColor() {

    let myColor = [
        "Red", "Green", "Blue", "Yellow", "Cyan", "Magenta",
        "Black", "White", "Gray", "Purple", "Orange", "Pink",
        "Brown", "Lime", "Teal", "Olive", "Navy", "Maroon",
        "Silver", "Gold"
    ];

    let myColors = document.getElementById('myColors');

    myColor.forEach(color => {

        let div = document.createElement('div');
        div.className = 'readus';


        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'color';
        input.value = color;

        let label = document.createElement('label');
        label.innerText = color;

        div.appendChild(input);
        div.appendChild(label);
        myColors.appendChild(div);

    });

    myColors.addEventListener('change', function (event) {

        if (event.target.name === 'color') {
            const selectedColor = event.target.value;
            document.body.style.backgroundColor = selectedColor;

            if (otherWindow && !otherWindow.closed) {
                otherWindow.postMessage({ color: selectedColor }, '*');
            }
        }
    });

}

window.addEventListener("load", contentClick);

document.getElementById("contentClick").onclick = () => {
    CoreFalling();
}

function CoreFalling() {

    const container = document.getElementById('element');
    container.innerHTML = ''; 

    const colors = [
        'red', 'blue', 'black', 'green', 'yellow', 'purple', 'cyan', 'magenta',
        'orange', 'pink', 'brown', 'gray', 'silver', 'gold', 'lime', 'teal', 'navy'
    ];

    const numBalls = 50; 

    for (let i = 0; i < numBalls; i++) {

        let div = document.createElement('div');
        div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        div.className = 'Core';
        
        const x = Math.floor(Math.random() * (container.clientWidth - 20));
        div.style.left = `${x}px`;
        div.style.top = `-20px`; 

       
        const delay = Math.random() * 2; 
        div.style.animationDelay = `${delay}s`;

        
        div.addEventListener('animationiteration', () => {
            
            const newX = Math.floor(Math.random() * (container.clientWidth - 20));
            div.style.left = `${newX}px`;
            div.style.top = `-20px`; 

        });


        container.appendChild(div);
    }

}



