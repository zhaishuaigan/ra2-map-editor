
export default class 配置 {
    配置内容 = "";
    配置项 = {};
    编辑过的配置项 = new Set();
    constructor(配置内容 = '') {
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
            单行 = 单行.replace(/\;.*/, '').trim();
            if (单行.length == 0) continue;
            if (单行.startsWith(";") || 单行.startsWith("#")) continue;
            if (单行.startsWith("[")) {
                配置项 = 单行.substring(1, 单行.length - 1);
                if (配置项 in this.配置项) {
                    continue;
                }
                this.配置项[配置项] = {};
            } else {
                let 单行分割 = 单行.split("=");
                let 属性名 = 单行分割.shift().trim();
                let 值 = 单行分割.join('=').trim();
                this.配置项[配置项][属性名] = 值;
            }
        }
    }

    获取配置项(配置项) {
        return this.配置项[配置项];
    }

    添加属性值(配置项, 属性名, 值) {
        if (!this.配置项[配置项]) { this.配置项[配置项] = {}; }
        this.配置项[配置项][属性名] = 值;
        this.编辑过的配置项.add(配置项);

    }

    删除属性值(配置项, 属性名) {
        if (!this.配置项[配置项] || !this.配置项[配置项][属性名]) {
            return false;
        }
        delete this.配置项[配置项][属性名]
        this.编辑过的配置项.add(配置项);
        return true;
    }

    修改属性值(配置项, 属性名, 值) {
        if (!this.配置项[配置项]) { this.配置项[配置项] = {}; }
        this.配置项[配置项][属性名] = 值;
        this.编辑过的配置项.add(配置项);
    }

    生成配置文件() {
        let 配置内容 = "";
        for (let 配置项 of Object.keys(this.配置项)) {
            配置内容 += "[" + 配置项 + "]\n";
            for (let 属性名 of Object.keys(this.配置项[配置项])) {
                配置内容 += 属性名 + "=" + this.配置项[配置项][属性名] + "\n";
            }
        }
        return 配置内容;
    }

    获取更新后的配置内容() {


    }

    获取配置项的所有属性名(配置项) {
        return Object.keys(this.配置项[配置项]);
    }

    拼接配置项的值(配置项) {
        let 配置项内容 = "";
        for (let 属性名 of Object.keys(this.配置项[配置项])) {
            配置项内容 += this.配置项[配置项][属性名] + "\n";
        }
        return 配置项内容;
    }

    static 合并配置(配置1, 配置2) {
        let 合并后的配置 = new 配置("");
        合并后的配置.配置项 = JSON.parse(JSON.stringify(配置1.配置项));
        for (let 配置项 of 配置2.配置项) {
            for (let 属性名 of Object.keys(配置2.配置项[配置项])) {
                合并后的配置.配置项[配置项][属性名] = 配置2.配置项[配置项][属性名];
            }
        }
        return 合并后的配置;
    }

}