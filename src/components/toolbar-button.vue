<template>
  <div :class="summarySelected?'selected-tool-btn-first':''">
    <button :class="selected?'tool-btn selected-tool-btn':'tool-btn'"><i :class="'map-btn-icon iconfont '+icon"></i>{{name}}</button>
  </div>
</template>

<script>

export default {

  components: {

  },
  props: {
    "name": { default: "" },
    "icon": { default: "" },
    "selected": {
      default: false
    },
    "summarySelected":{
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },

  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tool-btn {
  cursor: pointer;
  height: 50px;
  width: 44px;
  padding: unset;
  border-radius: unset;
  background: unset;
  border: unset;
  color: #ddd;
  font-size: 12px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  i {
    padding: 0 0 7px;
  }
}

.selected-tool-btn,
.tool-btn:hover {
  background: rgba(28, 28, 31, 1);
  border: 1px solid rgba(108, 108, 108, 1);
  outline: none;
}
.tool-btn:focus {
  // background: rgba(28, 28, 31, 1);
  // border: 1px solid rgba(108, 108, 108, 1);
  outline: none;
}
.selected-tool-btn-first:first-child .tool-btn{
  background: rgba(28, 28, 31, 1);
  border: 1px solid rgba(108, 108, 108, 1);
  outline: none;
}

</style>
