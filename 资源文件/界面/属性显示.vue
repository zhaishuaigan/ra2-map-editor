<script>
export default {
    components: 视图.加载组件(['编辑属性', '删除属性', '添加属性']),
    props: ['注册名', '标题'],
    data() {
        return {
            属性列表: [],
        };
    },
    mounted() {
        var 单位 = window.选择的地图.获取单位(this.注册名);
        if (!单位 && 单位.注册名 == '未注册') {
            return;
        }
        this.属性列表 = 单位.获取属性列表();
        this.事件服务(this);
    },
    methods: {
        更新属性(注册名, 属性名, 属性值) {
            if (注册名 != this.注册名) {
                return;
            }
            this.$forceUpdate();
        }
    }
};
</script>
<template>
    <el-descriptions :column="1" :title="标题 ? 标题 : ''" border>
        <el-descriptions-item label="操作">
            <el-button-group>
                <添加属性 :注册名="注册名" />
            </el-button-group>
        </el-descriptions-item>
        <el-descriptions-item v-for="属性 of 属性列表">
            <template #label>
                <el-tooltip class="box-item" effect="dark" raw-content :content="属性.说明" placement="bottom">
                    {{ 属性.属性名 }}
                </el-tooltip>
            </template>
            <div class="属性值">
                <span style="padding: 0px 5px;">{{ 属性.属性值 }}</span>
                <span v-if="属性.已修改" style="color: red">[默认值: {{ 属性.默认值 }}]</span>
                <span v-if="属性.新增" style="color: red;">[新增]</span>
                <el-button-group class="编辑属性">
                    <编辑属性 :注册名="注册名" :属性="属性" />
                    <删除属性 :注册名="注册名" :属性="属性" />
                </el-button-group>
            </div>

        </el-descriptions-item>
    </el-descriptions>
</template>

<style scoped>
.编辑属性 {
    margin-left: 10px;
}

.el-descriptions {
    margin-bottom: 10px;
}
</style>