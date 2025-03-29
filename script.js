[03:25, 29.3.2025] Diaa: const addButton = document.getElementById('addButton');
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
let wh…
[04:09, 29.3.2025] Diaa: const addButton = document.getElementById('addButton');
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
const color1Input = document.getElementById('color1Input');
const color2Input = document.getElementById('color2Input');
const exportButton = document.getElementById('exportButton');
const importButton = document.getElementById('importButton');
const lastResultsTextArea = document.getElementById('lastResults');
const saveResultsButton = document.getElementById('saveResultsButton');

let names = [];
let lastTenNames = [];
let lastResults = [];
let wheelAngle = 0;
let spinSound = new Audio('spin.mp3');
let winSound = new Audio('win.mp3');

// إضافة 100 اسم عشوائي
function generateRandomNames() {
    const sampleNames = [
        "أحمد", "محمد", "سامي", "خالد", "حسن", "فاطمة", "سارة", "أمينة", "نادر", "حسين",
        "علاء", "ريم", "سعيد", "زهرة", "محمود", "شريف", "سميرة", "عادل", "فوزية", "مروان",
        "هالة", "أمل", "نورا", "إيمان", "خديجة", "أيمن", "سليم", "جميلة", "منال", "فارس",
        "محمود", "لبنى", "نور", "سعاد", "طارق", "حسام", "زكي", "جمال", "عبدالله", "ماجد",
        "عائشة", "مها", "رضا", "عمر", "نورهان", "سارة", "فؤاد", "نادية", "هاشم", "أحمد",
        "رحاب", "ميساء", "خالد", "مروة", "شيماء", "سمير", "جميلة", "غادة", "حبيبة", "إيمان",
        "يوسف", "كريمة", "سلمى", "إيمان", "باسم", "خديجة", "رشا", "سعاد", "فرح", "رنا",
        "محمد", "نوال", "سوسن", "شريف", "سامية", "رؤى", "فؤاد", "مهند", "غادة", "سمير",
        "آية", "مريم", "يوسف", "لين", "سماح", "سامي", "سيد", "رامي", "غادة", "فادي",
        "سامي", "لينا", "ليلى", "نادر", "سامي", "هند", "ليلى", "مروة", "سعيد", "إيناس",
        "نادية", "شادية", "أحمد", "سامي", "حنان", "جورج", "هيفاء", "محمود", "زهراء",
        "سلام", "وسام", "مروان", "غادة", "دعاء", "فاطمة", "مرام", "ملاك", "سيرين", "زينب",
        "لبنى", "شادية", "غسان", "ناهد", "رجاء", "نورا", "محمود", "نبيلة", "سامي", "سيف",
        "معتز", "أمل", "ياسر", "حنين", "ليلى", "ياسمين", "خليل", "غادة", "مها", "رشيد",
        "لينا", "مهدي", "عماد", "بلال", "آية"
    ];
    names = [...names, ...sampleNames];
}

// تحديث قائمة الأسماء المعروضة
function updateNameList() {
    nameList.innerHTML = '';
    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = ${index + 1}. ${name};
        nameList.appendChild(li);
    });
}

// إضافة اسم عند النقر على الزر
addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        updateNameList();
        nameInput.value = '';  // مسح حقل الاسم
    }
});

// سحب اسم عشوائي عند النقر على الزر
spinButton.addEventListener('click', () => {
    if (names.length > 0) {
        const winner = names[Math.floor(Math.random() * names.length)];
        winnerDisplay.textContent = الفائز هو: ${winner};
        winnerDisplay.classList.add('show');
        winSound.play();

        // حفظ الاسم الفائز في نتائج
        lastResults.push(winner);
        if (lastResults.length > 10) {
            lastResults.shift();
        }
        lastResultsTextArea.value = lastResults.join("\n");

        // إضافة الاسم الفائز إلى آخر 10 أسماء
        lastTenNames.unshift(winner);
        if (lastTenNames.length > 10) {
            lastTenNames.pop();
        }
        lastTenNamesTextArea.value = lastTenNames.join("\n");
    }
});

// إعادة تعيين القائمة
resetButton.addEventListener('click', () => {
    names = [];
    lastTenNames = [];
    lastResults = [];
    updateNameList();
    winnerDisplay.classList.remove('show');
    lastTenNamesTextArea.value = '';
    lastResultsTextArea.value = '';
});

// حفظ نتائج الأسماء الفائزة
saveResultsButton.addEventListener('click', () => {
    localStorage.setItem('lastResults', JSON.stringify(lastResults));
});

// استيراد الأسماء
importButton.addEventListener('click', () => {
    const importedNames = prompt("أدخل الأسماء المنقولة (فصلها بفواصل)").split(",");
    names = [...names, ...importedNames.map(name => name.trim())];
    updateNameList();
});

// تصدير الأسماء
exportButton.addEventListener('click', () => {
    const exportedNames = names.join(", ");
    const blob = new Blob([exportedNames], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_names.txt";
    a.click();
    URL.revokeObjectURL(url);
});

// فتح وإغلاق لوحة الإعدادات
settingsButton.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
});