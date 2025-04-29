<script>
export default {
    props: ['注册名'],
    data() {
        return {
            新注册名: '',
        }
    },
    created() {
    },
    methods: {


    }
}
</script>

<template>
    <el-button type="success" @click=" ">
        <el-icon style=" margin-right: 3px">
            <DocumentCopy />
        </el-icon>
        复制单位
    </el-button>
</template>

<style></style>