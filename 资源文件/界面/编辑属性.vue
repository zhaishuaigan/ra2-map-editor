<script>
export default {
    props: ['注册名', '属性'],
    data() {
        return {
            编辑属性对话框: false,
            属性名: '',
            属性值: '',
        }
    },
    mounted() {
        this.属性名 = this.属性.属性名;
        this.属性值 = this.属性.属性值;
    },
    methods: {
        显示编辑属性对话框() {
            this.编辑属性对话框 = true;
        },
        保存属性() {
            window.选择的地图.修改属性值(this.注册名, this.属性名, this.属性值);
            this.属性.属性值 = this.属性值;
            this.触发事件('属性被修改', [this.注册名, this.属性名, this.属性值]);
            // 消息隧道.触发事件('刷新', [this.注册名, this.属性名, this.属性值]);
            this.编辑属性对话框 = false;
        },
        关闭() {
            this.编辑属性对话框 = false;
        },
        搜索属性值: async function (搜索词, 回调) {
            var 提示数据 = window.属性值翻译.配置项;
            var 所有提示词 = [];
            var 提示类型 = [];
            var 返回结果 = [];
            for (var 类型 in 提示数据) {
                if (类型.toLowerCase().includes(搜索词.toLowerCase())) {
                    提示类型.push(类型);
                    continue;
                }
                for (var 属性 in 提示数据[类型]) {
                    if (属性.toLowerCase() == 搜索词.toLowerCase()) {
                        提示类型.push(类型);
                        break;
                    }
                    所有提示词.push({
                        value: 属性,
                        zh: 提示数据[类型][属性],
                    });
                }
            }
            if (搜索词 === '') {
                回调(所有提示词);
                return;
            }
            if (提示类型.length > 0) {
                for (var 类型 of 提示类型) {
                    for (var 属性 in 提示数据[类型]) {
                        返回结果.push({
                            value: 属性,
                            zh: 提示数据[类型][属性],
                        });
                    }
                }
            } else {
                for (var 属性 of 所有提示词) {
                    if (属性.value.toLowerCase().includes(搜索词.toLowerCase())) {
                        返回结果.push(属性);
                    } else if (属性.zh.toLowerCase().includes(搜索词.toLowerCase())) {
                        返回结果.push(属性);
                    }
                }
            }
            回调(返回结果);
        },
    }
};
</script>

<template>
    <el-button type="primary" class="修改按钮" size="small" @click="显示编辑属性对话框">修改</el-button>

    <el-dialog v-model="编辑属性对话框" :title="`编辑属性[${注册名}.${属性名}]`" width="500">
        <el-form @submit.native.prevent="保存属性(要添加的属性);">
            <el-form-item label="属性值">
                <el-autocomplete v-model="属性值" :fetch-suggestions="搜索属性值" clearable fit-input-width
                    class="inline-input el-form-item__content" style=" width: 100%;">
                    <template #default="{ item }">
                        <div class="选项">
                            <p class="值">{{ item.value }}</p>
                            <p class="翻译">{{ item.zh }}</p>
                        </div>
                    </template>
                </el-autocomplete>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="关闭">取消</el-button>
                <el-button type="primary" @click="保存属性">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.选项 {
    line-height: 20px;
    padding: 5px;
    border-bottom: 1px solid rgb(230, 230, 230);
}

.选项 p {
    margin: 0px;
    padding: 0px;
}

.选项 .值 {
    display: flex;
    flex-direction: row;
    color: #f00;
}

.选项 .翻译 {
    white-space: normal;
    flex: auto;

}
</style>