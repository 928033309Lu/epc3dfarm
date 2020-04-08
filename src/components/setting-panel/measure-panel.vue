<template>
  <panel-container id="root" title="测量工具" icon="iconcelianggongju" class="measure-panel">
    <template v-slot:header>
      <div @click="clearMeasure()" class="clearDarw">清空</div>
    </template>
    <div class="content">
      <div class="tool">
        <div>工具</div>
        <div>
          <el-tooltip class="item" effect="dark" content="三角测量" placement="top">
            <span @click="onChangeTool(0)" :class="{activeCol: toolActiveArr[0]}"> <i class="iconfont iconsanjiaoceju"></i> </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="水平测量" placement="top">
            <span @click="onChangeTool(1)" :class="{activeCol: toolActiveArr[1]}"> <i class="iconfont iconshuipingceju"></i> </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="垂直测量" placement="top">
            <span @click="onChangeTool(2)" :class="{activeCol: toolActiveArr[2]}"> <i class="iconfont iconchuizhiceju"></i> </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="面积测量" placement="top">
            <span @click="onChangeTool(3)" :class="{activeCol: toolActiveArr[3]}"> <i class="iconfont iconmianji"></i> </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="高程剖面" placement="top">
            <span @click="onChangeTool(4)" :class="{activeCol: toolActiveArr[4]}"> <i class="iconfont iconpoumianxian"></i> </span>
          </el-tooltip>
        </div>
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

      toolActiveArr: [false, false, false, false, false]
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    //选择工具-测量工具
    onChangeTool (index) {
      // console.log(index);
      this.toolActiveArr = [false, false, false, false, false];
      this.toolActiveArr[index] = true;

      switch (index) {
        case 0:   //三角测量
          gwmap.mapControlManager.active('TrangleMeasure')
          break;
        case 1:   //长度测量
          gwmap.mapControlManager.active('measureLength')
          break;
        case 2:   //高度测量
          gwmap.mapControlManager.active('measreHeight')
          break;
        case 3:   //面积测量
          gwmap.mapControlManager.active('measureArea')
          break;
        case 4:   //剖面分析
          gwmap.mapControlManager.active('measureProfile')
          break;
        case 5:   //清空测量
          gwmap.mapControlManager.disactive("measure")
          break;
      }
    },
    //清空测量
    clearMeasure () {
      this.onChangeTool(5);
    },

  }
}
</script>

<style lang="scss" scoped>
@import './measure.scss';
#root {
  width: 100%;
  height: 100%;
}

</style>
