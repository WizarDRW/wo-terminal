export default {
    data() {
        return {
            cmd: "",
        }
    },
    methods: {
        enter() {
            this.comp_history = this.cmd;
            this.cmd = "";
            this.splitCmd = [
                `<span><div style="${this.cursor}" id='cursor'></div></span>`
            ],
            this.historyIndex = 0;
            this.historyCache = "";
            var objDiv = document.getElementById("cmd");
            objDiv.scrollTop = objDiv.scrollHeight;
            this.caretInterval()
        },
        tab(e) {
            var TABKEY = 9;
            if (e.keyCode == TABKEY) {
                this.cmd += "     ";
                if (e.preventDefault) {
                    e.preventDefault();
                }
                return false;
            }
        },
        inputFocus() {
            this.$refs.cmd.focus();
            // this.cursor.display = "block";
        },
        inputBlur() {
            // this.cursor.display = "none";
        }
    }
}