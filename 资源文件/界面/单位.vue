<script>
export default 视图.创建组件({
    组件: [],
    属性: ['单位配置'],
    数据: {
        默认图片: '/资源文件/图片/单位图标/xxicon.png'
    },
    挂载() {

    },
    方法: {
        加载默认图片() {
            this.$refs.单位图标.src = this.默认图片;
        }
    }
});
</script>

<template>
    <img ref="单位图标" :src="单位配置.图标" @error="加载默认图片" :title="单位配置.显示名">
</template>

<style scoped></style>