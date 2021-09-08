<template lang="">
  <div id="cmd" @click="inputFocus()">
    <slot></slot>
    <span>$ {{c_cmd}}</span>
    <div :style="cursor"> </div>
    <input ref="cmd" v-model="cmd" type="text" @keyup.enter="enter" @keydown.tab="tab" @blur="inputBlur" />
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
      cursor: {
        display: "none",
        float: "left",
        width: "5px",
        height: "14px",
        background: this.cursorColor,
      },
      interval: {}
    };
  },
  methods: {
    enter() {
      this.c_cmd = this.cmd;
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
    inputFocus() {
      this.$refs.cmd.focus();
      this.cursorIntervalFunction();
    },
    inputBlur() {
      clearInterval(this.interval);
      this.cursor.display = "none"
    },
    cursorIntervalFunction() {
      this.interval = setInterval(() => {
        if (this.cursor.display == "block") this.cursor.display = "none";
        else this.cursor.display = "block";
      }, this.cursorInterval);
    },
  },
  computed: {
    c_cmd: {
      get() {
        return this.cmd;
      },
      set(val) {
        this.$emit("update:modelValue", val);
        this.cmd = null;
      },
    },
  },
};
</script>
<style scoped lang="scss">
span {
  float: left;
  padding-left: 3px;
  white-space: pre;
}
input {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>