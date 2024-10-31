let rainbowMode = false;

// Event Handlers
const handleAdjustGridButton = () => {
    clearDivGrid();

    let gridSize = 0;
    do {
        gridSize = parseInt(prompt('Please enter the size of the grid'));
    } while (gridSize < 1 || gridSize > 100);

    createDivGrid(gridSize);
};

const handleColorModeButton = () => {
    rainbowMode = !rainbowMode;
    if (rainbowMode) {
        modeButton.textContent = 'Switch to Normal Mode';
        modeButton.style.background = 'linear-gradient(to right, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)';
        modeButton.style.backgroundSize = '200% 100%';
        modeButton.style.animation = 'rainbow-transition 2s linear infinite';
    } else {
        modeButton.textContent = 'Switch to Rainbow Mode!';
        modeButton.style.background = 'black';
        modeButton.style.animation = 'none';
    }
};

const handleRandomizeColorButton = () => {
    randomizeEveryColor();
    console.log('did it');
};
// End of Event Handles

// Methods

const onSiteLoad = () => {
    createDivGrid(16);
};

const createDivGrid = (grids) => {
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
};

const clearDivGrid = () => {
    const rowDivs = document.querySelectorAll('.row');
    rowDivs.forEach(element => {
        element.remove();
    });
};

const paintRowDiv = () => {
    const columnDivs = document.querySelectorAll('.column');
    columnDivs.forEach((element) => {
        element.style.opacity = 0.0;
        element.addEventListener('mouseover', () => {
            rainbowMode ? drawRainbow(element) : drawBlack(element);
        });
    });
};

const pickRandomColor = () => {
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
    ];

    return colors[parseInt(Math.floor(Math.random() * colors.length))];
};

const drawRainbow = (element) => {
    element.style.backgroundColor = pickRandomColor();
    let newOpacity = parseFloat(getComputedStyle(element).opacity) + 0.1;
    element.style.opacity = newOpacity.toString();
};

const drawBlack = (element) => {
    element.style.backgroundColor = 'black';
    let newOpacity = parseFloat(getComputedStyle(element).opacity) + 0.1;
    element.style.opacity = newOpacity.toString();
};

const randomizeEveryColor = () => {
    const columnDivs = document.querySelectorAll('.column');
    columnDivs.forEach((element) => {
        getComputedStyle(element).backgroundColor != 'rgb(0, 0, 0)' ? 
        element.style.backgroundColor = pickRandomColor() : null ;
    });
};
// End of Methods

onSiteLoad();

// Event Listener
const button = document.querySelector('button');
button.addEventListener('click', handleAdjustGridButton);

const modeButton = document.querySelector('.color-mode');
modeButton.addEventListener('click', handleColorModeButton);

const randomizeColorButton = document.querySelector('.randomize-color');
randomizeColorButton.addEventListener('click', handleRandomizeColorButton);
randomizeColorButton.addEventListener('touchstart', handleRandomizeColorButton);
// End of Event Listener
