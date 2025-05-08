import 中文组件名转换 from "../../类库/中文组件名转换.mjs";
import 模块 from "./模块.js";
import 消息服务 from '../../插件/消息服务.mjs';
class 视图 {

    static 创建(界面) {
        var 应用程序 = Vue.createApp(模块.异步加载(界面))
        应用程序.use(ElementPlus);
        应用程序.use(消息服务);
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            应用程序.component(key, component)
        }
        应用程序.mount(document.body);
        return 应用程序;
    }

    static 加载组件(组件) {
        var 所有组件 = {};
        for (var 名字 of 组件) {
            var 名字编码 = 中文组件名转换.中文转编码(名字);
            所有组件['V' + 名字编码] = 模块.异步加载(名字);
        }
        return 所有组件;
    }

    static 创建组件(配置 = {}) {
        var 所有组件 = {};
        if (配置.组件) {
            for (var 名字 of 配置.组件) {
                var 名字编码 = 中文组件名转换.中文转编码(名字);
                所有组件['V' + 名字编码] = 模块.异步加载(名字);
            }
        }
        var 数据 = 配置.数据 ? JSON.parse(JSON.stringify(配置.数据)) : {};
        var 组件配置 = {
            components: 所有组件,
            props: 配置.属性 ? JSON.parse(JSON.stringify(配置.属性)) : [],
            data() {
                return 数据;
            },
            mounted: 配置.挂载 ? 配置.挂载 : null,
            watch: 配置.监听 ? 配置.监听 : {},
            computed: 配置.计算属性 ? 配置.计算属性 : {},
            methods: 配置.方法 ? 配置.方法 : {},
            template: 配置.模板 ? 配置.模板 : ''
        };
        return 组件配置;
    }
}

export default 视图;