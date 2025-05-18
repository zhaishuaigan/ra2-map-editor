<script>
import 文件 from '../类库/文件.mjs';
import 目录 from '../类库/目录.mjs';
import 配置 from '../类库/配置.mjs';
var 游戏目录 = null;
var 玩家配置文件 = null;
export default {
    data() {
        return {
            编号: '',
            配置文件名: '测试运行配置.json',
            显示弹窗: false,
            玩家配置文件: false,
            地图: 'mp.dat',
            玩家: {
                名字: "Tester",
                位置: "",
                国家: "",
                小队: "",
                颜色: "",
            },
            电脑: [

            ],
            设置: {
                快速游戏: true,
                工具箱: true,
                拖动基地: true,
                超级武器: true,
                初始基地: true,
                摧毁桥梁: true,
                加速建造: true,
                特殊工程师: false,
                盟友基地旁边建造: true,
                允许结盟: true,
            },
            选项配置: {
                游戏速度: { 配置值: "1" },
                初始金钱: { 标识: "", 配置值: "30000", 配置项: [5000, 10000, 30000, 50000, 100000, 100000000] },
                初始部队: { 标识: "", 配置值: "0", 配置项: [0, 1, 5, 10, 50, 100] },
                游戏版本: { 标识: "", 配置值: "尤里的复仇", 配置项: ['原版', '共和国之辉', "尤里的复仇", "ares"] },
            }
        }
    },
    computed: {
        启动链接() {
            // return 'javascript:void(0)';
            return 'run://' + this.编号;
        },
        玩家和电脑配置() {
            return [
                this.玩家,
                ...this.电脑
            ]

        }
    },
    async mounted() {
        this.生成编号();
        this.事件服务(this);
    },
    methods: {
        生成编号() {
            this.编号 = Math.random().toString().slice(2);
        },
        async 显示测试运行对话框() {
            await this.读取配置();
            if (游戏目录) {
                this.显示弹窗 = true;
                return;
            }

            ElementPlus.ElMessageBox.alert('检测到你还没有选择游戏目录, 选择游戏目录后才能使用测试运行功能', '提示', {
                confirmButtonText: '选择游戏目录',
                callback: async () => {
                    游戏目录 = await 目录.打开目录('game');
                    this.显示弹窗 = true;
                },
            })


        },
        添加电脑() {
            this.电脑.push({
                名字: "电脑",
                位置: "",
                国家: "",
                小队: "",
                颜色: "",
            })
        },
        删除电脑(编号) {
            this.电脑.splice(编号 - 1, 1);
        },
        async 保存配置() {
            if (!window.项目) {
                return;
            }
            var 配置 = {
                玩家: this.玩家,
                电脑: this.电脑,
                设置: this.设置,
                选项配置: this.选项配置,
            };
            window.项目.项目目录.创建子文件('测试运行配置.json', JSON.stringify(配置));
            await this.生成游戏配置();
        },
        async 读取配置() {
            if (!window.项目) {
                return;
            }
            var 包含配置文件 = await window.项目.项目目录.文件是否存在(this.配置文件名);
            if (包含配置文件) {
                var 配置文件 = await window.项目.项目目录.获取子文件(this.配置文件名);
                var 配置内容 = await 配置文件.读取内容();
                var 配置 = JSON.parse(配置内容);
                for (var 键 in 配置) {
                    this[键] = 配置[键];
                }
            }
        },
        async 运行测试() {
            await this.保存配置();
            await this.写入地图数据();
        },
        async 生成游戏配置() {
            var 游戏配置 = new 配置();
            游戏配置.添加属性值('Settings', 'Name', this.玩家.名字);
            游戏配置.添加属性值('Settings', 'Side', this.玩家.国家);
            游戏配置.添加属性值('Settings', 'Bases', this.设置.初始基地);
            游戏配置.添加属性值('Settings', 'Color', this.玩家.颜色);
            游戏配置.添加属性值('Settings', 'Crates', this.设置.工具箱);
            游戏配置.添加属性值('Settings', 'Credits', this.选项配置.初始金钱.配置值);
            游戏配置.添加属性值('Settings', 'Scenario', this.地图);
            游戏配置.添加属性值('Settings', 'AIPlayers', this.电脑.length);
            游戏配置.添加属性值('Settings', 'GameSpeed', this.选项配置.游戏速度.配置值);
            游戏配置.添加属性值('Settings', 'ShortGame', this.设置.快速游戏);
            游戏配置.添加属性值('Settings', 'TechLevel', '10');
            游戏配置.添加属性值('Settings', 'UnitCount', this.选项配置.初始部队.配置值);
            游戏配置.添加属性值('Settings', 'MCVRedeploy', this.设置.初始基地);
            游戏配置.添加属性值('Settings', 'BuildOffAlly', this.设置.盟友基地旁边建造);
            游戏配置.添加属性值('Settings', 'Superweapons', this.设置.超级武器);
            游戏配置.添加属性值('Settings', 'BridgeDestroy', this.设置.摧毁桥梁);
            游戏配置.添加属性值('Settings', 'MultiEngineer', this.设置.特殊工程师);

            if (this.玩家.小队 !== '') {
                var 联盟列表 = [
                    'HouseAllyOne',
                    'HouseAllyTwo',
                    'HouseAllyThree',
                    'HouseAllyFour',
                    'HouseAllyFive',
                    'HouseAllySix',
                    'HouseAllySeven'
                ];
                for (var j = 0; j < this.电脑.length; j++) {
                    if (this.电脑[j].小队 == this.玩家.小队) {
                        游戏配置.添加属性值(`Multi1_Alliances`, 联盟列表.shift(), j + 2);
                    }
                }

            }

            游戏配置.添加属性值('SpawnLocations', 'Multi1', this.玩家.位置);
            if (this.电脑.length > 0) {
                var 已选颜色 = [];
                if (this.玩家.颜色 != '') {
                    已选颜色.push(this.玩家.颜色);
                }
                this.电脑.map((当前电脑) => {
                    if (当前电脑.颜色 != '') {
                        已选颜色.push(当前电脑.颜色);
                    }
                });
                var 颜色列表 = ['0', '1', '2', '3', '4', '5', '6', '7'];
                颜色列表 = 颜色列表.filter((当前颜色) => !已选颜色.includes(当前颜色));
                颜色列表.sort(() => Math.random() - 0.5);
                for (var i = 1; i <= this.电脑.length; i++) {
                    var 编号 = i + 1;
                    var 当前电脑 = this.电脑[i - 1];
                    游戏配置.添加属性值('SpawnLocations', `Multi${编号}`, 当前电脑.位置);
                    var 颜色 = 当前电脑.颜色 == '' ? 颜色列表.shift() : 当前电脑.颜色;
                    游戏配置.添加属性值('HouseColors', `Multi${编号}`, 颜色);
                    var 国家 = 当前电脑.国家 == '' ? Math.floor(Math.random() * 10) : 当前电脑.国家;
                    游戏配置.添加属性值('HouseCountries', `Multi${编号}`, 国家);
                    游戏配置.添加属性值('HouseHandicaps', `Multi${编号}`, 0);
                    var 联盟列表 = [
                        'HouseAllyOne',
                        'HouseAllyTwo',
                        'HouseAllyThree',
                        'HouseAllyFour',
                        'HouseAllyFive',
                        'HouseAllySix',
                        'HouseAllySeven'
                    ];
                    if (当前电脑.小队 != '') {
                        for (var j = 0; j < this.电脑.length; j++) {
                            if (j + 2 == 编号) {
                                // 跳过自己
                                continue;
                            }
                            if (this.电脑[j].小队 == 当前电脑.小队) {
                                游戏配置.添加属性值(`Multi${编号}_Alliances`, 联盟列表.shift(), j + 2);
                            }
                        }
                    }
                }
            }

            if (!玩家配置文件) {
                玩家配置文件 = await 文件.保存一个文件('spawn.ini', 游戏配置.生成配置文件(), 'game');
                this.玩家配置文件 = true;
            } else {
                玩家配置文件.写入(游戏配置.生成配置文件());
            }


            // var 游戏配置文件 = await 游戏目录.获取子文件('spawn.ini');
            // if (游戏配置文件) {
            //     await 游戏配置文件.写入(游戏配置.生成配置文件());
            // } else {
            //     await 游戏目录.创建子文件('spawn.ini', 游戏配置.生成配置文件());
            // }


        },
        async 写入地图数据() {
            var 地图数据 = await window.选择的地图.地图文件.读取内容();
            await 游戏目录.创建子文件('mp.dat', 地图数据);
        },
        下载游戏() {

        },
        帮助() {
        },
    }
}

