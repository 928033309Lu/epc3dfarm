<template>
  <panel-container id="root" title="地形分析" icon="icondixingfenxi">

    <div class="content">
      <div>
        <span>分析半径</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>km</span>
      </div>
      <div>
        <span class="sp">显示分割平面</span>
        <el-checkbox v-model="checked"></el-checkbox>
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
      options: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '6',
        label: '6'
      }],
      value: '3',
      checked: false
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
.content /deep/ .el-input__inner {
  height: 25px !important;
  line-height: 25px !important;
  width: 80px !important;
  background: rgba(0, 0, 0, 0) !important;
  border-radius: inherit !important;
  padding: 0 0 0 10px !important;
  border: 1px solid rgba(240, 240, 240, 0.8) !important;
  color: rgba(240, 240, 240, 1) !important;
}
.content /deep/ .el-input__inner::placeholder {
  font-size: 13px;
}
.content /deep/ .el-input__icon {
  line-height: 25px !important;
}
.content {
  padding: 20px 0 0 0;
  color: rgba(244, 244, 244, 1);
  font-size: 14px;
  line-height: 25px;
  & > div {
    display: flex;
    padding: 0 15px 10px 15px;
  }
  .el-select {
    margin: 0 20px;
  }
  .sp {
    margin: 0 10px 0 0;
  }
}
</style>
