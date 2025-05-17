<script>
import 界面助手 from '../第三方模块/element-plus/界面助手.mjs';
import 地图 from '../类库/地图.mjs';
import 目录 from '../类库/目录.mjs';
import 文件 from '../类库/文件.mjs';
import 配置 from '../类库/配置.mjs';

var 项目 = {
    项目目录: null,
    地图文件列表: [],
    选中的地图: null
};
export default {
    data() {
        return {
            选择地图文件对话框: false,
            地图文件名列表: []
        };
    },
    async mounted() {
        var 测试 = await this.测试();
        if (!测试) {
            this.显示选择地图目录对话框();
        }
        this.事件服务(this);
        this.绑定保存地图事件();
    },
    methods: {
        async 绑定保存地图事件() {
            // 用户按下 Ctrl + S 保存地图
            window.addEventListener('keydown', async (e) => {
                if (e.ctrlKey && e.key == 's') {
                    e.preventDefault();

                    if (!window.选择的地图) {
                        this.$message({
                            message: '没有选择地图, 操作无效!',
                            type: 'info'
                        });
                        return;
                    }
                    if (false == window.选择的地图.有更新) {
                        this.$message({
                            message: '地图没有更新, 无需保存!',
                            type: 'info'
                        });
                        return;
                    }

                    await this.创建历史记录();

                    await window.选择的地图.保存();
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });

                }
            });
        },
        async 创建历史记录() {
            var 文件名 = 项目.选中的地图.文件名;
            var 历史记录目录 = await 项目.项目目录.创建子目录('历史记录');
            var 时间 = new Date().toLocaleString().replace(/\//g, '-').replace(/:/g, '.');
            var 历史记录文件名 = 文件名.replace('.' + 项目.选中的地图.扩展名, " 备份时间为 " + 时间 + '.' + 项目.选中的地图.扩展名);
            var 历史记录文件 = await 历史记录目录.创建子文件(历史记录文件名);
            await 项目.选中的地图.复制到(历史记录文件);
        },
        async 测试() {
            var 字库内容 = await 地图.加载默认配置('尤里的复仇', 'ra2md');
            window.字库 = new 配置(字库内容);
            await window.字库.异步解析();

            项目.项目目录 = await navigator.storage.getDirectory();
            var 测试文件 = new 文件(await 项目.项目目录.getFileHandle("test.mpr", { create: true }));
            window.选择的地图 = new 地图(window.项目, 测试文件);
            await window.选择的地图.加载地图();
            this.触发事件('已选择地图');
            return true;
        },
        显示选择地图目录对话框() {
            界面助手.弹窗提示用户('提示', '请选择地图所在的目录, 选择后会自动识别地图文件.', () => {
                this.选择目录();
            }, "选择目录");
        },
        async 选择目录() {
            项目.项目目录 = await 目录.打开目录('map');
            if (!项目.项目目录) {
                return;
            }
            var 文件列表 = await 项目.项目目录.获取子文件列表();
            项目.地图文件列表 = 文件列表.filter(文件 => ['yrm', 'mpr', 'map'].includes(文件.扩展名));

            switch (项目.地图文件列表.length) {
                case 0:
                    界面助手.弹窗提示用户('提示', '未找到地图文件, 请重新选择目录.', () => {
                        this.显示选择地图目录对话框();
                    });
                    break;
                case 1:
                    this.指定地图文件(项目.地图文件列表[0]);
                    break;
                default:
                    this.提示用户选择地图();
            }

        },
        提示用户选择地图() {
            this.地图文件名列表 = [];
            项目.地图文件列表.map((文件) => {
                this.地图文件名列表.push(文件.文件名);
            });
            this.选择地图文件对话框 = true;
        },
        async 指定地图文件(地图文件) {
            if (typeof 地图文件 == 'string') {
                项目.选中的地图 = 项目.地图文件列表.find(文件 => 文件.文件名 == 地图文件);
            } else {
                项目.选中的地图 = 地图文件;
            }
            var 选择的地图 = new 地图(项目.项目目录, 项目.选中的地图);
            await 选择的地图.加载地图();
            window.选择的地图 = 选择的地图;
            window.项目 = 项目;
            this.触发事件('已选择地图');
            this.选择地图文件对话框 = false;
            // console.log("地图数据: ", 选择的地图.获取地图数据());
            // console.log("缩略图数据: ", atob(选择的地图.获取缩略图数据()));
            console.log("所有触发器: ", 选择的地图.获取所有触发器());
            // console.log('删除前的触发器: ', { ...选择的地图.地图数据.获取配置项('Triggers') })
            // 选择的地图.删除触发器('01000000');
            // console.log('删除后的触发器: ', { ...选择的地图.地图数据.获取配置项('Triggers') })
            // console.log('获取建筑栏的单位: ', await 选择的地图.获取建筑栏的单位())
            // console.log('获取防御栏的单位: ', await 选择的地图.获取防御栏的单位())
            // console.log('获取步兵栏的单位: ', await 选择的地图.获取步兵栏的单位())
            // console.log('获取战车栏的单位: ', await 选择的地图.获取战车栏的单位())

        },

        监听文件修改() {

        }

    }
};
</script>

<template>
    <el-dialog v-model="选择地图文件对话框" title="识别到多个地图文件, 请选择一个进行加载" width="600">
        <div v-for="name in 地图文件名列表" style="padding: 5px">
            <el-button @click="指定地图文件(name)" type="primary">{{ name }}</el-button>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="选择地图文件对话框 = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>