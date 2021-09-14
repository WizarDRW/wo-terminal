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
            type: [String, Number],
            default: 8,
        },
        cursorPosition: {
            type: Boolean,
            default: false
        },
        cursorSize: {
            type: [String, Number],
            default: 14
        }
    },
    data() {
        return {
            splitCmd: [
                `<span><div style="opacity: 50%;float: right;width: ${this.cursorWidth}px;height: ${this.cursorSize}px;background: ${this.cursorColor};display: inline;" id='cursor'></div></span>`
            ],
            cursor: `opacity: 50%;float: right;width: ${this.cursorWidth}px;height: 14px;background: #21f838;display: inline;`,
            marginLeft: this.cursorWidth,
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
                        this.splitCmd[i] = `<span style="margin-left: -${this.marginLeft}px">` + (this.splitCmd[i].replace(this.splitCmd[i].slice(this.splitCmd[i].indexOf('<div'), this.splitCmd[i].lastIndexOf('</span>')), '')).slice(6, 7) + '</span>'
                        if (this.splitCmd[i + 1]) this.splitCmd[i + 1] = '<span>' + this.splitCmd[i + 1].slice(this.splitCmd[i + 1].indexOf('>')+1)
                        this.cursorPositionIndex = i;
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
                        if(this.splitCmd[i+1].includes('margin-left')) this.splitCmd[i + 1] = '<span>' + this.splitCmd[i + 1].slice(this.splitCmd[i + 1].indexOf('>')+1)
                        this.splitCmd[i + 1] = this.splitCmd[i + 1].slice(this.splitCmd[i + 1].lastIndexOf('<span>'), this.splitCmd[i + 1].lastIndexOf('</span>')) + `<div style="${this.cursor}" id='cursor'></div>` + this.splitCmd[i + 1].substr(this.splitCmd[i + 1].lastIndexOf('</span>'))
                        if (this.splitCmd[i + 2]) this.splitCmd[i + 2] = `<span style="margin-left: -${this.marginLeft}px;">` + (this.splitCmd[i + 2].replace(this.splitCmd[i + 2].slice(this.splitCmd[i + 2].indexOf('<div'), this.splitCmd[i + 2].lastIndexOf('</span>')), '')).slice(6, 7) + '</span>'
                        this.splitCmd[i] = this.splitCmd[i].replace(this.splitCmd[i].slice(this.splitCmd[i].indexOf('<div'), this.splitCmd[i].lastIndexOf('</span>')), '')
                        this.cursorPositionIndex = i;
                        return;
                    }
            }
        },
        append(e) {
            if ((e.keyCode > 64 && e.keyCode < 91) || e.keyCode == 32 || (e.keyCode > 48 && e.keyCode < 57)) {
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
                        str.splice(i - 1, 1);
                        this.cmd = str.join('');
                        this.splitCmd[i - 1] = this.splitCmd[i - 1].slice(this.splitCmd[i - 1].lastIndexOf('<span>'), this.splitCmd[i - 1].lastIndexOf('</span>')) + `<div style="${this.cursor}" id='cursor'></div>` + this.splitCmd[i - 1].substr(this.splitCmd[i - 1].lastIndexOf('</span>'))
                        this.cursorPositionIndex = i - 1;
                        return;
                    }
            }
        },
        caretFocus() {
            this.$refs.cmd.focus();
        }
    },
}