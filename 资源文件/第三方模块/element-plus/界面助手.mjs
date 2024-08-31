export default class 界面助手 {
    static 弹窗提示用户(标题, 提示内容, 回调函数, 确认按钮的文字 = '确定', 取消按钮的文字 = '取消') {
        ElementPlus.ElMessageBox.confirm(提示内容, 标题,
            {
                confirmButtonText: 确认按钮的文字,
                cancelButtonText: 取消按钮的文字,
                type: 'info',
            })
            .then(回调函数)
            .catch(() => {
                // catch error
            })

    }
}