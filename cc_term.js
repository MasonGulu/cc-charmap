/*
Copyright 2024 Mason Gulu
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// To use simply instantiate a new Term, passing in a Canvas.

const fontMapCanvas = document.createElement("canvas");
const fontMapCtx = fontMapCanvas.getContext("2d");

const fontMapImage = new Image();
fontMapImage.onload = function() {
    fontMapCanvas.width = fontMapImage.width;
    fontMapCanvas.height = fontMapImage.height;
    fontMapCtx.drawImage(fontMapImage, 0, 0);
}
// This font is from Computercraft, and is under CCPL.
fontMapImage.src =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAABDRJREFUaN7tmD+LI0cQxV/QwQQD+zAKFFzQmAk6WMxgFFTQmOZ4gTgUiGMw4jBGgTgu2GDDwRTrr6xP4HUwZy/c9OweB3u6QAVCwfyorn79+i/wYpgBBB4AWBWQJxrxALwR8m9z4G5wo60/Aq3Q/VzL4O6e3wKbeoZBbhOwNcRahjsjuf4IbInjx1ovCDM8AL1Vgc/xAIC4VLDLGeRSASVYNxxhRhKgz4D7N94NB7hz3aPjfLzc2W0Eku54MKtkYLfawOnrvnTGSg2OVZuNRhZ4rVTrVmMmCfhCN4HFb99L6VWi2LQ9ACBUgbxNDRsQQFMBkpeGjKFbApCMG8SwdnjNVISHeMDnDLFWZhq7LdiABGO1CWqDtgcIlud7fCGljWatr90MCIhzy6mXViVKIhtQM2DHELqxBImkN/PBGrheK4yNZSAizMfixBg8iAoA0cylEKUgUQ3Z1Ext7hbMaD0ZEPkjKo1so43uWRZUpLnUbyWplCKGbbk7zaX+4GPR/f3OGe7LMFQAqagUiWFbtJsDfz4BKtIcKFMNElUHskYbvZjM5LVe/Agx2phdkuRWKsskJBVKSinE2KRKBo3GyfQxNkJNqEBJiYxssASkQYyxqQJbiUp3YlkANjIaJbqFrxD6Ims2URDQojDU590EEAULE7Oxg20s5wNDx09jpaPhpJ2oE0PiUPEksoqcEkNfBySpMItKVDXDaDkziOqaZ1w9Lh2zvp/cAICW/a/dcwDZ7Lazj4fNIds0L8gGP82X4t1pmhdqIgO6ipDFKA0UyQbzJsZcApWGlGO9iRLK2GRmBW/ZV5oo4UlsoNLEF/HTN8h4vvkH55vH/3+XAACcz+fzzc3NzePj42sBF48nDf5eEurVgdeX+vxFXAL4mtVjDTEn9Ev7BTslHpEbALn23aI5D3hnK+BDDdAoQni/Te5VoEQ5N3hv+4DfqxmiyBbvkALeVmtwI0dkrOpFgtCFXd+jHCMyEAHpNN/4toyxYACOhu22cgLZ8niEBiBq3zSf5hl6LxHarBGVyOoF5HiEVmvca3Xb3Zb6ZqEVAEu36XZBs79WaIC9drVt0QGUlw7V5VWlPraWErMdW0v9mqn2CLIH9gIEINWeH8zM9sXd3axy75YkaSyllMLaC4C7u/te4ziOVWDKsLfFDBPwR7NYw6WvLwAwro6tpQQ7tkytjfNeJDPtTQISardFSTJT2kmQ1of5CeQkSeIgSWlVyTBIktJJkriuADs9BSs1jDIzs2nYaYeXel0uIfXk6un/GVfDXnD1rczMqpYLIYQQ3pdJpwqQc845u9zdv83VU4Zfmpxz5vLT2WVdzTS5GseWqe3nUjZ7QHtw0pnV28PkqMnVWhBKPllztQhgMvdyBp4kKXO+7dl/rs4552DhhZmMEde4xmXi8XNcgStwBa7AFbgCV+AKfAH8C7HCviLvf2ULAAAAAElFTkSuQmCC";

// Size each character is allocated in the font map
const charHeight = 11;
const charWidth = 8;

// character data offset
const charXOffset = 1;
const charYOffset = 1;

// Size of character data
const charScreenHeight = 9;
const charScreenWidth = 6;

// width of character map
const charMapWidth = 16;

function rgbToFillstyle(r, g, b, a) {
	return `rgba(${r},${g},${b},${a / 255})`;
}

class Term {
    constructor(termCanvas) {
        this.termCanvas = termCanvas
        this.termCanvasCtx = termCanvas.getContext("2d")
        this.bg = 15
        this.fg = 0
        this.width = 51
        this.height = 19
        this.scale = 1
        this.cursor = {
            x: 0,
            y: 0
        }
        this.paletteColors = []
        for (let i = 0; i < Term.paletteColors.length; i++) {
            this.paletteColors[i] = Term.paletteColors[i]
        }
        // wait for image to load
    }
    clear() {
        this.termCanvasCtx.fillStyle = this.paletteColors[this.bg]
        this.termCanvasCtx.fillRect(0, 0, this.termCanvasCtx.canvas.width, this.termCanvasCtx.canvas.height)
    }
    
    setSize(w, h) {
        this.width = w
        this.height = h
        this.termCanvasCtx.canvas.width = w * charScreenWidth * this.scale
        this.termCanvasCtx.canvas.height = h * charScreenHeight * this.scale
        this.clear()
    }

    #setChar(x, y, ch) {
        let charY = Math.floor(ch / charMapWidth)
        let charX = ch % charMapWidth
    
        let fromX = charX * charWidth + charXOffset
        let toX = x * charScreenWidth * this.scale
    
        let fromY = charY * charHeight + charYOffset
        let toY = y * charScreenHeight * this.scale
    
        this.termCanvasCtx.clearRect(toX, toY, charScreenWidth * this.scale, charScreenHeight * this.scale)
        const imageData = fontMapCtx.getImageData(fromX, fromY, charScreenWidth, charScreenHeight)
        const data = imageData.data
        for (let dy = 0; dy < charScreenHeight; dy++) {
            for (let dx = 0; dx < charScreenWidth; dx++) {
                // Get the color of the current pixel
                const index = (dy * charScreenWidth + dx) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];
    
                let fillStyle
                if (a > 127) {
                    // fg color
                    fillStyle = this.paletteColors[this.fg]
                } else {
                    // bg color
                    fillStyle = this.paletteColors[this.bg]
                }
                this.termCanvasCtx.fillStyle = fillStyle

    
                // Draw a scaled rectangle for the current pixel on the target canvas
                // fontMapScaledCtx.fillStyle = rgbToFillstyle(r,g,b,a)
                this.termCanvasCtx.fillRect(toX + (dx * this.scale), toY + (dy * this.scale), this.scale, this.scale)
            }
        }
    }

    setScale(i) {
        this.scale = i
        term.setSize(this.width, this.height)
    }
    
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} ch
     */
    setChar(x, y, ch) {
        this.#setChar(x, y, ch)
    }
    
    /**
     * @param {String} str
     */
    write(str) {
        for (i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i)
            this.setChar(this.cursor.x, this.cursor.y, code)
            this.cursor.x++
            if (this.cursor.x >= this.width) {
                this.#newline()
            }
        }
    }
    
    scroll(i) {
        // oh god this is jank
        let charW = charScreenWidth * scale
        let charH = charScreenHeight * scale
        termCanvasCtx.drawImage(
            termCanvasCtx.canvas,
            0, 0,
            width * charW, height * charH,
            0, -i * charScreenHeight * scale,
            width * charW, height * charH
        )
        termCanvasCtx.fillStyle = this.paletteColors[bg]
        termCanvasCtx.fillRect(0, (height - 1) * charH, termCanvasCtx.canvas.width, charH)
    }
    
    #newline() {
        this.cursor.x = 0
        this.cursor.y++
        if (this.cursor.y >= this.height) {
            this.cursor.y = this.height - 1
            this.scroll(1)
        }
    }
    
    print(str) {
        for (i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i)
            let ch = str.charAt(i)
            if (ch == '\n') {
                this.#newline()
            } else {
                this.setChar(cursor.x, cursor.y, code)
                cursor.x++
                if (cursor.x >= width) {
                    this.#newline()
                }
            }
        }
        this.#newline()
    }
    
    blit(text, fgstr, bgstr) {
        if (text.length != fgstr.length || fgstr.length != bgstr.length) {
            error("Blit arguments must be the same length!")
        }
        for (i = 0; i < text.length; i++) {
            let code = text.charCodeAt(i)
            let fgch = fgstr.charAt(i)
            let bgch = bgstr.charAt(i)
            fg = parseInt(fgch, 16)
            bg = parseInt(bgch, 16)
            drawCharacter(cursor.x, cursor.y, code)
            cursor.x++
        }
    }
    
    setCursorPos(x,y) {
        this.cursor.x = x
        this.cursor.y = y
    }
    
    setfg(color) {
        this.fg = color
    }
    
    setbg(color) {
        this.bg = color
    }
    
    setClickHandler(handle) {
        // why does this work...
        let test = this
        this.termCanvas.addEventListener("click", function(e) {
            let rect = e.target.getBoundingClientRect()
            let x = e.clientX - rect.left
            let y = e.clientY - rect.top
            handle(Math.floor(x / charScreenWidth / test.scale), Math.floor(y / charScreenHeight / test.scale))
        })
    }
    
    setMousemoveHandler(handle) {
        let test = this
        this.termCanvas.addEventListener("mousemove", function(e) {
            let rect = e.target.getBoundingClientRect()
            let x = e.clientX - rect.left
            let y = e.clientY - rect.top
            handle(Math.floor(x / charScreenWidth / test.scale), Math.floor(y / charScreenHeight / test.scale))
        })
    }

    // Set a custom palette for a given color index, color should be a string HTML color descriptor like #123456
    // Additional colors (i.e. 16, 17) are technically allowed.
    setPaletteColor(i, color) {
        this.paletteColors[i] = color
    }

    static colors = {
        white:0,
        orange:1,
        magenta:2,
        lightBlue:3,
        yellow:4,
        lime:5,
        pink:6,
        gray:7,
        lightGray:8,
        cyan:9,
        purple:10,
        blue:11,
        brown:12,
        green:13,
        red:14,
        black:15
    }

    static paletteColors = [
        "#f0f0f0",
        "#f2b233",
        "#e57fd8",
        "#99b2f2",
        "#dede6c",
        "#7fcc19",
        "#f2b2cc",
        "#4c4c4c",
        "#999999",
        "#4c99b2",
        "#b266e5",
        "#3366cc",
        "#7f664c",
        "#57a64e",
        "#cc4c4c",
        "#111111"
    ]
}