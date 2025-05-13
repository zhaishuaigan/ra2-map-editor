<script>
export default {
    data() {
        return {
            配置文件名: '测试运行配置.json',
            显示弹窗: false,
            地图: '',
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
                游戏速度: { 配置值: "5", 配置项: [1, 2, 3, 4, 5, 6] },
                初始金钱: { 标识: "", 配置值: "30000", 配置项: [5000, 10000, 30000, 50000, 100000, 100000000] },
                初始部队: { 标识: "", 配置值: "0", 配置项: [0, 1, 5, 10, 50, 100] },
                游戏版本: { 标识: "", 配置值: "尤里的复仇", 配置项: ['原版', '共和国之辉', "尤里的复仇", "ares"] },
            }
        }
    },
    computed: {
        玩家和电脑配置() {
            return [
                this.玩家,
                ...this.电脑
            ]

        }
    },
    async created() {

        this.事件服务(this);
    },
    methods: {
        async 显示测试运行对话框() {
            await this.读取配置();
            this.显示弹窗 = true;
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
        保存配置() {
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
                console.log(配置);
                for (var 键 in 配置) {
                    this[键] = 配置[键];
                }
            }
        },
        运行测试() {
            this.保存配置();
        }
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
                    <el-option v-for="值 of 选项配置.游戏速度.配置项" :label="'游戏速度: ' + 值" :value="值 + ''" />
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
                <el-table-column prop="名字" label="名字" width="120"></el-table-column>
                <el-table-column prop="国家" label="国家" width="100">
                    <template #default="scope">
                        <span v-if="scope.row.国家">{{ scope.row.国家 }}</span>
                        <span v-else>随机</span>
                    </template>
                </el-table-column>
                <el-table-column prop="颜色" label="颜色" width="100">
                    <template #default="scope">
                        <div v-if="!scope.row.isOpen" class="颜色框" :style="{ backgroundColor: scope.row.颜色 }">
                        </div>
                        <div v-else class="颜色框"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="位置" label="位置" width="100">
                    <template #default="scope">
                        <span v-if="scope.row.位置">{{ scope.row.位置 }}</span>
                        <span v-else>随机</span>
                    </template>
                </el-table-column>
                <el-table-column prop="小队" label="小队" width="100">
                    <template #default="scope">
                        <span v-if="scope.row.小队">{{ scope.row.小队 }}</span>
                        <span v-else>随机</span>
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
            <el-button type="primary" @click="运行测试">运行测试</el-button>
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
    text-align: center;
}
</style>