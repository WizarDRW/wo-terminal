import { Default } from "../library/default";

const def = new Default();

export default {
    data() {
        return {
            history: [],
            historyIndex: 0,
            historyCache: "",
        }
    },
    methods: {
        up() {
            var cached = false;
            if (this.historyIndex == 0 && !cached) { this.historyCache = this.cmd; cached = true; }
            if (this.history.length > this.historyIndex) {
                this.historyIndex++;
                this.cmd = this.history[this.history.length - this.historyIndex];
                this.splitCmd = ['<span></span>']
                for (let i = 0; i < this.cmd.length; i++)
                    this.splitCmd.push(`<span>${this.cmd[i]}${this.cursorPosition && this.cursorPositionIndex == i ?
                        "<div style='" + this.cursor + "' id='cursor'></div>" :
                        this.cmd.length - 1 == i ?
                            "<div style='" + this.cursor + "' id='cursor'></div>"
                            : ""}</span>`)
            }
            this.caretInterval()
        },
        down() {
            this.historyIndex--;
            if (this.historyIndex > 0) this.cmd = this.history[this.history.length - this.historyIndex];
            if (this.historyIndex < 1) { this.cmd = this.historyCache; this.historyIndex = 0; }
            if (this.cmd) {
                this.splitCmd = []
                for (let i = 0; i < this.cmd.length; i++)
                    this.splitCmd.push(`<span>${this.cmd[i]}${this.cursorPosition && this.cursorPositionIndex == i ?
                        "<div style='" + this.cursor + "' id='cursor'></div>" :
                        this.cmd.length - 1 == i ?
                            "<div style='" + this.cursor + "' id='cursor'></div>"
                            : ""}</span>`)
            }
            else this.splitCmd = [`<span><div style="${this.cursor}" id="cursor"></div></span>`]
            this.caretInterval()
        },
    },
    computed: {
        comp_history: {
            get() {
                return this.history;
            },
            async set(val) {
                this.history.push(val);
                this.splitCmd = [
                    `<span><div style="${this.cursor}" id='cursor'></div></span>`
                ];
                this.prefix_show = await def.request(val);
                this.$emit("update:modelValue", val);
                this.historyIndex = 0;
                this.historyCache = "";
                var objDiv = document.getElementById("cmd");
                objDiv.scrollTop = objDiv.scrollHeight;
                this.caretInterval()
            }
        }
    }
}