<template>
  <div id="root">
    <toolbar-button v-for="(item,i) in btnConfig" :key="'btn'+i" :name="item.name" :icon="item.icon" :summarySelected="summarySelectedBtn==='summary'" :selected="currentSetting===item.type" @click.native="switchModel(item.type)"></toolbar-button>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { MapToolBarBtns } from '@/config/biz-config'
import ToolbarButton from '@/components/toolbar-button.vue'
export default {
  props: {
    // btnSelected:{
    //   default:"default-panel"
    // }
  },
  components: {
    ToolbarButton
  },
  data () {
    return {
      // currentSelectedBtn: -1,
      summarySelectedBtn: -1,
      btnConfig: []
    }
  },
  computed: {
    ...mapState({
      currentSetting: state => state.app.currentSetting,
    })
  },
  watch: {
    // btnSelected(val){
    //   if(val && val.indexOf("-") != -1) {
    //     this.currentSelectedBtn = val.split("-")[0];
    //     // console.log(this.currentSelectedBtn)
    //   }
    // }
    currentSetting () {
      console.log(this.currentSetting)
    }
  },

  mounted () {
    this.btnConfig = MapToolBarBtns
  },

  methods: {
    init () {
      this.summarySelectedBtn = -1
    },
    switchModel (type) {
      if (type !== "summary") {
        // this.currentSelectedBtn = type;
        this.summarySelectedBtn = -1;
      } else {
        this.summarySelectedBtn = type;
      }

      if (type !== "measure" && type !== "plot") {
        gwmap.mapControlManager.disactive("measure");
        gwmap.mapControlManager.disactive("draw");
      }
      this.$emit("btnClicked", type)
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
