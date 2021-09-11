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
    },
    data() {
        return {
            splitCmd: [
                `<span><div style="position: absolute;opacity: 50%;float: left;width: 8px;height: 14px;background: ${this.cursorColor};display: inline;" id='cursor'></div></span>`
            ],
            cursor: `position: absolute;opacity: 50%;float: left;width: 8px;height: 14px;background: #21f838;display: inline;`
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
                        return;
                    }
            }
        },
        append(e) {
            if (e.keyCode > 64 && e.keyCode < 91) {
                var span = `<span>${e.key}<div style="${this.cursor}" id="cursor"></div></span>`;
                for (let i = 0; i < this.splitCmd.length; i++) {
                    if (this.splitCmd[i].includes("cursor")) {
                        if (i != 0) this.splitCmd.splice(i+1, 0, span);
                        else this.splitCmd.push(span);
                        this.splitCmd[i] = this.splitCmd[i].replace(
                            this.splitCmd[i].slice(
                                this.splitCmd[i].indexOf("<div"),
                                this.splitCmd[i].lastIndexOf("</span>")
                            ),
                            ""
                        );
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
                        this.splitCmd[i - 1] = this.splitCmd[i - 1].slice(this.splitCmd[i - 1].lastIndexOf('<span>'), this.splitCmd[i - 1].lastIndexOf('</span>')) + `<div style="${this.cursor}" id='cursor'></div>` + this.splitCmd[i - 1].substr(this.splitCmd[i - 1].lastIndexOf('</span>'))
                    }
            }
        }
    },
}