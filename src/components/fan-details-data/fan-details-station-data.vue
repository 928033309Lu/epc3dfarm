<template>
    
        <el-form class="fanData station" label-position="right" label-width="115px" >
            <el-form-item label="主变型号1">
                <!-- <el-input ></el-input> -->
                <span class="el-input__inner"> 000 </span>
            </el-form-item>
            <el-form-item label="主变型号1">
                <span class="el-input__inner"> 000 </span>
            </el-form-item>
            <el-form-item label="升压站尺寸">
                <span class="el-input__inner"> 000 </span>
            </el-form-item>
            <el-form-item label="电压">
                <span class="el-input__inner"> 000 </span>
            </el-form-item>
            <el-form-item label="接入点水平距离">
                <span class="el-input__inner"> 000 </span>
            </el-form-item>
        </el-form>
    
</template>
<script>
    export default {
        props: {
           "detalisList":{
                type: Object,
                default:{}
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
    .station{
        margin-top: 35px;
    }
   
    
</style>