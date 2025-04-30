<script>
export default {
    name: '删除属性',
    props: ['注册名', '属性'],
    data() {
        return {
            属性名: '',
            属性值: '',
        }
    },
    created() {
        this.属性名 = this.属性.属性名;
        this.属性值 = this.属性.属性值;
    },
    methods: {
        删除属性() {
            if (this.属性.新增) {
                // 如果是新增的属性，则直接删除
                this.$confirm(`确定删除属性[${this.属性名}]吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.选择的地图.删除属性(this.注册名, this.属性名);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    消息隧道.触发事件('刷新', [this.注册名]);
                }).catch((e) => {
                })
                return;
            }

            // 如果不是新增的属性, 则恢复默认值
            this.$confirm(`属性[${this.属性名}]有默认值, 此操作将恢复属性的默认值[${this.属性.默认值}], 确定要恢复默认值吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.选择的地图.删除属性(this.注册名, this.属性名);
                this.$message({
                    type: 'success',
                    message: '恢复默认值成功!'
                });
                消息隧道.触发事件('刷新', [this.注册名]);
            }).catch((e) => {
            })

        }

    }
}
</script>

<template>
    <el-button type="danger" class="删除按钮" size="small" @click="删除属性">删除</el-button>
</template>

<style></style>