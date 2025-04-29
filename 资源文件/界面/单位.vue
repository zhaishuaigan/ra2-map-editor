<script>
export default {
    props: ['单位配置'],
    data() {
        return {
            默认图片: '/资源文件/图片/单位图标/xxicon.png',
            单位状态: {},
        };
    },
    mounted() {
        this.单位状态 = {
            已被修改: this.单位配置.已被修改,
            不能建造: this.单位配置.不能建造,
            新添加: this.单位配置.新添加
        };
    },
    methods: {
        加载默认图片() {
            this.$refs.单位图标.src = this.默认图片;
        },
        点击单位图标() {
            消息隧道.触发事件('编辑单位', this.单位配置.注册名);
        }
    }
};
</script>

<template>
    <el-dropdown trigger="contextmenu">
        <div class="单位图标显示框" :class="单位状态">
            <img ref="单位图标" :key="单位配置.注册名" :src="单位配置.图标" @error="加载默认图片" :title="单位配置.显示名" @click="点击单位图标" alt="" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="点击单位图标">编辑属性</el-dropdown-item>
                <el-dropdown-item>复制单位</el-dropdown-item>
                <el-dropdown-item>删除单位</el-dropdown-item>
                <el-dropdown-item @click="单位配置.属性.TechLevel = 11">
                    禁止建造
                    <span v-if="单位配置.属性.TechLevel == 11" style=" padding-left: 5px;">✔</span>
                </el-dropdown-item>
                <el-dropdown-item @click="单位配置.属性.TechLevel = 1">
                    允许建造
                    <span v-if="单位配置.属性.TechLevel != 11" style=" padding-left: 5px;">✔</span>
                </el-dropdown-item>
                <el-dropdown-item>取消</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>

<style scoped>
.单位图标 {
    position: relative;

}

.已被修改::before,
.新添加::before,
.不能建造::before {
    position: absolute;
    right: 3px;
    top: 3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    content: '';
    box-shadow: 0 0 3px 1px #999999;
    color: #FFFFFF;
    font-size: 10px;
    text-align: center;
    line-height: 12px;
}

.单位图标显示框.已被修改::before {
    background-color: green;
    /* content: '修'; */
}


.单位图标显示框.不能建造::before {
    background-color: #999999;
    /* content: '禁'; */
}

.单位图标显示框.新添加::before {
    background-color: red;
    /* content: '新'; */
}
</style>