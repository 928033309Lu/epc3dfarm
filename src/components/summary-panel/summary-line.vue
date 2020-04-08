<template>
  <div>
    <el-form class="fanData" label-position="right" label-width="90px">
      <el-form-item label="回路数">
        <!-- <el-input ></el-input> -->
        <span class="el-input__inner"> {{data && data.circuitCount}} </span>
      </el-form-item>
      <el-form-item label="导线类型">
        <span class="el-input__inner small"> {{data && data.wireType[0]}} <br /> {{data && data.wireType[1]}} </span>
      </el-form-item>
      <el-form-item label="线路总长度">
        <span class="el-input__inner"> {{data && data.wireLength}} m </span>
      </el-form-item>
      <el-form-item label="电压等级">
        <span class="el-input__inner"> 没字段 kv </span>
      </el-form-item>
    </el-form>
    <el-form class="fan lines" label-position="left" label-width="115px">
      <el-form-item label="">
        <span class="el-input__inner"> <span>单回路</span><span>双回路</span> </span>
      </el-form-item>
      <el-form-item label="耐张杆塔数量">
        <span class="el-input__inner"> <span>{{data && data.table[0].tensionTower }}</span><span>{{data && data.table[1].tensionTower }}</span> </span>
      </el-form-item>
      <el-form-item label="直线杆塔数量">
        <span class="el-input__inner"> <span>{{data && data.table[0].suspensionTower }}</span><span>{{data && data.table[1].suspensionTower }}</span> </span>
      </el-form-item>
      <el-form-item label="终端杆塔数量">
        <span class="el-input__inner"> <span>{{data && data.table[0].jointTower }}</span><span>{{data && data.table[1].jointTower }}</span> </span>
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
.lines .el-input__inner {
  display: flex;
  justify-content: space-around;
  & > span {
    display: inline-block;
    width: 70px;
    text-align: center;
  }
}
.lines /deep/ .el-form-item__label {
  padding: 0 0 0 10px !important;
}
.fanData /deep/ .small {
  font-size: 13px !important;
  padding: 0 0 0 5px;
  height: 40px !important;
  line-height: 19px !important;
}
.fanData /deep/ .el-form-item {
  margin-bottom: 5px !important;
}
</style>