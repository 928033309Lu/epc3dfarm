<template>
  <panel-container id="root" title="倒塔分析" icon="icondaotafenxi">
    <div class="content">
        <div class="sp">球半径</div>
        <div class="radio">
            <el-radio v-model="radio" label="1">1倍 (R+H)</el-radio>
            <el-radio v-model="radio" label="2">1.5倍 (R+H)</el-radio>
        </div>
    </div>
  </panel-container>
</template>

<script>
import PanelContainer from '@/components/panel-container.vue'

export default {
  components: {
    PanelContainer

  },
  data () {
    return {
        radio: ""
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
#root {
  width: 100%;
  height: 100%;
}
.content{
  display: flex;
  padding: 15px;
  color: rgba(244,244,244,1);
  font-size: 14px;
  .sp{
    margin-right: 10px;
  }
  .radio{
    display: flex;
    width: 100px;
    /deep/ .el-radio{
      margin-right: 10px !important;
    }
    /deep/ .el-radio__label{
      padding-left: 5px !important;
      color: rgba(244,244,244,1) !important;
    }
  }
}
</style>
