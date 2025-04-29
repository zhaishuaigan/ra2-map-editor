<script>
export default {
    data() {
        return {
            注册名: '',
            属性名: '',
            属性值: '',
            添加属性对话框: false,
        }
    },
    methods: {

        保存属性() {

        },

        打开添加属性对话框(注册名) {
            this.注册名 = 注册名;
            this.属性名 = '';
            this.属性值 = '';
            this.添加属性对话框 = true;
        },
        搜索属性值: function (搜索词, 回调函数) {
            (async () => {
                var 提示数据 = await 配置.加载('value.ini');
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
                    回调函数(所有提示词);
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
                回调函数(返回结果);
            })();
        },
    }
}
</script>
<template>
    <el-dialog v-model="添加属性对话框" title="添加属性" width="500">
        <el-form @submit.native.prevent="保存属性(要添加的属性);">
            <el-form-item label="属性名">
                <el-input v-model="属性名" autocomplete="off" />
            </el-form-item>
            <el-form-item label="属性值">
                <el-autocomplete v-model="要添加的属性.属性值" :fetch-suggestions="搜索属性值" clearable
                    class="inline-input el-form-item__content">
                    <template #default="{ item }">
                        <div class="value">{{ item.value }} <span class="zh">{{ item.zh }}</span></div>

                    </template>
                </el-autocomplete>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style></style>