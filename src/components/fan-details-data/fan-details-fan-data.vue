<template>

  <el-form class="fanData" label-position="right" label-width="90px">
    <el-form-item label="机型">
      <!-- <el-input v-model="detalisList.type" readonly></el-input> -->
      <span class="el-input__inner"> {{detalisList.type || ''}} </span>
    </el-form-item>
    <el-form-item label="所在回路">
      <span class="el-input__inner"> {{detalisList.towerID}} </span>
    </el-form-item>
    <el-form-item label="轮毂高度">
      <span class="el-input__inner"> {{detalisList.hubHeight}} m </span>
    </el-form-item>
    <el-form-item label="坐标">
      <span class="el-input__inner"> {{detalisList.xycoordinate[0]}} , {{detalisList.xycoordinate[1]}} </span>
    </el-form-item>
    <el-form-item label="标高">
      <span class="el-input__inner"> {{detalisList.elevation}} m </span>
    </el-form-item>
    <el-form-item label="基础面积">
      <span class="el-input__inner"> {{detalisList.baseDp}} m<sup>2</sup> </span>
    </el-form-item>
    <el-form-item label="基础挖方量">
      <span class="el-input__inner"> {{detalisList.baseDia}} m<sup>2</sup> </span>
    </el-form-item>
  </el-form>

</template>
<script>
export default {
  props: {
    "detalisList": {
      default: {
        type: "",
        towerID: "",
        hubHeight: "",
        xycoordinate: [],
        elevation: "",
        baseDp: "",
        baseDia: "",
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
</style>