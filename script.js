 const display = document.getElementById("display");

function appendValue(value) {
    const lastChar = display.value.slice(-1);

    if (["+", "-", "*", "/", "%"].includes(value)) {
        if (["+", "-", "*", "/", "%"].includes(lastChar)) return;
    }

    display.value += value;
}

function calculate() {
    try {
        if (display.value.includes("/0")) {
            display.value = "Cannot divide by 0";
            return;
        }

        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;

        if (value === "C") clearDisplay();
        else if (value === "=") calculate();
        else if (value === "⌫") backspace();
        else if (value === "÷") appendValue("/");
        else if (value === "×") appendValue("*");
        else if (value === "−") appendValue("-");
        else if (value === "%") appendValue("%");
        else appendValue(value);
    });
});

// Keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === ".") appendValue(key);
    else if (["+", "-", "*", "/", "%"].includes(key)) appendValue(key);
    else if (key === "Enter") calculate();
    else if (key === "Backspace") backspace();
    else if (key === "Escape") clearDisplay();
});