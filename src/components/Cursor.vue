<template lang="">
  <div id="cmd" ref="cmd" tabindex="0"
      @click="caretFocus()" 
      @keyup.enter="enter"
      @keydown.tab="tab"
      @keydown.up="up"
      @keydown.down="down"
      @blur="caretBlur"
      @keydown="append"
      @keydown.backspace="backspace"
      @keydown.esc="esc"
      @keydown.left="left"
      @keydown.right="right">
    <slot></slot>
    <span>{{cmd_prefix}} <span v-for="(item, index) in splitCmd" :key="index"><div v-html="item"></div></span></span>
  </div>
</template>
<script>
import history from "../mixins/history";
import caret from "../mixins/caret";
import input from "../mixins/input";
import loader from "../mixins/loader";
export default {
  mixins: [history, caret, input, loader],
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
  overflow: scroll;
  font-family: courier;
  font-size: 14px;
  background: black;
  color: #21f838;
  padding: 5px;
  text-align: left;
  height: 500px;
}
span {
  float: left;
  white-space: pre;
  display: flex;
}
</style>