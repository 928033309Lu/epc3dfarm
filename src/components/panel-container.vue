<template>
  <div>
    <div class="panel-title">
      <div class="panel-title-text">
        <i :class="'iconfont '+icon"></i>
        {{title}}
      </div>
      <div class="header-group">
        <slot name="header"> </slot>
      </div>
    </div>
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// <panel-container id="root" title="图层" icon="iconzonglanxiangmu">
//   <template v-slot: header>
//       ...some html element
//   </template>
//   ...some html element
//   </panel - container >
export default {

  components: {

  },
  props: {
    "title": { default: "" },
    "icon": { default: "" }
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
.panel-title {
  user-select: none;
  width: 100%;
  height: 32px;
  background: rgba(52, 52, 57, 1);
  border-top: 1px solid rgba(0, 0, 0, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.8;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(240, 240, 240, 1);
  .panel-title-text {
    padding: 7px 15px;
    display: inline-block;
    i {
      padding: 0 2px 0 0;
    }
  }
}

.header-group {
  display: inline-block;
  position: absolute;
  right: 10px;
  height: 32px;
  line-height: 32px;
}
.panel-content {
  width: 100%;
  height: 100%;
}
</style>
