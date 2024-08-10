let characterInfo = document.getElementById("characterInfo");
let term = new Term(document.getElementById("term"));
let charTerm = new Term(document.getElementById("charPreview"));

let bgSelect = document.getElementById("bgSelect");
let fgSelect = document.getElementById("fgSelect");
function render() {
	term.setfg(Term.colors[fgSelect.value]);
	term.setbg(Term.colors[bgSelect.value]);
	term.setScale(3);
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

bgSelect.value = "black";
bgSelect.addEventListener("change", function (e) {
	term.setbg(Term.colors[bgSelect.value]);
	charTerm.setbg(Term.colors[bgSelect.value]);
	render();
});
fgSelect.value = "white";
fgSelect.addEventListener("change", function (e) {
	term.setfg(Term.colors[fgSelect.value]);
	charTerm.setfg(Term.colors[fgSelect.value]);
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

term.setMousemoveHandler((x, y) => {
	x -= 2;
	y -= 1;
	if (x >= 0 && y >= 0) {
		let idx = y * 16 + x;
		charTerm.setbg(Term.colors[bgSelect.value]);
		charTerm.setfg(Term.colors[fgSelect.value]);
		charTerm.setChar(0, 0, idx);
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
			navigator.clipboard.writeText(`\\${idx}`);
		} else if (formattingMode == "hex") {
			navigator.clipboard.writeText(`\\x${idx.toString(16)}`);
		} else {
			navigator.clipboard.writeText(String.fromCharCode(idx));
		}
	}
});
