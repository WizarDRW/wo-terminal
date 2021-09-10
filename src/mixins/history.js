export default {
    data() {
        return {
            history: [],
            historyIndex: 1,
            historyCache: "",
        }
    },
    methods: {
        up() {
            if (this.historyIndex == 1) {
                this.historyCache = this.cmd;
            }
            if (this.historyIndex <= this.history.length) {
                this.cmd = this.history[this.history.length - this.historyIndex];
                this.historyIndex++;
            }
        },
        down() {
            this.historyIndex--;
            if (this.historyIndex > 0) {
                this.cmd = this.history[this.history.length - this.historyIndex];
            }
            if (this.historyIndex <= 0) {
                this.cmd = this.historyCache;
                this.historyIndex = 1;
            }
        },
    },
    computed: {
        comp_history: {
            get() {
                return this.history;
            },
            set(val) {
                this.history.push(val);
                this.$emit("update:modelValue", val);
            }
        }
    }
}