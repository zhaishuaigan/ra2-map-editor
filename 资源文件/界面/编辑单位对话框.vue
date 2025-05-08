<script>
export default {
    components: 视图.加载组件(['属性显示']),
    data() {
        return {
            版本: 0,
            当前标签页: "属性",
            单位注册名: '',
            单位配置: null,
            显示编辑单位弹窗: false,
        };
    },
    computed: {
        武器列表() {
            this.版本;
            if (this.单位配置 && this.单位配置.拥有武器) {
                return this.单位配置.所有武器;
            }
            return [];
        }
    },

    mounted() {
        this.事件服务(this);
    },
    methods: {
        刷新() {
            if (!this.单位注册名) {
                return [];
            }
            this.单位配置 = null;
            this.单位属性列表 = [];
            setTimeout(() => {
                this.单位配置 = window.选择的地图.获取单位(this.单位注册名);
            }, 0);
        },
        编辑单位(单位注册名) {
            this.显示编辑单位弹窗 = true;
            this.当前标签页 = '属性';
            this.单位注册名 = 单位注册名;
            this.刷新();
        },
        加载默认图标() {
            this.$refs.单位图标.src = '/资源文件/图片/单位图标/xxicon.png';
        },
        关闭() {
            this.显示编辑单位弹窗 = false;
            this.单位注册名 = '';
            this.单位配置 = null;
            this.触发事件('关闭编辑单位属性对话框');
        },

    }
};
</script>

<template>
    <el-dialog v-if="单位配置" v-model="显示编辑单位弹窗" class="编辑单位属性对话框" :title="`${单位配置.显示名}[${单位配置.注册名}]`" width="800"
        @close="关闭">
        <img class="单位图标" ref="单位图标" :src="单位配置.图标" @error="加载默认图标" />
        <el-tabs v-model="当前标签页">
            <el-tab-pane label="属性" name="属性">
                <div class="属性显示区域">
                    <属性显示 :注册名="单位注册名" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="武器" v-if="单位配置.拥有武器" name="武器">
                <div class="属性显示区域" v-if="当前标签页 == '武器'">
                    <template v-for="武器 of 武器列表">
                        <属性显示 :注册名="武器.注册名" :标题="武器.类型 + '=' + 武器.注册名" />
                    </template>
                </div>
            </el-tab-pane>
            <el-tab-pane label="弹头" v-if="单位配置.拥有武器" name="弹头">
                <div class="属性显示区域" v-if="当前标签页 == '弹头'">
                    <template v-for="武器 of 武器列表">
                        <属性显示 v-if="武器.弹头.注册名 != '未定义'" :注册名="武器.弹头.注册名" :标题="武器.类型 + '.' + 武器.注册名 + '.' + 武器.弹头.注册名" />
                    </template>
                </div>
            </el-tab-pane>
            <el-tab-pane label="抛射体" v-if="单位配置.拥有武器" name="抛射体">
                <div class="属性显示区域" v-if="当前标签页 == '抛射体'">
                    <template v-for="武器 of 武器列表">
                        <属性显示 v-if="武器.弹头.注册名 != '未定义'" :注册名="武器.抛射体.注册名" :标题="武器.类型 + '.' + 武器.注册名 + '.' + 武器.抛射体.注册名" />
                    </template>
                </div>
            </el-tab-pane>
        </el-tabs>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="关闭">关闭</el-button>
            </div>
        </template>
    </el-dialog>



</template>

<style scoped>
.属性显示区域 {
    max-height: 500px;
    overflow-y: scroll;
}

.编辑单位属性对话框 .单位图标 {
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 5px;
}
</style>