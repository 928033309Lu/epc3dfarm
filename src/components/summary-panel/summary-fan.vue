<template>
  <div>
    <el-form class="fanData" label-position="right" label-width="120px" :model="data">
      <el-form-item label="机位海拔高度">
        <!-- <el-input ></el-input> -->
        <span class="el-input__inner"> {{data && data.turbineElevationRage}} </span>
      </el-form-item>
      <el-form-item label="项目容量">
        <span class="el-input__inner"> {{data && data.totalCapacity}} MW </span>
      </el-form-item>
    </el-form>

    <el-form class="fan" label-position="right" label-width="120px">
      <el-form-item>
        <span class="el-input__inner"> 机组配置1 </span>
      </el-form-item>
      <el-form-item label="机型">
        <span class="el-input__inner"> {{data && data.table[0].turbineModel}} </span>
      </el-form-item>
      <el-form-item label="轮毂高度">
        <span class="el-input__inner"> {{data && data.table[0].hubHeight}} m </span>
      </el-form-item>
      <el-form-item label="机组台数">
        <span class="el-input__inner"> {{data && data.table[0].modelCount}} 台 </span>
      </el-form-item>
      <el-form-item label="基础直径">
        <span class="el-input__inner"> {{data && data.table[0].baseDp}} m </span>
      </el-form-item>
      <el-form-item label="基础深度">
        <span class="el-input__inner"> {{data && data.table[0].baseDia}} m </span>
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
.fan /deep/ .el-form-item__label {
  padding: 0 10px !important;
}
</style>