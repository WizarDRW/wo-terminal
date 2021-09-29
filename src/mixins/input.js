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
            prefix_show: true
        }
    },
    methods: {
        async enter() {
            if (this.cmd.length > 0) {
                this.prefix_show = false;
                this.comp_history = this.cmd;
                this.cmd = "";
            }
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