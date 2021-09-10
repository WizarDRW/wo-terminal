<template>
  <cursor v-model="c_cmd">
    <h1>{{ title }}</h1>
    <span v-for="(item, index) in c_cmd" :key="index">$ {{ item }}</span>
  </cursor>
</template>
<script>
import Cursor from "./Cursor.vue";
import history from '../mixins/history'
export default {
  mixins: [history],
  components: {
    Cursor,
  },
  props: {
    title: {
      type: String,
      default: "WO",
    },
  },
  data() {
    return {
      cmds: [],
    };
  },
  methods: {},
  computed: {
    c_cmd: {
      get() {
        return this.cmds;
      },
      set(val) {
        this.cmds.push(val);
      },
    },
  },
};
</script>
<style scoped>
span {
  display: block;
  word-wrap: break-word;
  white-space: pre;
}
h1 {
  font-family: "Press Start 2P";
  white-space: pre;
  font-size: 100px;
  text-align: center;
}
</style>