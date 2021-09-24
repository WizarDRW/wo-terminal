export default {
    data() {
        return {
            loader: false,
            loaderStartWall: '[',
            loaderEndWall: ']',
            loaderChar: '#',
            loaderWidth: '100'
        }
    },
    computed: {
        loading: {
            get() {
                return this.loader;
            },
            set(val) {
                this.loader = val;
            }
        }
    }
}