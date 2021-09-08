<template lang="">
  <div id="cmd" @click="inputFocus()">
    <slot></slot>
    <span>$ 
    <input 
      ref="cmd" 
      v-model="cmd" 
      type="text" 
      @keyup.enter="enter"
      @keydown.tab="tab"
      @keydown.up="up"
      @keydown.down="down"
      @keydown.left="left"
      @keydown.right="right"
      @blur="inputBlur" />
      </span>
  </div>
</template>
<script>
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
      type: String,
      default: "5px",
    },
  },
  data() {
    return {
      cmd: "",
      history: [],
      historyIndex: 1,
      historyCache: "",
      interval: {},
    };
  },
  methods: {
    enter() {
      this.c_cmd = this.cmd;
      this.historyIndex = 1;
      this.historyCache = "";
      var objDiv = document.getElementById("cmd");
      objDiv.scrollTop = objDiv.scrollHeight;
    },
    tab(e) {
      var TABKEY = 9;
      if (e.keyCode == TABKEY) {
        this.cmd += "&emsp;";
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      }
    },
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
    inputFocus() {
      this.$refs.cmd.focus();
      this.cursor.display = "block";
      this.cursorIntervalFunction();
    },
    inputBlur() {
      clearInterval(this.interval);
      this.cursor.display = "none";
    },
  },
  computed: {
    c_cmd: {
      get() {
        return this.cmd;
      },
      set(val) {
        this.$emit("update:modelValue", val);
        this.history.push(val);
        this.cmd = null;
      },
    },
  },
};
</script>
<style scoped lang="scss">
#cmd {
  font-family: courier;
  font-size: 14px;
  background: black;
  color: #21f838;
  padding: 5px;
  text-align: left;
  height: 500px;
  overflow: scroll;
}
span {
  float: left;
  white-space: pre;
  width: 100%;
}
input {
  width: 98%;
  font-family: courier;
  font-size: 14px;
  color: #21f838;
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  caret-color: #21f838;
  white-space: pre-wrap;
}
input:focus {
  border: 0;
  outline: none;
}
</style>