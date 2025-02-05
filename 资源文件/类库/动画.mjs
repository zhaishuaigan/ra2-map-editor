import 配置 from "./配置.mjs";

export default class 动画 {

    /**
     * @type {配置}
     */
    配置 = {};

    async 加载默认动画() {
        var 配置内容 = await fetch("/资源文件/配置/默认位置/尤里的复仇/artmd.ini").then(res => res.text());
        this.配置 = new 配置(配置内容);
    }

    加载配置(配置) {
        this.配置 = 配置;
    }

}