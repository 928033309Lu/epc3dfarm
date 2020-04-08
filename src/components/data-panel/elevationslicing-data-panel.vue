<template>
  <div id="root">
    <div class="title">
      高程剖面
      <i class="iconfont iconcha" @click="close"></i>
    </div>
    <elevation-slicing ref="elevPanel" :showContent="true"></elevation-slicing>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import ElevationSlicing from '@/components/elevation-slicing/index.vue'

export default {
  components: { ElevationSlicing },
  props: {
    type: {
      default: null
    }
  }, data () {
    return {
    }
  },
  computed: {
    ...mapState({
      profilePoints: state => state.app.profilePoints
    })
  },
  watch: {
    profilePoints () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (!this.$refs.elevPanel || !this.profilePoints) return
      this.$refs.elevPanel.setData(this.profilePoints)
    },
    close () {
      this.$emit('close', this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  position: fixed;
  left: 315px;
  right: 0;
  bottom: 30px;
  height: 196px;
  background: rgba(74, 74, 82, 1);
  border-top: 1px solid rgba(0, 0, 0, 1);
  // border-left: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.85;

  .title {
    height: 32px;
    background: rgba(52, 52, 57, 0.8);
    line-height: 32px;
    padding: 0 11px;
    font-size: 14px;
    color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
    i {
      float: right;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .main {
    flex: 1;
    padding: 10px 10px 15px;
  }
}
</style>
