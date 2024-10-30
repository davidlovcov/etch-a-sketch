let rainbowMode = false;

let onSiteLoad = () => {
    createDivGrid(16);
}

let handleAdjustGridButton = () => {
    clearDivGrid();

    let gridSize = 0;
    do {
        gridSize = parseInt(prompt('Please enter the size of the grid'));
    } while (gridSize < 1 || gridSize > 100);

    createDivGrid(gridSize);
}

let handleColorModeButton = () => {
    if (rainbowMode == false) {
        rainbowMode = true;
    } else {
        rainbowMode = false;
    }
}

let createDivGrid = (grids) => {
    const container = document.querySelector('.container');

    for (let i = 0; i < grids; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.style.display = 'flex';
        rowDiv.style.flexDirection = 'row';
        rowDiv.style.height = 100 / grids + '%';

        for (let j = 0; j < grids; j++) {
            const columnDiv = document.createElement('div');
            columnDiv.classList.add('column');
            columnDiv.style.flexShrink = '0';
            columnDiv.style.height = '100%';
            columnDiv.style.width = 100 / grids + '%';
            rowDiv.appendChild(columnDiv);
        }
        container.appendChild(rowDiv);
    }
    paintRowDiv();
}

let clearDivGrid = () => {
    const rowDivs = document.querySelectorAll('.row');
    rowDivs.forEach(element => {
        element.remove();
    });
}

let paintRowDiv = () => {
    const rowDivs = document.querySelectorAll('.column');
    const colors = [
        // Colors from: https://gist.githubusercontent.com/mucar/3898821/raw/c2c58e72e7f9dcb2494ac716979c8f551231fd09/random_color_array.js
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ]

    rowDivs.forEach((element) => {
        element.style.opacity = 0.0;
        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = colors[parseInt(Math.floor(Math.random() * colors.length))];
            let newOpacity = parseFloat(getComputedStyle(element).opacity) + 0.1;
            element.style.opacity = newOpacity.toString();
        });
    })
}

onSiteLoad();

const button = document.querySelector('button');
button.addEventListener('click', handleAdjustGridButton);

const modeButton = document.querySelector('.color-mode');
button.addEventListener('click', handleColorModeButton)
