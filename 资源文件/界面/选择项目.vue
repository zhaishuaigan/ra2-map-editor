<script>
import 界面助手 from '../第三方模块/element-plus/界面助手.mjs';
import 地图 from '../类库/地图.mjs';
import 消息隧道 from '../类库/消息隧道.mjs';
import 目录 from '../类库/目录.mjs';
export default 视图.创建组件({
    属性: {
        项目目录: null,
        地图文件列表: [],
        选中的地图: null
    },
    数据: {
        选择地图文件对话框: false,
        地图文件名列表: []
    },
    挂载() {
        this.显示选择地图目录对话框();
    },
    方法: {
        显示选择地图目录对话框() {
            界面助手.弹窗提示用户('提示', '请选择地图所在的目录, 选择后会自动识别地图文件.', () => {
                this.选择目录();
            }, "选择目录");
        },
        async 选择目录() {
            this.项目目录 = await 目录.打开目录();
            var 文件列表 = await this.项目目录.获取子文件列表();
            this.地图文件列表 = 文件列表.filter(文件 => ['yrm', 'mpr'].includes(文件.扩展名));

            switch (this.地图文件列表.length) {
                case 0:
                    界面助手.弹窗提示用户('提示', '未找到地图文件, 请重新选择目录.', () => {
                        this.显示选择地图目录对话框();
                    });
                    break;
                case 1:
                    this.指定地图文件(this.地图文件列表[0]);
                    break;
                default:
                    this.提示用户选择地图();
            }

        },
        提示用户选择地图() {
            this.地图文件名列表 = [];
            this.地图文件列表.map((文件) => {
                this.地图文件名列表.push(文件.文件名);
            });
            this.选择地图文件对话框 = true;
        },
        指定地图文件(地图文件) {
            if (typeof 地图文件 == 'string') {
                this.选中的地图 = this.地图文件列表.find(文件 => 文件.文件名 == 地图文件);
            } else {
                this.选中的地图 = 地图文件;
            }
            var 消息内容 = {
                消息类型: "用户选择地图",
                地图文件: this.选中的地图,
                项目目录: this.项目目录,
                地图: new 地图(this.选中的地图)
            }
            window.地图文件 = this.选中的地图;
            window.项目目录 = this.项目目录;
            new 消息隧道("事件").发送消息(消息内容);
            this.选择地图文件对话框 = false;
        }
    }
});
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