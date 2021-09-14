export default {
    props: {
        cursorColor: {
            type: String,
            default: "#21f838",
        },
        cursorInterval: {
            type: Number,
            default: 1000,
        },
        cursorWidth: {
            type: String,
            default: "5px",
        },
        cursorPosition: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            splitCmd: [
                `<span><div style="position: absolute;opacity: 50%;float: left;width: 8px;height: 14px;background: ${this.cursorColor};display: inline;" id='cursor'></div></span>`
            ],
            cursor: `position: absolute;opacity: 50%;float: left;width: 8px;height: 14px;background: #21f838;display: inline;`,
            cursorPositionIndex: 0,
        }
    },
    methods: {
        left() {
            let index = 0;
            for (let i = 0; i < this.splitCmd.length; i++) {
                if (this.splitCmd[i - 1])
                    if (this.splitCmd[i].includes('cursor')) {
                        index = i;
                        this.splitCmd[i - 1] = this.splitCmd[i - 1].slice(this.splitCmd[i - 1].lastIndexOf('<span>'), this.splitCmd[i - 1].lastIndexOf('</span>')) + `<div style="${this.cursor}" id='cursor'></div>` + this.splitCmd[i - 1].substr(this.splitCmd[i - 1].lastIndexOf('</span>'))
                        this.splitCmd[i] = this.splitCmd[i].replace(this.splitCmd[i].slice(this.splitCmd[i].indexOf('<div'), this.splitCmd[i].lastIndexOf('</span>')), '')
                        this.cursorPositionIndex = i - 1;
                        return;
                    }
            }
        },
        right() {
            let index = 0;
            for (let i = 0; i < this.splitCmd.length; i++) {
                if (this.splitCmd[i + 1])
                    if (this.splitCmd[i].includes('cursor')) {
                        index = i;
                        this.splitCmd[i + 1] = this.splitCmd[i + 1].slice(this.splitCmd[i + 1].lastIndexOf('<span>'), this.splitCmd[i + 1].lastIndexOf('</span>')) + `<div style="${this.cursor}" id='cursor'></div>` + this.splitCmd[i + 1].substr(this.splitCmd[i + 1].lastIndexOf('</span>'))
                        this.splitCmd[i] = this.splitCmd[i].replace(this.splitCmd[i].slice(this.splitCmd[i].indexOf('<div'), this.splitCmd[i].lastIndexOf('</span>')), '')
                        this.cursorPositionIndex = i + 1;
                        return;
                    }
            }
        },
        append(e) {
            if (e.keyCode > 64 && e.keyCode < 91) {
                let span = `<span>${e.key}<div style="${this.cursor}" id="cursor"></div></span>`;
                for (let i = 0; i < this.splitCmd.length; i++) {
                    if (this.splitCmd[i].includes("cursor")) {
                        if (i != 0) this.splitCmd.splice(i + 1, 0, span);
                        else this.splitCmd.push(span);
                        this.splitCmd[i] = this.splitCmd[i].replace(
                            this.splitCmd[i].slice(
                                this.splitCmd[i].indexOf("<div"),
                                this.splitCmd[i].lastIndexOf("</span>")
                            ),
                            ""
                        );
                        this.cursorPositionIndex = i;
                        let str = this.cmd.split('')
                        str.splice(this.cursorPositionIndex, 0, e.key)
                        this.cmd = str.join('')
                        return;
                    }
                }
            }
        },
        backspace() {
            for (let i = 1; i < this.splitCmd.length; i++) {
                if (this.splitCmd[i])
                    if (this.splitCmd[i].includes("cursor")) {
                        this.splitCmd.splice(i, 1);
                        var str = this.cmd.split('');
                        str.splice(i-1, 1);
                        this.cmd = str.join('');
                        console.log(this.cmd);
                        this.splitCmd[i - 1] = this.splitCmd[i - 1].slice(this.splitCmd[i - 1].lastIndexOf('<span>'), this.splitCmd[i - 1].lastIndexOf('</span>')) + `<div style="${this.cursor}" id='cursor'></div>` + this.splitCmd[i - 1].substr(this.splitCmd[i - 1].lastIndexOf('</span>'))
                        this.cursorPositionIndex = i - 1;
                        return;
                    }
            }
        }
    },
}