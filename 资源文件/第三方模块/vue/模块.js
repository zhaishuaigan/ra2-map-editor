import 中文组件名转换 from '../../类库/中文组件名转换.mjs';
import { loadModule } from './vue3-sfc-loader.esm.js'
export default class 模块 {
    static 获取配置() {
        return {
            moduleCache: {
                vue: Vue,
            },
            async getFile(url) {
                var 界面地址 = './资源文件/界面/' + url;
                界面地址 = 界面地址.replace(/\/[^\/]*\/\.\.\//, '/');
                const res = await fetch(界面地址);
                if (!res.ok) {
                    console.error("加载失败: ", res.url);
                    throw Object.assign(new Error(url + ' ' + res.statusText), { res });
                }
                var resText = await res.text();

                if (!界面地址.endsWith('.vue')) {
                    return resText;

                }
                resText = resText.replace(/\<([\u4e00-\u9fa5]+)/g, (参数, 标签) => {
                    return "<V" + 中文组件名转换.中文转编码(标签);
                });
                resText = resText.replace(/\<\/([\u4e00-\u9fa5]+)/g, (参数, 标签) => {
                    return "</V" + 中文组件名转换.中文转编码(标签);
                });
                return resText;
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
                    var 缓存 = window.localStorage.getItem(key);
                    return 缓存;
                },
            },
            handleModule(type, source, path, options) {
                if (type === '.json') {
                    return JSON.parse(source);
                }
                if (type === '.ini') {
                    return source;
                }
            }
        }
    }

    static 异步加载(路径) {
        路径 += '.vue';
        try {
            return Vue.defineAsyncComponent(() => loadModule(路径, 模块.获取配置()));
        } catch (e) {
            console.error("加载模块出错: ", e);
        }

    }
}