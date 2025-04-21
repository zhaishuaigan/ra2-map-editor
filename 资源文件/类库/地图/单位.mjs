export default class 单位 {
    注册名 = '';
    属性 = {};
    动画 = {};
    constructor(注册名, 属性, 动画) {
        this.注册名 = 注册名;
        this.属性 = 属性;
        this.动画 = 动画;
    }
    get 显示名() {
        if (this.属性 && this.属性.UIName) {
            var 标识 = this.属性.UIName.toLowerCase();
            if (标识 in window.字库.配置项.csf) {
                return window.字库.配置项.csf[标识];
            }
            return this.属性.UIName;
        }

        if ('Name' in this.属性) {
            return this.属性.Name;
        }
        return "";
    }

    get 图标() {
        if (this.动画 && this.动画.Cameo) {
            return `/资源文件/图片/单位图标/${this.动画.Cameo.toLowerCase()}.png`;
        }
        return '/资源文件/图片/单位图标/xxicon.png';
    }

    get 可以建造() {
        if ('TechLevel' in this.属性 && this.属性.TechLevel < 11 && this.属性.TechLevel >= 0) {
            return true;
        }
        return false;

    }

    get 所有武器() {
        return [

        ];
    }

}