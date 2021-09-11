<template lang="">
  <div id="cmd" @click="inputFocus()">
    <slot></slot>
    <span>$ <span v-for="(item, index) in splitCmd" :key="index"><span v-html="item"></span></span></span>
    <input 
      ref="cmd" 
      v-model="cmd" 
      type="text" 
      @keyup.enter="enter"
      @keydown.tab="tab"
      @keydown.up="up"
      @keydown.down="down"
      @blur="inputBlur"
      @keydown="append"
      @keydown.backspace="backspace"
      @keydown.left="left"
      @keydown.right="right" />
  </div>
</template>
<script>
import history from "../mixins/history";
import caret from "../utils/caret";
export default {
  mixins: [history, caret],
  data() {
    return {
      cmd: "",
    };
  },
  methods: {
    enter() {
      this.comp_history = this.cmd;
      this.cmd = null;
      this.historyIndex = 1;
      this.historyCache = "";
      var objDiv = document.getElementById("cmd");
      objDiv.scrollTop = objDiv.scrollHeight;
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
      this.cursor.display = "block";
    },
    inputBlur() {
      this.cursor.display = "none";
    }
  },
  computed: {
    c_cmd: {
      get() {
        return this.cmd;
      },
      set(val) {
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
  display: flex;
}
input {
  font-family: courier;
  font-size: 14px;
  color: #21f838;
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  caret-color: #21f838;
  white-space: pre-wrap;
  width: 0;
  height: 0;
}
input:focus {
  border: 0;
  outline: none;
}
</style>