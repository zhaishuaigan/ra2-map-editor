<script>
export default 视图.创建组件({
    组件: [],
    数据: {
        显示触发列表: false,
        显示弹窗: false,
        触发列表: [
            {
                触发名称: '给玩家A',
                所属方: '平民',
                重复类型: '1',
            },
            {
                触发名称: '给玩家B',
                所属方: '平民',
                重复类型: '1',
            },
            {
                触发名称: '给玩家C',
                所属方: '平民',
                重复类型: '1',
            },
            {
                触发名称: '给玩家D',
                所属方: '平民',
                重复类型: '1',
            },
            {
                触发名称: '给玩家E',
                所属方: '平民',
                重复类型: '1',
            },
            {
                触发名称: '给玩家F',
                所属方: '平民',
                重复类型: '1',
            },
            {
                触发名称: '给玩家G',
                所属方: '平民',
                重复类型: '1',
            },
            {
                触发名称: '给玩家H',
                所属方: '平民',
                重复类型: '1',
            }
        ]
    },
    挂载() {

    },
    方法: {

    }

});
</script>

<template>
    <span href="javascript:void(0);" class="btn-text" @click="显示触发列表 = true">触发编辑</span>
    <el-dialog v-model="显示触发列表" title="触发编辑" width="800" height="500" stripe draggable>
        <el-table :data="触发列表">
            <el-table-column property="触发名称" label="触发名称" width="150" />
            <el-table-column property="所属方" label="所属方" width="200" />
            <el-table-column property="重复类型" label="重复类型" />
            <el-table-column fixed="right" label="操作" min-width="60">
                <template #default>
                    <el-button link type="primary" size="small">修改</el-button>
                    <el-button link type="primary" size="small">复制</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog v-model="显示弹窗" title="Shipping address" width="500">
        <el-form :model="form">
            <!-- <el-form-item label="Promotion name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai" />
                    <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item> -->
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="显示弹窗 = false">取消</el-button>
                <el-button type="primary" @click="显示弹窗 = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>