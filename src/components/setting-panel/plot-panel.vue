<template>
  <panel-container id="root" title="标绘板" icon="iconhuizhigongju" class="measure-panel">
    <template v-slot:header>
      <div @click="onChangeDraw(4)" class="clearDarw">清空</div>
    </template>
    <div class="content">
      <div class="tool">
        <div>工具</div>
        <div>
          <el-tooltip class="item" effect="dark" content="绘制点" placement="top">
            <span @click="onChangeDraw(0)" :class="{activeCol: drawActiveArr[0]}"> <i class="iconfont icondingwei"></i> </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="绘制线" placement="top">
            <span @click="onChangeDraw(1)" :class="{activeCol: drawActiveArr[1]}"> <i class="iconfont iconlujing"></i> </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="绘制面" placement="top">
            <span @click="onChangeDraw(2)" :class="{activeCol: drawActiveArr[2]}"> <i class="iconfont iconquyu"></i> </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="绘制箭头" placement="top">
            <span @click="onChangeDraw(3)" :class="{activeCol: drawActiveArr[3]}"> <i class="iconfont iconjiantou"></i> </span>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" content="清空标绘" placement="top"> -->
          <!-- <span @click="onChangeDraw(4)" :class="{activeCol: drawActiveArr[4]}"> <i class="iconfont iconxiangpica"></i> </span> -->
          <span style="cursor: initial;"> </span>
          <!-- </el-tooltip> -->
        </div>
      </div>
      <div class="tool tool-color">
        <div>颜色</div>
        <div>
          <div @click="onChangeColor('rgba(255,0,0,1)' ,0)" :class="{activeCol: colorActiveArr[0]}"><span class="colorBg red"></span></div>
          <div @click="onChangeColor('rgba(255,0,216,1)' ,1)" :class="{activeCol: colorActiveArr[1]}"><span class="colorBg pink"></span></div>
          <div @click="onChangeColor('rgba(255,234,0,1)' ,2)" :class="{activeCol: colorActiveArr[2]}"><span class="colorBg yellow"></span></div>
          <div @click="onChangeColor('rgba(0,174,255,1)' ,3)" :class="{activeCol: colorActiveArr[3]}"><span class="colorBg blue"></span></div>
          <div @click="onChangeColor('rgba(0,255,42,1)' ,4)" :class="{activeCol: colorActiveArr[4]}"><span class="colorBg green"></span></div>
        </div>
      </div>
      <div class="tool-opacity">
        <div>透明度</div>
        <el-slider @change="sliderChange" v-model="value" :show-input-controls="false" :show-tooltip="false" input-size="mini" :disabled="disabledSlider" show-input>
        </el-slider>
        <span class="danwei">%</span>
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
      disabledSlider: false,
      drawActiveArr: [false, false, false, false, false],
      colorActiveArr: [false, false, false, false, false],
      value: 100,
      drawOptions: {},
      nextTabObj: {
        color: "",
        opacity: 100,
        name: ""
      }
    }
  },
  computed: {

  },
  watch: {

    nextTabObj: {
      deep: true,
      handler (newVal) {
        if (newVal.name && newVal.color && newVal.opacity) {

          if (newVal.opacity != 100) {
            var opaCol = (newVal.opacity / 100);
            var num = "," + opaCol;
            var opacityColor = newVal.color.replace(/,1/, num);
            this.drawOptions.color = opacityColor;
          } else {
            this.drawOptions.color = newVal.color;
          }

          if (this.nextTabObj.color == "rgba(255,0,0,1)") {
            this.drawOptions.url = "/static/red.png";
          } else if (this.nextTabObj.color == "rgba(255,0,216,1)") {
            this.drawOptions.url = "/static/purpel.png";
          } else if (this.nextTabObj.color == "rgba(255,234,0,1)") {
            this.drawOptions.url = "/static/yellow.png";
          } else if (this.nextTabObj.color == "rgba(0,174,255,1)") {
            this.drawOptions.url = "/static/blue.png";
          } else if (this.nextTabObj.color == "rgba(0,255,42,1)") {
            this.drawOptions.url = "/static/green.png";
          }

          if (newVal.name == "dian") {
            gwmap.mapControlManager.active("drawBillboard", this.drawOptions);
          }
          else if (newVal.name == "xian") {
            gwmap.mapControlManager.active("drawTerrianPolyline", this.drawOptions);
          }
          else if (newVal.name == "mian") {
            gwmap.mapControlManager.active("drawTerrianPolygon", this.drawOptions);
          }
          else if (newVal.name == "jiantou") {
            gwmap.mapControlManager.active("drawTerrianStriaghtArrow", this.drawOptions);
          }
          else if (newVal.name == "clear") {
            gwmap.mapControlManager.disactive("draw");
            this.init();
          }
        }
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    init () {
      this.nextTabObj = {
        color: "",
        opacity: 100,
        name: ""
      }
      this.value = 100;
    },
    detaultColor () {
      this.nextTabObj.color = "rgba(255,0,0,1)";
      this.colorActiveArr = [true, false, false, false];
    },
    //选择工具，绘制板
    onChangeDraw (index) {
      // console.log(index);
      this.drawActiveArr = [false, false, false, false];
      if (index >= 4) {
        this.colorActiveArr = [false, false, false, false];
      } else {
        this.drawActiveArr[index] = true;
      }
      this.nextTabObj.name = "";
      this.disabledSlider = false;
      this.detaultColor();
      switch (index) {
        case 0:   //点
          this.value = 100;
          this.disabledSlider = true;
          this.nextTabObj.name = "dian";
          this.drawOptions = {
            url: '/static/red.png',
            scale: 1,
            color: 'rgba(110,220,235,0.5)'
          }

          break;
        case 1:   //线
          this.nextTabObj.name = "xian";
          this.drawOptions = {
            color: 'rgba(110,220,235,0.5)',
            width: 3
          }

          break;
        case 2:   //面
          this.nextTabObj.name = "mian";
          this.drawOptions = {
            color: 'rgba(110,220,235,0.5)',
          }

          break;
        case 3:   //箭头
          this.nextTabObj.name = "jiantou";
          this.drawOptions = {
            color: 'rgba(110,220,235,0.5)',
          }
          break;
        case 4:   //橡皮
          this.nextTabObj.name = "clear";

          break;

      }
    },
    //选择颜色
    onChangeColor (typeColor, index) {

      this.colorActiveArr = [false, false, false, false, false];
      this.colorActiveArr[index] = true;
      this.nextTabObj.color = typeColor;
    },
    //选择透明度
    sliderChange (val) {
      // console.log(val)
      this.nextTabObj.opacity = val;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./measure.scss";
#root {
  width: 100%;
  height: 100%;
}
</style>
