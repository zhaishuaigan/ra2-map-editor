<script>
import 消息隧道 from '../类库/消息隧道.mjs';
var 数据服务 = new 消息隧道("设置数据");
export default 视图.创建组件({
    组件: ['地图展示区域', '菜单栏', '右侧工具栏', '选择项目'],
    数据: {
    },
    挂载() {
        数据服务.监听消息((数据) => {
        });

    },
    方法: {}
});
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
