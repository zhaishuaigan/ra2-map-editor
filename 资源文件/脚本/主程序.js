import 地图 from "../类库/地图.js";
import 调试 from "../类库/调试.js";
import 目录 from "../类库/目录.js";
import 触发器 from "../类库/地图/触发器.js";
import 事件 from "../类库/地图/事件.js";
import 视图 from "../第三方模块/vue/视图.js";

class 主程序 {

    async 开始() {
        调试.输出('主程序.开始');

        var 新视图 = 视图.创建('#主程序', {
            组件: {
                'z菜单栏': 视图.异步加载界面('菜单栏.vue'),
            },
            数据: {
                '自定义文字': "hello world"
            },
            方法: {
                '点击按钮': function () {
                    console.log('点击按钮');
                }
            }
        });
        新视图.渲染();
    }

}

(new 主程序()).开始();