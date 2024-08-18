import 地图 from "../类库/地图.js";
import 调试 from "../类库/调试.js";
import 目录 from "../类库/目录.js";
class 主程序 {

    async 开始() {
        调试.输出('主程序.开始');

        document.getElementById('开始按钮').addEventListener('click', async () => {
            调试.输出('开始');
            var 打开的目录 = await 目录.打开目录();
            if (!打开的目录) {
                调式.输出('未选择目录');
                return;
            }
            调试.输出('目录：', 打开的目录.名字);
            打开的目录.创建子目录("测试目录");
            var 新文件 = await 打开的目录.创建子文件("测试文件.txt", "测试内容");
            await 新文件.追加("\n追加内容");
            调试.输出('子目录：', await 打开的目录.获取子目录列表());
            调试.输出('子文件：', await 打开的目录.获取子文件列表());
        });
    }

}

(new 主程序()).开始();