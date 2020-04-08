<template>

  <el-form class="fanData" label-position="right" label-width="120px">
    <el-form-item label="导线类型">
      <!-- <el-input ></el-input> -->
      <span class="el-input__inner inner1"> {{detalisList.properties && detalisList.properties.wiremodel}} </span>
    </el-form-item>
    <el-form-item label="所属回路">
      <span class="el-input__inner"> {{detalisList && detalisList.circuitID}} </span>
    </el-form-item>
    <el-form-item label="线路级别">
      <span class="el-input__inner">
        {{detalisList.properties && detalisList.properties.lineClass==0 ? "主线" : "支线"}} </span>
    </el-form-item>
    <el-form-item label="长度">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.length}} m </span>
    </el-form-item>
    <el-form-item label="双回路段名称">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.doubleName}} </span>
    </el-form-item>
    <el-form-item label="串联风机数量">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.turbineCount}} 个 </span>
    </el-form-item>
    <el-form-item label="串联风机容量">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.capacity}} </span>
    </el-form-item>
    <el-form-item label="串联风机编号">
      <el-tooltip class="item" effect="dark" :content="detalisList.turbines.length>1 && detalisList.turbines.join(',')" placement="top">
        <span class="el-input__inner inner1">
          <span v-for="(item,index) of detalisList.turbines" :key="index">
            {{item}} <span v-if="index!=detalisList.turbines.length-1">,</span>
          </span>
        </span>
      </el-tooltip>
    </el-form-item>
  </el-form>

</template>
<script>
export default {
  props: {
    "detalisList": {
      default: {
        properties: {},
        turbines: []
      }
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
@import "./fan-details-data.scss";
.fanData /deep/ .el-form-item {
  margin-bottom: 5px !important;
}
.fanData .inner1 {
  padding: 0 0 0 10px;
  // font-size: 13px !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>