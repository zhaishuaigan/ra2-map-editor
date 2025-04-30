<script>
export default {
    components: 视图.加载组件(['小地图', '编辑单位对话框', '单位']),
    data() {
        return {
            选中类型: "建筑",
            搜索: '',
            单位列表: [],
            只显示可建造单位: true,
            显示其他建筑: false,
            其他建筑列表: [],
            消息隧道: null,
            显示单位编辑器: false,
            编辑单位: null,
            默认图片: '/资源文件/图片/单位图标/xxicon.png',
            加载更多: null,
        };
    },
    mounted() {
        消息隧道.事件服务(this);
        消息隧道.监听数据('已选择地图', async (数据) => {
            this.切换列表('建筑');
        });
    },
    methods: {
        刷新() {
            this.切换列表(this.选中类型);
        },
        async 显示搜索框() {
            // 使用element-plus弹出一个用户输入框
            this.$prompt('请输入搜索内容', '搜索单位', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                inputErrorMessage: '请输入正确的搜索内容',
            }).then(async ({ value }) => {
                this.搜索 = value;
                console.log(this.搜索);
                this.切换列表(this.选中类型);
            }).catch(() => { })

        },
        async 取消搜索() {
            this.搜索 = '';
            this.切换列表(this.选中类型);
        },
        async 切换列表(类型) {
            if (this.加载更多) {
                clearInterval(this.加载更多);
                this.加载更多 = null;
            }
            this.单位列表 = [];
            this.选中类型 = 类型;
            var 单位列表 = [];
            switch (类型) {
                case "建筑":
                    var 建筑列表 = await window.选择的地图.获取建筑栏的单位()
                    if (this.显示其他建筑) {
                        单位列表 = [...建筑列表, ...window.选择的地图.获取其他建筑()]
                    } else {
                        单位列表 = 建筑列表;
                    }
                    break;
                case "防御":
                    单位列表 = await window.选择的地图.获取防御栏的单位();
                    break;
                case "步兵":
                    单位列表 = await window.选择的地图.获取步兵栏的单位();
                    break;
                case "战车":
                    单位列表 = await window.选择的地图.获取战车栏的单位();
                    break;
            }
            if (this.搜索 != '') {
                console.log('搜索:', this.搜索);
                单位列表 = 单位列表.filter((单位) => {
                    console.log('搜索:', 单位.显示名, 单位.注册名);
                    return 单位.显示名.includes(this.搜索) || 单位.注册名.includes(this.搜索);
                });
            }

            if (this.只显示可建造单位) {
                单位列表 = 单位列表.filter((单位) => {
                    return 单位.可以建造;
                });
            }


            var 新增单位列表 = [];
            var 修改单位列表 = [];
            var 其他单位列表 = [];
            for (let 单位 of 单位列表) {
                if (单位.新添加) {
                    新增单位列表.push(单位);
                } else if (单位.已被修改) {
                    修改单位列表.push(单位);
                } else {
                    其他单位列表.push(单位);
                }
            }
            单位列表 = [...新增单位列表, ...修改单位列表, ...其他单位列表];

            if (单位列表.length < 30) {
                this.单位列表 = 单位列表;
                return;
            }


            this.加载更多 = setInterval(() => {
                for (let i = 0; i < 10; i++) {
                    if (单位列表.length) {
                        this.单位列表.push(单位列表.shift());
                    }
                }
            }, 100);
        },
        设置显示其他建筑() {
            this.显示其他建筑 = true;
            this.切换列表(this.选中类型);
        },
        设置不显示其他建筑() {
            this.显示其他建筑 = false;
            this.切换列表(this.选中类型);
        },
        设置只显示可建造单位() {
            this.只显示可建造单位 = true;
            this.切换列表(this.选中类型);
        },
        设置显示所有单位() {
            this.只显示可建造单位 = false;
            this.切换列表(this.选中类型);
        },
        显示编辑单位对话框(编辑单位) {
            this.显示单位编辑器 = true;
            this.编辑单位 = 编辑单位;
        },
        显示选择项目() {
            消息隧道.触发事件('显示选择地图目录对话框', true);
        }
    }

};
</script>

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
            <el-dropdown trigger="contextmenu">
                <div class="列表切换">
                    <div class="按钮 建筑按钮" :class="[选中类型 === '建筑' ? '选中' : '']" @click="切换列表('建筑')"></div>
                    <div class="按钮 防御按钮" :class="[选中类型 === '防御' ? '选中' : '']" @click="切换列表('防御')"></div>
                    <div class="按钮 步兵按钮" :class="[选中类型 === '步兵' ? '选中' : '']" @click="切换列表('步兵')"></div>
                    <div class="按钮 战车按钮" :class="[选中类型 === '战车' ? '选中' : '']" @click="切换列表('战车')"></div>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="设置只显示可建造单位">
                            只显示可建造单位
                            <el-icon v-if="只显示可建造单位 == true">
                                <Check />
                            </el-icon>
                        </el-dropdown-item>
                        <el-dropdown-item @click="设置显示所有单位">
                            显示全部单位
                            <el-icon v-if="只显示可建造单位 == false">
                                <Check />
                            </el-icon>
                        </el-dropdown-item>
                        <el-dropdown-item divided @click="设置不显示其他建筑">
                            不显示其他建筑
                            <el-icon v-if="显示其他建筑 == false">
                                <Check />
                            </el-icon>
                        </el-dropdown-item>
                        <el-dropdown-item @click="设置显示其他建筑">
                            显示其他建筑
                            <el-icon v-if="显示其他建筑 == true">
                                <Check />
                            </el-icon>
                        </el-dropdown-item>
                        <el-dropdown-item divided @click="显示搜索框">
                            搜索单位
                            <el-icon v-if="搜索 != ''">
                                <Check />
                            </el-icon>
                        </el-dropdown-item>
                        <el-dropdown-item v-if="搜索 !== ''" @click="取消搜索">取消搜索</el-dropdown-item>
                        <el-dropdown-item divided>取消</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>

        <div class="单位列表">
            <template v-for="单位配置 in 单位列表">
                <div class="单位图标">
                    <单位 :单位配置="单位配置" @编辑单位="显示编辑单位对话框" />
                </div>
            </template>
        </div>
        <div class="底部">

        </div>
    </section>
    <编辑单位对话框 />
</template>

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
    user-select: none;
    align-content: flex-start;
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
    flex: none;
}
</style>