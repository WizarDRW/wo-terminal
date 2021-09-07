<template lang="">
  <div id="cmd" @click="$refs.cmd.focus()">
    <slot></slot>
    <span>$ {{c_cmd}}</span>
    <div id="cursor"></div>
    <input ref="cmd" v-model="cmd" type="text" @keyup.enter="enter" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      cmd: null,
    };
  },
  methods: {
    enter() {
      console.log("Girdim");
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
<style scoped>
span {
  float: left;
  padding-left: 3px;
  white-space: pre;
}
#cursor {
  float: left;
  width: 5px;
  height: 14px;
  background: #21f838;
}
input {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>