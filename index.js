let characterInfo = document.getElementById("characterInfo");
let term = new Term(document.getElementById("term"));
let charTerm = new Term(document.getElementById("charPreview"));

let bgSelect = document.getElementById("bgSelect");
let fgSelect = document.getElementById("fgSelect");

let bgCustom = document.getElementById("bgcustom");
let fgCustom = document.getElementById("fgcustom");

function setColors(t) {
	if (fgSelect.value != "custom") {
		t.setfg(Term.colors[fgSelect.value]);
	} else {
		t.setfg(17)
	}
	if (bgSelect.value != "custom") {
		t.setbg(Term.colors[bgSelect.value]);
	} else {
		t.setbg(16)
	}
}

function copyToClipboard(text) {
    // Create a temporary textarea element to hold the text
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Prevent scrolling on small screens when copying large text
    textarea.style.position = "fixed"; 
    textarea.style.top = "0";
    textarea.style.left = "0";
    
    // Make the textarea invisible
    textarea.style.opacity = "0";

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    try {
        // Execute the copy command
        const successful = document.execCommand("copy");
    } catch (err) {
        console.error("Failed to copy", err);
    }

    // Remove the textarea after copying
    document.body.removeChild(textarea);
}

function render() {
	setColors(term)
	term.setScale(2);
	term.setSize(18, 17);
	for (i = 0; i < 256; i++) {
		term.setChar((i % 16) + 2, Math.floor(i / 16) + 1, i);
	}

	term.setbg(Term.colors.gray);
	term.setfg(Term.colors.white);
	for (y = 0; y < 16; y++) {
		term.setCursorPos(0, y + 1);
		term.write(`${y.toString(16).toUpperCase()}_`);
	}
	term.setCursorPos(0, 0);
	term.write("  ");
	for (x = 0; x < 16; x++) {
		term.write(x.toString(16).toUpperCase());
	}
}
fgCustom.addEventListener("change", function(e) {
	console.log("changed")
	term.setPaletteColor(17, fgCustom.value)
	charTerm.setPaletteColor(17, fgCustom.value)
	render()
})
bgCustom.addEventListener("change", function(e) {
	term.setPaletteColor(16, bgCustom.value)
	charTerm.setPaletteColor(16, bgCustom.value)
	render()
})

bgSelect.value = "black";
bgSelect.addEventListener("change", function (e) {
	if (bgSelect.value != "custom") {
		term.setbg(Term.colors[bgSelect.value]);
		charTerm.setbg(Term.colors[bgSelect.value]);
		bgCustom.style.visibility = "hidden";
	} else {
		term.setbg(16);
		charTerm.setbg(16);
		bgCustom.style.visibility = "visible";
	}
	render();
});
fgSelect.value = "white";
fgSelect.addEventListener("change", function (e) {
	if (fgSelect.value != "custom") {
		term.setfg(Term.colors[fgSelect.value]);
		charTerm.setfg(Term.colors[fgSelect.value]);
		fgCustom.style.visibility = "hidden";
	} else {
		term.setbg(17);
		charTerm.setbg(17);
		fgCustom.style.visibility = "visible";
	}
	render();
});

let formattingMode = "dec";
const formatButtons = document.querySelectorAll("#format > button");
formatButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		formattingMode = btn.innerHTML.toLowerCase();
		formatButtons.forEach((v) => v.classList.remove("active"));
		btn.classList.add("active");
	});
});

charTerm.setScale(20);
charTerm.setSize(1, 1);
render();

let currentChar = 0
function setChar(i) {
	if (i != currentChar) {
		currentChar = i;
		setColors(charTerm);
		charTerm.setChar(0, 0, i);
	}
}

term.setMousemoveHandler((x, y) => {
	x -= 2;
	y -= 1;
	if (x >= 0 && y >= 0) {
		let idx = y * 16 + x;
		setChar(idx);
		if (formattingMode == "dec") {
			characterInfo.innerHTML = `Character: ${idx}`;
		} else if (formattingMode == "hex") {
			characterInfo.innerHTML = `Character: 0x${idx.toString(16)}`;
		} else {
			characterInfo.innerHTML = `Character: 0x${idx.toString(
				16
			)} (${String.fromCharCode(idx)})`;
		}
	}
});

term.setClickHandler((x, y) => {
	x -= 2;
	y -= 1;
	if (x >= 0 && y >= 0) {
		let idx = y * 16 + x;
		if (formattingMode == "dec") {
			copyToClipboard(`\\${idx}`);
		} else if (formattingMode == "hex") {
			copyToClipboard(`\\x${idx.toString(16)}`);
		} else {
			copyToClipboard(String.fromCharCode(idx));
		}
	}
});
