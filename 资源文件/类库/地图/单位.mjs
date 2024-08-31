export default class 单位 {
    属性 = {};
    动画 = {};
    constructor(属性, 动画) {
        this.属性 = 属性;
        this.动画 = 动画;
    }
    get 显示名() {
        return "";
    }

    get 图标() {
        if (this.动画 && this.动画.Cameo) {
            return this.动画.Cameo;
        }
        return "";
    }

    get 所有武器() {
        return [

        ];
    }

}