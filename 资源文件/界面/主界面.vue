<script>
export default 视图.创建组件({
    组件: ['地图展示区域', '菜单栏', '右侧工具栏'],
    数据: {
        一个测试文本变量: "测试文本"
    },
    方法: {
        弹窗: function () {
            ElementPlus.ElMessage('这是一个测试消息')
        }
    }
});
</script>

<template>
    <main>
        <v地图展示区域 />
        <v菜单栏 />
    </main>
    <v右侧工具栏 />
</template>

<style></style>
