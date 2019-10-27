const data4x4 = [
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"]
];

const data32x32Url = 'assets/data/32x32.json';
let data32x32;

const imageUrl = 'assets/data/image.png';

const drawPicture = {
    '4x4': () => {
        draw(data4x4, 4, 4, getHexColor);
    },
    'image': () => {
        drawImage(imageUrl);
    },
}

let currentPicture;
const form = document.querySelector('form');

updateCurrentPicture();
form.addEventListener('click', updateCurrentPicture);

fetch(data32x32Url)
    .then(response => response.json())
    .then(data => {
        data32x32 = data;
        drawPicture['32x32'] = () => {
            draw(data32x32, 32, 32, getRgbaColor);
        };
        if (currentPicture == '32x32') {
            currentPicture = null;
            updateCurrentPicture();
        }
    })
    .catch(err => alert(err));

function updateCurrentPicture() {
    setCurrentPicture(form.picture.value);
}

function setCurrentPicture(value) {
    if (currentPicture != value) {
        currentPicture = value;
        if (drawPicture[value]) {
            drawPicture[value]();
        }
        else {
            clear();
        }
    }
}

function clear() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(data, n, m, getColor) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellWidth = Math.floor(canvas.width / n);
    const cellHeight = Math.floor(canvas.height / m);

    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < m; ++j) {
            ctx.fillStyle = getColor(data[j][i]);
            ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
        }
    }
}

function getHexColor(value) {
    return '#' + value;
}

function getRgbaColor(value) {
    const [r, g, b, a] = value;
    return `rgba(${r},${g},${b},${a / 255})`;
}

function drawImage(imageUrl) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = imageUrl;
}
