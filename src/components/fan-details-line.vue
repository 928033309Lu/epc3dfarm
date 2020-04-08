<template>
    
    <div class="line-content">
        <div class="mark"><span></span><span :style="{width:width+'px'}">{{title}}</span><span></span></div>
        <div class="line">
            <div class="content">
                <slot ></slot>
            </div>
        </div>
    </div>
    
</template>

<script>

    export default {
        props: {
            title: {
                default:"详情"
            },
            width: {
                default: 45
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
            onClose(){
                
                this.$emit("close");
            }
        }
    }
</script>

<style lang="scss" scoped>
    
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
    

</style>