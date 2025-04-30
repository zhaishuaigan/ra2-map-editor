<script>
export default {
    components: 视图.加载组件(['编辑属性', '删除属性', '添加属性', '复制单位']),
    data() {
        return {
            当前标签页: "属性",
            单位注册名: '',
            单位配置: null,
            显示编辑单位弹窗: false,
            单位属性列表: []
        };
    },

    mounted() {
        消息隧道.事件服务(this);
    },
    methods: {
        刷新() {
            if (!this.单位注册名) {
                return [];
            }
            this.单位属性列表 = [];
            this.单位配置 = {};
            setTimeout(() => {
                this.单位配置 = window.选择的地图.获取单位(this.单位注册名);
                this.单位属性列表 = this.单位配置.获取属性列表();
            }, 0);
        },
        属性被修改(注册名, 属性名 = "", 属性值 = "") {
            if (!this.显示编辑单位弹窗) {
                return;
            }

            if (注册名 != this.单位注册名) {
                return;
            }
            this.刷新();
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
        },

        显示添加属性对话框() {
            this.$prompt('请输入属性名', '添加属性', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '请输入属性名',
            }).then(async ({ value }) => {
                window.选择的地图.修改属性值(单位注册名, value, '');
                this.刷新();
            }).catch(() => {
            })

        },
        显示复制单位对话框() {

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
                    <el-descriptions :column="1" border>
                        <el-descriptions-item label="操作">
                            <el-button-group>
                                <添加属性 :注册名="单位注册名" />
                                <!-- <复制单位 :注册名="单位注册名" /> -->
                            </el-button-group>
                        </el-descriptions-item>
                        <el-descriptions-item v-for="属性 of 单位属性列表">
                            <template #label>
                                <el-tooltip class="box-item" effect="dark" raw-content :content="属性.说明"
                                    placement="bottom">
                                    {{ 属性.属性名 }}
                                </el-tooltip>
                            </template>
                            <div class="属性值">
                                <span style="padding: 0px 5px;">{{ 属性.属性值 }}</span>
                                <span v-if="属性.已修改" style="color: red">[默认值: {{ 属性.默认值 }}]</span>
                                <span v-if="属性.新增" style="color: red;">[新增]</span>
                                <el-button-group class="操作">
                                    <编辑属性 :注册名="单位注册名" :属性="属性" />
                                    <删除属性 :注册名="单位注册名" :属性="属性" />
                                </el-button-group>
                            </div>

                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </el-tab-pane>
            <el-tab-pane label="武器" v-if="单位配置.拥有武器" name="武器">
                <div class="属性显示区域">
                    <el-descriptions :column="1" v-for="武器 of 单位配置.所有武器" :title="武器.类型 + '=' + 武器.注册名" border>
                        <el-descriptions-item label="操作">
                            <el-button-group>
                                <添加属性 :注册名="武器.注册名" />
                                <!-- <复制单位 :注册名="单位注册名" /> -->
                            </el-button-group>
                        </el-descriptions-item>
                        <el-descriptions-item v-for="属性 of 武器.获取属性列表()">
                            <template #label>
                                <el-tooltip class="box-item" effect="dark" raw-content :content="属性.说明"
                                    placement="bottom">
                                    {{ 属性.属性名 }}
                                </el-tooltip>
                            </template>
                            <div class="属性值">
                                <span style="padding: 0px 5px;">{{ 属性.属性值 }}</span>
                                <span v-if="属性.已修改" style="color: red">[默认值: {{ 属性.默认值 }}]</span>
                                <span v-if="属性.新增" style="color: red;">[新增]</span>
                                <el-button-group class="操作">
                                    <编辑属性 :注册名="武器.注册名" :属性="属性" />
                                    <删除属性 :注册名="武器.注册名" :属性="属性" />
                                </el-button-group>
                            </div>

                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </el-tab-pane>
            <el-tab-pane label="弹头" v-if="单位配置.拥有武器" name="弹头">
                <div class="属性显示区域">
                    <el-descriptions :column="1" v-for="武器 of 单位配置.所有武器" :title="武器.类型 + '.' + 武器.注册名 + '.' + 武器.弹头.注册名"
                        border>
                        <el-descriptions-item label="操作">
                            <el-button-group>
                                <添加属性 :注册名="武器.弹头.注册名" />
                                <!-- <复制单位 :注册名="单位注册名" /> -->
                            </el-button-group>
                        </el-descriptions-item>
                        <el-descriptions-item v-for="属性 of 武器.弹头.获取属性列表()">
                            <template #label>
                                <el-tooltip class="box-item" effect="dark" raw-content :content="属性.说明"
                                    placement="bottom">
                                    {{ 属性.属性名 }}
                                </el-tooltip>
                            </template>
                            <div class="属性值">
                                <span style="padding: 0px 5px;">{{ 属性.属性值 }}</span>
                                <span v-if="属性.已修改" style="color: red">[默认值: {{ 属性.默认值 }}]</span>
                                <span v-if="属性.新增" style="color: red;">[新增]</span>
                                <el-button-group class="操作">
                                    <编辑属性 :注册名="武器.弹头.注册名" :属性="属性" />
                                    <删除属性 :注册名="武器.弹头.注册名" :属性="属性" />
                                </el-button-group>
                            </div>

                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </el-tab-pane>
            <el-tab-pane label="抛射体" v-if="单位配置.拥有武器" name="抛射体">
                <div class="属性显示区域">
                    <el-descriptions :column="1" v-for="武器 of 单位配置.所有武器"
                        :title="武器.类型 + '.' + 武器.注册名 + '.' + 武器.抛射体.注册名" border>
                        <el-descriptions-item label="操作">
                            <el-button-group>
                                <添加属性 :注册名="武器.抛射体.注册名" />
                                <!-- <复制单位 :注册名="单位注册名" /> -->
                            </el-button-group>
                        </el-descriptions-item>
                        <el-descriptions-item v-for="属性 of 武器.抛射体.获取属性列表()">
                            <template #label>
                                <el-tooltip class="box-item" effect="dark" raw-content :content="属性.说明"
                                    placement="bottom">
                                    {{ 属性.属性名 }}
                                </el-tooltip>
                            </template>
                            <div class="属性值">
                                <span style="padding: 0px 5px;">{{ 属性.属性值 }}</span>
                                <span v-if="属性.已修改" style="color: red">[默认值: {{ 属性.默认值 }}]</span>
                                <span v-if="属性.新增" style="color: red;">[新增]</span>
                                <el-button-group class="操作">
                                    <编辑属性 :注册名="武器.抛射体.注册名" :属性="属性" />
                                    <删除属性 :注册名="武器.抛射体.注册名" :属性="属性" />
                                </el-button-group>
                            </div>
                        </el-descriptions-item>
                    </el-descriptions>
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

.操作 {
    margin-left: 10px;
}

.el-descriptions {
    margin-bottom: 10px;

}
</style>