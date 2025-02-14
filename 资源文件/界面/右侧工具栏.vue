<script>

export default 视图.创建组件({
    组件: ['小地图', '单位'],
    数据: {
        消息隧道: null
    },
    挂载() {
    },
    方法: {
    }

});
</script>
<style scoped>
.设置 {
    background: url(./资源文件/图片/控制按钮默认状态.png);
    height: 228px;
}

.设置 .金钱 {
    color: #FFFF00;
    font-size: 9px;
    text-align: center;
    height: 20px;
    line-height: 20px;
}

.设置 .按钮 {
    background: url(./资源文件/图片/控制按钮激活状态.png);
    background-position: -100% -100%;
    background-repeat: no-repeat;
    cursor: pointer;
}

.联盟与设置 {
    height: 25px;
    display: flex;
    flex-direction: row;
}

.联盟与设置 .联盟按钮 {
    height: 25px;
    width: 85px;
}

.联盟与设置 .联盟按钮:hover {
    background-position: 0px -20px;
}

.联盟与设置 .设置按钮 {
    height: 25px;
    width: 85px;
}

.联盟与设置 .设置按钮:hover {
    background-position: -85px -20px;
}

.小地图区域 {
    height: 114px;
    background-image: url(./资源文件/图片/控制按钮默认状态.png);
    background-position: 0px -45px;
    position: relative;
}

.维修和变卖 {
    height: 36px;
    display: flex;
    flex-direction: row;
    padding: 1px 52px 0px;
}

.维修和变卖 .维修按钮 {
    height: 36px;
    width: 32px;
}

.维修和变卖 .维修按钮:hover {
    background-position: -52px -160px;
}

.维修和变卖 .变卖按钮 {
    height: 36px;
    width: 32px;
}

.维修和变卖 .变卖按钮:hover {
    background-position: -84px -160px;
}

.列表切换 {
    height: 32px;
    display: flex;
    flex-direction: row;
    padding: 0px 20px;
}

.列表切换 .建筑按钮 {
    height: 32px;
    width: 32px;
}

.列表切换 .建筑按钮:hover,
.列表切换 .建筑按钮.选中 {
    background-position: -20px -196px;
}

.列表切换 .防御按钮 {
    height: 32px;
    width: 32px;
}

.列表切换 .防御按钮:hover,
.列表切换 .防御按钮.选中 {
    background-position: -52px -196px;
}

.列表切换 .步兵按钮 {
    height: 32px;
    width: 32px;
}

.列表切换 .步兵按钮:hover,
.列表切换 .战车按钮.选中 {
    background-position: -84px -196px;
}

.列表切换 .战车按钮 {
    height: 32px;
    width: 32px;
}

.列表切换 .战车按钮:hover,
.列表切换 .战车按钮.选中 {
    background-position: -116px -196px;
}


.单位列表 {
    flex: auto;
    background-image: url(./资源文件/图片/单位列表背景.png);
}

.底部 {
    height: 74px;
    background-image: url(./资源文件/图片/右下角背景.png);
}
</style>
<template>
    <section>
        <div class="设置">
            <div class="金钱">10000</div>
            <div class="联盟与设置">
                <div class="按钮 联盟按钮"></div>
                <div class="按钮 设置按钮"></div>
            </div>
            <div class="小地图区域">
                <小地图 />
            </div>
            <div class="维修和变卖">
                <div class="按钮 维修按钮"></div>
                <div class="按钮 变卖按钮"></div>
            </div>
            <div class="列表切换">
                <div class="按钮 建筑按钮 选中"></div>
                <div class="按钮 防御按钮"></div>
                <div class="按钮 步兵按钮"></div>
                <div class="按钮 战车按钮"></div>
            </div>
        </div>

        <div class="单位列表">
            <单位 :数据="{图标: ''}" />
        </div>
        <div class="底部">

        </div>
    </section>
</template>