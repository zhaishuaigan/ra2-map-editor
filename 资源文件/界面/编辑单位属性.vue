<script>
export default {
    props: ['属性', '注册名'],
    data() {
        return {
            属性数据: null,
        }
    },
    mounted() {
        // console.log(this.属性);
    },
    methods: {
        弹出修改属性对话框(属性) {
            this.$prompt('请输入属性值', `修改属性[${属性.属性名}]`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: `请输入[${属性.属性名}]的值`,
                inputValue: 属性.属性值
            }).then(async ({ value }) => {
                console.log(value);
                属性.属性值 = value;
                window.选择的地图.修改属性值(this.注册名, 属性.属性名, 属性.属性值);
                消息隧道.触发事件('属性被修改', [this.注册名, 属性.属性名, 属性.属性值]);
            }).catch(() => {
            })
        },
        删除属性(当前属性) {
            this.$confirm(`确定删除属性[${当前属性.属性名}]吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.单位属性列表 = this.单位属性列表.filter(属性 => 属性.属性名 != 当前属性.属性名);
                delete this.单位配置.属性[当前属性.属性名];
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch((e) => {
            })

        },
    }
}
</script>

<template>
    <div class="属性值">
        <span>{{ 属性.属性值 }}</span>
        <span v-if="属性.已修改" style="color: red">[默认值: {{ 属性.默认值 }}]</span>
        <span v-if="属性.新增" style="color: red;">[新增]</span>
        <el-button type="primary" class="修改按钮" @click="弹出修改属性对话框(属性, 编号)">修改</el-button>
        <el-button type="danger" class="删除按钮" @click="删除属性(属性, 编号)">删除</el-button>
    </div>

</template>

<style scoped>
.属性值 .修改按钮,
.属性值 .删除按钮 {
    margin-left: 10px;
    visibility: hidden;
}

.属性值:hover .修改按钮,
.属性值:hover .删除按钮 {
    visibility: visible;
}
</style>