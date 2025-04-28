<script>
import 消息隧道 from '../类库/消息隧道.mjs';
export default {
    components: 视图.加载组件(['地图展示区域', '菜单栏', '右侧工具栏', '选择项目']),
    data() {
        return {};
    },
    mounted() {
        消息隧道.数据服务(this);
        消息隧道.事件服务(this);
    },
    methods: {}
};
</script>

<template>
    <main>
        <地图展示区域 />
        <菜单栏 />
    </main>
    <右侧工具栏 />
    <选择项目 />
</template>

<style></style>
