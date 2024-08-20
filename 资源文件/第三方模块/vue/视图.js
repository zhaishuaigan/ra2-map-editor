import { loadModule as 加载模块 } from './vue3-sfc-loader.esm.js'
export default class 视图 {
    元素标识 = '';
    配置 = {};
    实例 = null;

    constructor(元素标识, 配置 = {}) {
        this.元素标识 = 元素标识;
        this.配置 = 配置;
    }
    渲染() {
        var 当前视图 = this;
        当前视图.实例 = Vue.createApp({
            components: 当前视图.配置.组件 ? 当前视图.配置.组件 : {},
            data() {
                return 当前视图.配置.数据 ? 当前视图.配置.数据 : {};
            },
            mounted() {
                当前视图.配置.挂载 ? 当前视图.配置.挂载() : null;
            },
            watch: 当前视图.配置.监听 ? 当前视图.配置.监听 : {},
            computed: 当前视图.配置.计算属性 ? 当前视图.配置.计算属性 : {},
            methods: 当前视图.配置.方法 ? 当前视图.配置.方法 : {},
            template: 当前视图.配置.模板 ? 当前视图.配置.模板 : ''
        }).mount(当前视图.元素标识)
    }

    static 异步加载界面(路径) {
        return Vue.defineAsyncComponent(() => 加载模块(路径, 视图.获取界面配置()));
    }

    static 获取界面配置() {
        return {
            moduleCache: {
                vue: Vue,
            },
            async getFile(url) {
                const res = await fetch('./资源文件/界面/' + url);
                if (!res.ok) {
                    throw Object.assign(new Error(url + ' ' + res.statusText), { res });
                }
                return await res.text();
            },
            addStyle(textContent) {
                const style = Object.assign(document.createElement('style'), { textContent });
                const ref = document.head.getElementsByTagName('style')[0] || null;
                document.head.insertBefore(style, ref);
            },

            log(type, ...args) {
                console[type](...args);
            },
            compiledCache: {
                set(key, str) {
                    window.localStorage.setItem(key, str);
                },
                get(key) {
                    return window.localStorage.getItem(key);
                },
            },

            handleModule(type, source, path, options) {
                if (type === '.json') {
                    return JSON.parse(source);
                }
            }
        };
    }

    static 创建(元素标识, 配置 = {}) {
        var 新视图 = new 视图(元素标识, 配置);
        return 新视图;
    }
}