<template>

  <el-form class="fanData road" label-position="right" label-width="110px">
    <el-form-item label="道路级别">
      <!-- <el-input ></el-input> -->
      <span class="el-input__inner">
        {{detalisList.properties && detalisList.properties.roadClass == 0 ? "主路" : "主路"}} </span>
    </el-form-item>
    <el-form-item label="所属主路">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.mainRoad}} </span>
    </el-form-item>
    <el-form-item label="长度">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.length}} </span>
    </el-form-item>
    <el-form-item label="道路面积">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.area}} </span>
    </el-form-item>

    <el-form-item label="挖方量">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.cut}} </span>
    </el-form-item>
    <el-form-item label="填方量">
      <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.fill}} </span>
    </el-form-item>
  </el-form>

</template>
<script>
export default {
  props: {
    "detalisList": {
      default: {
        id: "",
        properties: {}
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
  updated () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./fan-details-data.scss";
.road {
  margin-top: 10px;
}
</style>