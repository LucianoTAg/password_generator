// Clear the console on every refresh
console.clear();

// Slider Properties
const sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)",
};

const slider = document.querySelector(".range__slider");
const sliderValue = document.querySelector(".length__title");

// Update the slider fill and value
slider.querySelector("input").addEventListener("input", event => {
    sliderValue.setAttribute("data-length", event.target.value);
    applyFill(event.target);
});
applyFill(slider.querySelector("input"));

function applyFill(slider) {
    const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage + 0.1}%)`;
    slider.style.background = bg;
    sliderValue.setAttribute("data-length", slider.value);
}

// Random Functions for Password Generation
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

function secureMathRandom() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// DOM Elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("slider");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy-btn");
const resultContainer = document.querySelector(".result");
const copyInfo = document.querySelector(".result__info.right");
const copiedInfo = document.querySelector(".result__info.left");

let generatedPassword = false;

resultContainer.addEventListener("mousemove", e => {
    if (generatedPassword) {
        copyBtn.style.opacity = '1';
        copyBtn.style.pointerEvents = 'all';
        copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
        copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
    } else {
        copyBtn.style.opacity = '0';
        copyBtn.style.pointerEvents = 'none';
    }
});

copyBtn.addEventListener("click", () => {
    const password = resultEl.innerText;
    if (!password || password === "CLICK GENERATE") {
        return;
    }
    navigator.clipboard.writeText(password);
    copyInfo.style.transform = "translateY(200%)";
    copyInfo.style.opacity = "0";
    copiedInfo.style.transform = "translateY(0%)";
    copiedInfo.style.opacity = "0.75";
});

generateBtn.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    generatedPassword = true;
    resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
    copyInfo.style.transform = "translateY(0%)";
    copyInfo.style.opacity = "0.75";
    copiedInfo.style.transform = "translateY(200%)";
    copiedInfo.style.opacity = "0";
});

function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = "";
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    if (typesArr.length === 0) {
        return "";
    }
    for (let i = 0; i < length; i++) {
        const randType = typesArr[Math.floor(Math.random() * typesArr.length)];
        const funcName = Object.keys(randType)[0];
        generatedPassword += randomFunc[funcName]();
    }
    return generatedPassword
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
}

function disableOnlyCheckbox() {
    const totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked);
    totalChecked.forEach(el => {
        el.disabled = totalChecked.length === 1;
    });
}

[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
    el.addEventListener('click', disableOnlyCheckbox);
});