</script>

<template>
    <el-dialog v-model="显示弹窗" title="测试运行设置" width="700" height="500" stripe draggable>
        <div class="游戏选项">
            <h3>选项</h3>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-checkbox v-model="设置.快速游戏">快速游戏</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.工具箱">工具箱</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.拖动基地">拖动基地</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.超级武器">超级武器</el-checkbox>
                </el-col>
                <el-col :span="6">
                    <el-checkbox v-model="设置.初始基地">初始基地</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.摧毁桥梁">摧毁桥梁</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.加速建造">加速建造</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.特殊工程师">特殊工程师</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.允许结盟">允许结盟</el-checkbox>
                </el-col>
                <el-col :span="4">
                    <el-checkbox v-model="设置.盟友基地旁边建造">盟友基地旁边建造</el-checkbox>
                </el-col>
            </el-row>
            <div class="选项配置">
                <el-select v-model="选项配置.游戏速度.配置值">
                    <el-option :label="'游戏速度: 极快'" :value="'0'" />
                    <el-option :label="'游戏速度: 快'" :value="'1'" />
                    <el-option :label="'游戏速度: 快-'" :value="'2'" />
                    <el-option :label="'游戏速度: 中等'" :value="'3'" />
                    <el-option :label="'游戏速度: 慢-'" :value="'4'" />
                    <el-option :label="'游戏速度: 慢'" :value="'5'" />
                    <el-option :label="'游戏速度: 极慢'" :value="'6'" />
                </el-select>
                <el-select v-model="选项配置.初始金钱.配置值">
                    <el-option v-for="值 of 选项配置.初始金钱.配置项" :label="'初始金钱: ' + 值" :value="值 + ''" />
                </el-select>
                <el-select v-model="选项配置.初始部队.配置值">
                    <el-option v-for="值 of 选项配置.初始部队.配置项" :label="'初始部队: ' + 值" :value="值 + ''" />
                </el-select>
                <el-select v-model="选项配置.游戏版本.配置值">
                    <el-option v-for="值 of 选项配置.游戏版本.配置项" :label="'游戏版本: ' + 值" :value="值 + ''" />
                </el-select>
            </div>
        </div>
        <div class="玩家和电脑配置">
            <h3>玩家和电脑配置</h3>
            <el-table :data="玩家和电脑配置" style="width: 100%; margin-bottom: 10px;" border>
                <el-table-column prop="名字" label="名字" width="100"></el-table-column>
                <el-table-column prop="国家" label="国家" width="120">
                    <template #default="scope">
                        <el-select v-model="scope.row.国家" placeholder="随机">
                            <el-option label="随机" :value="''" />
                            <el-option label="美国" :value="'0'" />
                            <el-option label="韩国" :value="'1'" />
                            <el-option label="法国" :value="'2'" />
                            <el-option label="德国" :value="'3'" />
                            <el-option label="英国" :value="'4'" />
                            <el-option label="利比亚" :value="'5'" />
                            <el-option label="伊拉克" :value="'6'" />
                            <el-option label="古巴" :value="'7'" />
                            <el-option label="苏俄" :value="'8'" />
                            <el-option label="尤里" :value="'9'" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="颜色" label="颜色" width="110">
                    <template #default="scope">
                        <el-select v-model="scope.row.颜色" placeholder="随机">
                            <el-option label="随机" :value="''" />
                            <el-option label="黄色" :value="'0'" />
                            <el-option label="红色" :value="'1'" />
                            <el-option label="蓝色" :value="'2'" />
                            <el-option label="绿色" :value="'3'" />
                            <el-option label="橙色" :value="'4'" />
                            <el-option label="天蓝" :value="'5'" />
                            <el-option label="紫色" :value="'6'" />
                            <el-option label="粉色" :value="'7'" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="位置" label="位置" width="110">
                    <template #default="scope">
                        <el-select v-model="scope.row.位置" placeholder="随机">
                            <el-option label="随机" :value="''" />
                            <el-option label="1" :value="'0'" />
                            <el-option label="2" :value="'1'" />
                            <el-option label="3" :value="'2'" />
                            <el-option label="4" :value="'3'" />
                            <el-option label="5" :value="'4'" />
                            <el-option label="6" :value="'5'" />
                            <el-option label="7" :value="'6'" />
                            <el-option label="8" :value="'7'" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="小队" label="小队" width="100">
                    <template #default="scope">
                        <el-select v-model="scope.row.小队" placeholder="随机">
                            <el-option label="随机" :value="''" />
                            <el-option label="A" :value="'A'" />
                            <el-option label="B" :value="'B'" />
                            <el-option label="C" :value="'C'" />
                            <el-option label="D" :value="'D'" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" v-if="scope.$index > 0"
                            @click.prevent="删除电脑(scope.$index)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="mt-4" style="width: 100%" v-if="电脑.length < 7" @click="添加电脑">
                添加电脑
            </el-button>
        </div>
        <div class="按钮组">
            <el-button type="text" @click="帮助" style=" margin-right: 10px;">帮助</el-button>
            <el-button type="primary" @click="保存配置" v-if="!玩家配置文件">保存配置</el-button>
            <a :href="启动链接" v-if="玩家配置文件">
                <el-button type="primary" @click="运行测试">运行</el-button>
            </a>
        </div>
    </el-dialog>
</template>

<style scoped>
.颜色框 {
    width: 30px;
    height: 20px;
    border: 1px solid #ccc;
}

.选项配置 {
    display: flex;
    /* flex-wrap: wrap; */
}

.选项配置 .el-select {
    margin-right: 10px;
    /* display: inline-block; */
}

.按钮组 {
    padding: 10px;
    text-align: right;
}
</style>