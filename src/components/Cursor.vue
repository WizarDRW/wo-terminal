<template lang="">
  <div id="cmd" @click="inputFocus()" 
      @keyup.enter="enter"
      @keydown.tab="tab"
      @keydown.up="up"
      @keydown.down="down"
      @blur="inputBlur"
      @keydown="append"
      @keydown.backspace="backspace"
      @keydown.left="left"
      @keydown.right="right">
    <slot></slot>
    <span>$ <span v-for="(item, index) in splitCmd" :key="index"><span v-html="item"></span></span></span>
    <input 
      ref="cmd"
      type="text"  />
  </div>
</template>
<script>
import history from "../mixins/history";
import caret from "../mixins/caret";
import input from "../mixins/input";
export default {
  mixins: [history, caret, input],
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