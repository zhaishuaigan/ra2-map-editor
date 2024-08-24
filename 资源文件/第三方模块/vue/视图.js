import 模块 from "./模块.js";
window['视图'] = class 视图 {

    static 创建(界面) {
        var 应用程序 = Vue.createApp(模块.异步加载(界面))
        应用程序.use(ElementPlus);
        应用程序.mount(document.body);
        return 应用程序;
    }

    static 创建组件(配置 = {}) {
        var 所有组件 = {};
        if (配置.组件) {
            var 序号 = 0;
            for (var 名字 of 配置.组件) {
                所有组件['View' + 名字] = 模块.异步加载(名字);
                序号++;
            }
        }
        var 组件配置 = {
            components: 所有组件,
            data() {
                return 配置.数据 ? 配置.数据 : {};
            },
            mounted() {
                配置.挂载 ? 配置.挂载.apply(this) : null;
            },
            watch: 配置.监听 ? 配置.监听 : {},
            computed: 配置.计算属性 ? 配置.计算属性 : {},
            methods: 配置.方法 ? 配置.方法 : {},
            template: 配置.模板 ? 配置.模板 : '',
        }
        return 组件配置;
    }
}

export default 视图;