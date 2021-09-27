export default {
    props: {
        cmd_prefix: {
            type: String,
            default: "$"
        }
    },
    data() {
        return {
            cmd: "",
        }
    },
    methods: {
        async enter() {
            if (this.cmd.length > 0)
                this.comp_history = this.cmd;
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
    }
}