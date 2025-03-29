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
const winnerDisplay = document.getElementById('winnerDisplay');

let names = [];
let lastTenNames = [];
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
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    if (names.length === 0) return;

    let shuffledNames = shuffleArray([...names]);
    let finalNames = shuffledNames.slice(0, shuffledNames.length - 10).concat(lastTenNames);

    const anglePerSection = 2 * Math.PI / finalNames.length;

    finalNames.forEach((name, index) => {
        const startAngle = index * anglePerSection;
        const endAngle = (index + 1) * anglePerSection;

        ctx.fillStyle = index % 2 === 0 ? '#FFEB3B' : '#FF9800';
        ctx.beginPath();
        ctx.arc(200, 200, 200, startAngle, endAngle);
        ctx.lineTo(200, 200);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(name, 200 + Math.cos(startAngle + anglePerSection / 2) * 100, 200 + Math.sin(startAngle + anglePerSection / 2) * 100);
    });
}

// تدوير العجلة
spinButton.addEventListener('click', () => {
    if (names.length > 0) {
        const spinDuration = 5; 
        const spins = Math.random() * 3 + 3;
        let spinStartTime = Date.now();

        function spinWheel() {
            const elapsedTime = (Date.now() - spinStartTime) / 1000;
            const progress = Math.min(elapsedTime / spinDuration, 1);

            wheelAngle = spins * Math.PI * 2 * progress;

            ctx.save();
            ctx.translate(200, 200);
            ctx.rotate(wheelAngle);
            ctx.translate(-200, -200);
            drawWheel();
            ctx.restore();

            if (progress < 1) {
                requestAnimationFrame(spinWheel);
            } else {
                const selectedIndex = Math.floor((wheelAngle / (2 * Math.PI)) * names.length) % names.length;
                const selectedName = names[selectedIndex];

                if (lastTenNames.includes(selectedName)) {
                    winnerDisplay.innerHTML = يلا بينا اديك خدت حاجة من الدنيا!<br><strong>${selectedName}</strong>;
                } else {
                    winnerDisplay.innerHTML = يلا بينا يا وجه النحس اقلب وجهك!<br><strong>${selectedName}</strong>;
                }

                winnerDisplay.classList.add('show');

                setTimeout(() => {
                    winnerDisplay.classList.remove('show');
                }, 4000);
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
    lastTenNames = lastTenNamesTextArea.value.trim().split('\n').map(name => name.trim()).filter(name => name.length > 0);
    alert('تم حفظ الأسماء الأخيرة');
    drawWheel();
});

// خلط الأسماء
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}