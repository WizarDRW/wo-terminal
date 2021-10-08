<template>
  <cursor
    v-model="c_cmd"
    :cursorColor="cursorColor"
    :cursorInterval="cursorInterval"
    :cursorWidth="cursorWidth"
    :cursorPosition="cursorPosition"
  >
    <h1>{{ title }}</h1>
    <span v-for="(item, index) in c_cmd" :key="index"
      >$ {{ item.cmd }}
      <div>{{ item.response }}</div>
      <br />
    </span>
  </cursor>
</template>
<script>
import Cursor from "./Cursor.vue";
import history from "../mixins/history";
import commands from "../utils/staticCommands";
import { Default } from '../library/default';
const def = new Default();
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
      default: 8,
    },
    cursorPosition: {
      type: Boolean,
      default: false,
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
      async set(val) {
        var data = {
          cmd: val,
          response: ""
        }
        this.cmds.push(data)
        data.response = (await def.response())[0].response
      },
    },
  },
};
</script>
<style scoped>
span {
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