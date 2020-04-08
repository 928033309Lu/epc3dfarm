<template>
    
        <el-form class="fanData" label-position="right" label-width="100px" >
            <el-form-item label="塔编号">
                <!-- <el-input ></el-input> -->
                <span class="el-input__inner"> {{detalisList && detalisList.towerID}} </span>
            </el-form-item>
            <el-form-item label="塔型">
                <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.towerModel}} </span>
            </el-form-item>
            <el-form-item label="塔类型">
                <span class="el-input__inner"> 
                    {{detalisList.properties && detalisList.properties.towerClass != 0 ? detalisList.properties.towerClass == 1 ? "耐张塔":"T接塔":"直线塔"}}
                </span>
            </el-form-item>
            <el-form-item label="呼高">
                <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.nominalHeight}} m </span>
            </el-form-item>
            <el-form-item label="设计标高">
                <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.elevation}} m </span>
            </el-form-item>
            <el-form-item label="线路编号">
                <span class="el-input__inner"> {{detalisList.properties && detalisList.properties.lineID && detalisList.properties.lineID[0]}} </span>
            </el-form-item>
            
        </el-form>
    
</template>
<script>
    export default {
        props: {
            "detalisList":{
                default: {
                    towerID: "",
                    // coordinate:[0,0],
                    properties:{}
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
        created (){
            
        },
        mounted () {
           
        },
        methods: {
            
        }
    }
</script>

<style lang="scss" scoped>
@import "./fan-details-data.scss";
  .fanData{
      margin-top: 20px;
  }
    
</style>