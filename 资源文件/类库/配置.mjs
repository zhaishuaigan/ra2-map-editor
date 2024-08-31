
export default class 配置 {
    配置内容 = "";
    配置项 = {};
    编辑过的配置项 = new Set();
    constructor(配置内容) {
        this.配置内容 = 配置内容;
    }

    async 异步解析() {
        return scheduler.postTask(() => this.同步解析(), {
            priority: 'user-visible',
        });
    }

    同步解析() {
        let 所有行 = this.配置内容.split("\n");
        let 配置项 = "";
        for (let 单行 of 所有行) {
            单行 = 单行.trim();
            if (单行.length == 0) continue;
            if (单行.startsWith(";") || 单行.startsWith("#")) continue;
            if (单行.startsWith("[")) {
                配置项 = 单行.substring(1, 单行.length - 1);
                this.配置项[配置项] = {};
            } else {
                let 单行分割 = 单行.split("=");
                let 键 = 单行分割.shift().trim();
                let 值 = 单行分割.join('=').trim();
                this.配置项[配置项][键] = 值;
            }
        }
    }

    获取配置项(配置项) {
        return this.配置项[配置项];
    }

    添加属性值(配置项, 键, 值) {
        if (!this.配置项[配置项]) { this.配置项[配置项] = {}; }
        this.配置项[配置项][键] = 值;
        this.编辑过的配置项.add(配置项);

    }

    修改属性值(配置项, 键, 值) {
        if (!this.配置项[配置项]) { this.配置项[配置项] = {}; }
        this.配置项[配置项][键] = 值;
        this.编辑过的配置项.add(配置项);
    }

}