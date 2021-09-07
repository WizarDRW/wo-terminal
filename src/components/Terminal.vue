<template>
  <cursor v-model="c_cmd">
    <span v-for="(item, index) in c_cmd" :key="index">$ {{ item }}</span>
  </cursor>
</template>
<script>
import Cursor from "./Cursor.vue";
export default {
  components: {
    Cursor,
  },
  props: {},
  data() {
    return {
      cmd: null,
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
        console.log(val);
        this.cmds.push(val);
      },
    },
  },
};
</script>
<style scoped>
#cmd {
  font-family: courier;
  font-size: 14px;
  background: black;
  color: #21f838;
  padding: 5px;
  overflow: hidden;
  text-align: left;
}
span {
  display: block;
  word-wrap: break-word;
  white-space: pre;
}
</style>