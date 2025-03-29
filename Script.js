const addButton = document.getElementById('addButton');
const spinButton = document.getElementById('spinButton');
const resetButton = document.getElementById('resetButton');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const wheelCanvas = document.getElementById('wheelCanvas');
const ctx = wheelCanvas.getContext('2d');
const settingsButton = document.getElementById('settingsButton');
const settingsPanel = document.getElementById('settingsPanel');
const lastTenNamesTextArea = document.getElementById('lastTenNames');
const saveLastTenButton = document.getElementById('saveLastTenButton');

let names = [];
let lastTenNames = [];
let wheelRadius = 200;
let wheelAngle = 0;

// تحديث قائمة الأسماء
function updateNameList() {
    nameList.innerHTML = '';
    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = ${index + 1}. ${name};
        nameList.appendChild(li);
    });
}

// إضافة اسم إلى القائمة
addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        nameInput.value = '';  
        updateNameList();
        drawWheel();
    }
});

// رسم العجلة
function drawWheel() {
    wheelCanvas.width = 2 * wheelRadius;
    wheelCanvas.height = 2 * wheelRadius;
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    let shuffledNames = shuffleArray([...names]);
    let finalNames = shuffledNames.slice(0, shuffledNames.length - 10).concat(lastTenNames);

    const anglePerSection = 2 * Math.PI / finalNames.length;

    finalNames.forEach((name, index) => {
        const startAngle = index * anglePerSection;
        const endAngle = (index + 1) * anglePerSection;

        ctx.fillStyle = index % 2 === 0 ? '#FFEB3B' : '#FF9800';
        ctx.beginPath();
        ctx.arc(wheelRadius, wheelRadius, wheelRadius, startAngle, endAngle);
        ctx.lineTo(wheelRadius, wheelRadius);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(name, wheelRadius + Math.cos(startAngle + anglePerSection / 2) * 60, wheelRadius + Math.sin(startAngle + anglePerSection / 2) * 60);
    });
}

// تدوير العجلة
spinButton.addEventListener('click', () => {
    if (names.length > 0) {
        const spinDuration = 3;
        const spins = Math.random() * 3 + 3;

        let spinStartTime = Date.now();
        function spinWheel() {
            const elapsedTime = (Date.now() - spinStartTime) / 1000;
            const progress = Math.min(elapsedTime / spinDuration, 1);

            wheelAngle = spins * Math.PI * 2 * progress;

            ctx.save();
            ctx.translate(wheelRadius, wheelRadius);
            ctx.rotate(wheelAngle);
            ctx.translate(-wheelRadius, -wheelRadius);
            drawWheel();
            ctx.restore();

            if (progress < 1) {
                requestAnimationFrame(spinWheel);
            } else {
                const selectedIndex = Math.floor((wheelAngle / (2 * Math.PI)) * names.length) % names.length;
                alert(الاسم المختار: ${names[selectedIndex]});
            }
        }
        spinWheel();
    } else {
        alert('لا توجد أسماء للاختيار منها!');
    }
});

// إعادة تعيين العجلة
resetButton.addEventListener('click', () => {
    names = [];
    lastTenNames = [];
    updateNameList();
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
});

// إظهار/إخفاء الإعدادات
settingsButton.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
});

// حفظ الأسماء لآخر 10 أسماء
saveLastTenButton.addEventListener('click', () => {
    const lastTenNamesInput = lastTenNamesTextArea.value.trim();
    if (lastTenNamesInput) {
        lastTenNames = lastTenNamesInput.split('\n').map(name => name.trim()).filter(name => name.length > 0);
        alert('تم حفظ الأسماء الأخيرة');
        drawWheel();
    }
});

// خلط الأسماء
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}