<script>
import 消息隧道 from '../类库/消息隧道.mjs';
export default 视图.创建组件({
    组件: ['小地图', '单位'],
    数据: {
        选中类型: "建筑",
        单位列表: [],
        显示不可建造单位: false,
        消息隧道: null
    },
    挂载() {
        消息隧道.监听数据('已选择地图', (数据) => {
            this.切换列表('建筑');
        });
    },
    方法: {
        async 切换列表(类型) {
            this.选中类型 = 类型;
            switch (类型) {
                case "建筑":
                    this.单位列表 = await window.选择的地图.获取建筑栏的单位();
                    break;
                case "防御":
                    this.单位列表 = await window.选择的地图.获取防御栏的单位();
                    break;
                case "步兵":
                    this.单位列表 = await window.选择的地图.获取步兵栏的单位();
                    break;
                case "战车":
                    this.单位列表 = await window.选择的地图.获取战车栏的单位();
                    break;
            }
        },
        显示选择项目() {
            消息隧道.触发事件({ 显示选择地图目录对话框: true });
        }
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
.列表切换 .步兵按钮.选中 {
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
    display: flex;
    flex-wrap: wrap;
    background-image: url(./资源文件/图片/单位列表背景.png);
    background-attachment: scroll;
    overflow: scroll;
    padding-left: 20px;
}

.单位图标 {
    width: 60px;
    height: 48px;
    overflow: visible;
    margin-left: 2px;
    margin-top: 2px;
}

.单位列表::-webkit-scrollbar {
    display: none;
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
                <div class="按钮 联盟按钮" @click="显示选择项目()"></div>
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
                <div class="按钮 建筑按钮" :class="[选中类型 === '建筑' ? '选中' : '']" @click="切换列表('建筑')"></div>
                <div class="按钮 防御按钮" :class="[选中类型 === '防御' ? '选中' : '']" @click="切换列表('防御')"></div>
                <div class="按钮 步兵按钮" :class="[选中类型 === '步兵' ? '选中' : '']" @click="切换列表('步兵')"></div>
                <div class="按钮 战车按钮" :class="[选中类型 === '战车' ? '选中' : '']" @click="切换列表('战车')"></div>
            </div>
        </div>

        <div class="单位列表">
            <template v-for="单位配置 in 单位列表">
                <div class="单位图标" v-if="单位配置.可以建造">
                    <单位 :单位配置="单位配置" />
                </div>
            </template>
        </div>
        <div class="底部">

        </div>
    </section>
</template>