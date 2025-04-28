<script>
export default {
    components: 视图.加载组件(['触发编辑']),
    data() {
        return {};
    },
    methods: {

    }
}
</script>
<template>
    <footer class="菜单栏">
        <span href="javascript:void(0);" class="图标 设置按钮" title="地图设置"></span>
        <span href="javascript:void(0);" class="图标 图层按钮" title="显示图层"></span>
        <span href="javascript:void(0);" class="图标 路径点按钮" title="显示路径点"></span>
        <触发编辑 />
    </footer>
</template>

<style>
.菜单栏 {
    height: 22px;
    background: url(./资源文件/图片/底部背景.png) 0px -32px;
    position: relative;
    color: #FFF;
    padding-left: 72px;
    padding-right: 28px;
    padding-top: 10px;
    line-height: 32px;
    display: flex;
}

.菜单栏::before {
    position: absolute;
    left: 0px;
    top: 0px;
    display: block;
    content: "";
    width: 52px;
    height: 32px;
    background: url(/资源文件/图片/底部背景.png);
}

.菜单栏::after {
    position: absolute;
    top: 0px;
    right: 0px;
    display: block;
    content: "";
    width: 28px;
    height: 32px;
    background: url(/资源文件/图片/底部背景.png) -54px 0px;
}

.菜单栏>span,
.菜单栏>a {
    margin-right: 20px;
    user-select: none;
    cursor: pointer;
}

.菜单栏 .图标 {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: center;
}

.菜单栏 .btn-text {
    color: #AD8439;
    line-height: 18px;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
}

.设置按钮 {
    background-image: url(./资源文件/图片/图标/设置.png);
}

.路径点按钮 {
    background-image: url(./资源文件/图片/图标/路径点.png);
}

.图层按钮 {
    background-image: url(./资源文件/图片/图标/图层.png);
}
</style>
