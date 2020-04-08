<template>
  <div>
    <el-form class="fanData roads" label-position="right" label-width="120px">
      <div class="lines"><span></span><span></span></div>
      <el-form-item label="场内道路总长度">
        <span class="el-input__inner"> {{data && data.inFarmRoadLength}} m </span>
      </el-form-item>
      <el-form-item label="主路数量" class="padding">
        <span class="el-input__inner"> {{data && data.primaryRoadCount}} 条 </span>
      </el-form-item>
      <el-form-item label="支路数量" class="padding">
        <span class="el-input__inner"> {{data && data.secondaryRoadCount}} 条 </span>
      </el-form-item>
      <el-form-item label="进场道路长度">
        <span class="el-input__inner"> {{data && data.farEntryRoadLength}} m </span>
      </el-form-item>
      <el-form-item label="路面面积">
        <span class="el-input__inner"> {{data && data.totalArea}} m<sup>2</sup> </span>
      </el-form-item>
      <el-form-item label="路面材质">
        <span class="el-input__inner"> {{data && data.roadMaterial }} </span>
      </el-form-item>
      <el-form-item label="道路总挖方量">
        <span class="el-input__inner"> {{data && data.totalCut }} </span>
      </el-form-item>
      <el-form-item label="道路总填方量">
        <span class="el-input__inner"> {{data && data.totalFill }} </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    data: {

    }

  },
  components: {

  },
  data () {
    return {

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

  }
}
</script>

<style lang="scss" scoped>
@import "./summary.scss";
.roads {
  margin-top: 10px;
  position: relative;
}
.roads /deep/ .el-form-item {
  margin-bottom: 3px !important;
}
.roads /deep/ .el-form-item__label {
  padding: 0 10px 0 0 !important;
}

.lines {
  position: absolute;
  top: 25px;
  left: 30px;
  height: 50px;
  border-left: 1px dashed rgba(240, 240, 240, 1);
  & > span {
    position: absolute;
    left: 0;
    display: inline-block;
    width: 15px;
    border-top: 1px dashed rgba(240, 240, 240, 1);
  }
  & > span:nth-of-type(1) {
    top: 15px;
  }
  & > span:nth-of-type(2) {
    bottom: 0;
  }
}
</style>