<template>
  <el-form class="fanData" label-position="right" label-width="115px">
    <el-form-item label="主变型号1">
      <!-- <el-input ></el-input> -->
      <span class="el-input__inner"> {{data && data.transformers[0]}} </span>
    </el-form-item>
    <el-form-item label="主变型号2">
      <span class="el-input__inner"> {{data && data.transformers[1]}} </span>
    </el-form-item>
    <el-form-item label="升压站尺寸">
      <span class="el-input__inner"> {{data && data.size}} </span>
    </el-form-item>
    <el-form-item label="设计标高">
      <span class="el-input__inner"> {{data && data.elevation}} m </span>
    </el-form-item>
    <el-form-item label="电压">
      <span class="el-input__inner">
        {{data && data.lv}}
        <span class="iconBox"> <span> <span><span class="sp1"></span></span> <span><span class="sp2"></span></span> </span> </span>
        {{data && data.hv}}</span>
    </el-form-item>
    <el-form-item label="接入点水平距离">
      <span class="el-input__inner"> {{data && data.disToGrid}} </span>
    </el-form-item>
  </el-form>
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
.iconBox {
  display: inline-block;
  width: 30px;
  position: relative;
  left: 7px;
  & > span {
    position: absolute;
    top: -18px;
    left: 0;
    & > span {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1.5px solid rgba(244, 244, 244, 1);
      position: relative;
    }
    & > span:nth-of-type(2) {
      left: -10px;
    }
    .sp1,
    .sp2 {
      position: absolute;
      top: 4px;
      height: 1px;
      width: 5px;
      border-top: 1.5px solid rgba(244, 244, 244, 1);
    }
    .sp1 {
      left: -5px;
    }
    .sp2 {
      right: -5px;
    }
  }
}
</style>