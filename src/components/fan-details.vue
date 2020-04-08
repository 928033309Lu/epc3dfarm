<template>
    <div class="fan-details" :style="{left:positionX+'px',top:positionY+'px'}" >
        <div class="header"> <span>{{title}}</span> <slot name="header"></slot> <span @click="onClose" class="close"> × </span> </div>
        <!-- 内框线组件 -->
        <fan-details-line>
            <slot name="content"></slot>
        </fan-details-line>
    </div>
</template>

<script>
    import fanDetailsLine from "./fan-details-line.vue"
    export default {
        props: {
            "title": { 
                default: "风机" 
            },
            "positionX":{
                default: 400
            },
            "positionY":{
                default: 200
            },
            
        },
        components: {
            fanDetailsLine
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
            onClose(){
                
                this.$emit("close");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fan-details{
        position: fixed;
        z-index: 1009;
        width: 330px;
        height: 350px;
        background:rgba(74,74,82,0.8);
        border:1px solid rgba(0,0,0,0.8);
        color: rgba(255,255,255,0.8);
       
        .header{
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
            background:rgba(52,52,57,0.8);
            border-bottom:1px solid rgba(0,0,0,0.8);
            position: relative;
            display: flex;
            justify-content: space-between;
            &>div{
                position: absolute;
                top: 4px;
                right: 50px;
                border: 1px solid rgba(255, 255, 255, 0.8);
                border-radius: 5px;
                height: 23px;
                line-height: 23px;
                width: 80px;
                text-align: center;
                font-size: 13px;
                cursor: pointer;
            }
            .close{
                width: 20px;
                text-align: right;
                display: inline-block;
                font-size: 21px;
                cursor: pointer;
            }
            .close:hover{
                 color: rgba(255,255,255,1);
            }
        }
        .line-content{
            padding: 10px 10px 20px 10px;
            position: relative;
            
            .line{
                border: 1px solid rgba(0,0,0,1);
                border-top: none;
                height: 270px
            }
        }
        .mark{
            display: flex;
            justify-content: space-between;
            &>span{
                border-bottom: 1px solid rgba(0,0,0,1);
            }
            &>span:nth-of-type(1){
                width: 10px;
            }
            &>span:nth-of-type(2){
                width: 45px;
                border: none;
                font-size: 14px;
                text-align: center;
                position: relative;
                top: 5px;
            }
            &>span:nth-of-type(3){
                flex: 1;
            }
        }
        .content{
            padding: 10px;
            font-size: 14px;
        }
    }

    .fanData /deep/ .el-form-item{
        margin-bottom: 10px !important;
    }
    .fanData /deep/ .el-form-item__content,.fanData /deep/ .el-form-item__label{
        line-height: 25px !important;
        color: rgba(255,255,255,0.8);
    }
    .fanData /deep/ .el-input__inner{
        line-height: 25px !important;
        height: 25px !important;
        background-color: rgba(52,52,57,0.8) !important;
        border: none !important;
        color:rgba(240,240,240,1) !important;
    }
    
</style>