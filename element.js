
let x = 0;
let y = 0;
const speed = 10;
let div;
let updating = false;

function addElement() {
    let container = document.getElementById('container');
    if (container) {
        div = document.createElement('div');
        div.className = 'home';
        container.appendChild(div);
        updatePosition();
    } else {
        console.error('Container element not found');
    }
}

function updatePosition() {
    if (div) {
        div.style.transform = `translate(${x}px, ${y}px)`;
        if (window.opener && !window.opener.closed) {
            if (!updating) {
                updating = true;
                window.opener.postMessage({ x, y }, '*');
                setTimeout(() => updating = false, 100); 
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

document.addEventListener('keydown', handleKeydown);

window.addEventListener('message', function(event) {
    if (event.data.x !== undefined && event.data.y !== undefined) {
        if (!updating) {
            updating = true;
            x = event.data.x;
            y = event.data.y;
            updatePosition();
            setTimeout(() => updating = false, 100); 
        }
    } else if (event.data === 'Create Circle') {
        addElement();
    } else if (event.data.color) {
        document.body.style.backgroundColor = event.data.color;
    }
    if(event.data === 'Start CoreFalling'){
        CoreFalling()
    }
});

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

