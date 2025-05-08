
export default class 属性 {
    注册名 = "";
    属性名 = "";
    属性值 = ""
    constructor(注册名, 属性名, 属性值) {
        this.注册名 = 注册名;
        this.属性名 = 属性名;
        this.属性值 = 属性值;
    }

    static 获取所有属性(注册名) {
        var 单位 = window.选择的地图.合并后的数据.地图数据.获取配置项(注册名);
        var 新增的属性 = [];
        var 修改的属性 = [];
        var 默认的属性 = [];
        var 排序后结果 = [];
        var 未排序结果 = [];
        for (var 属性名 in 单位) {
            var 属性值 = 单位[属性名];
            var 当前属性 = new 属性(注册名, 属性名, 属性值);
            未排序结果.push(当前属性);
            if (当前属性.新增) {
                新增的属性.push(当前属性);
            } else if (当前属性.已修改) {
                修改的属性.push(当前属性);
            } else {
                默认的属性.push(当前属性);
            }
        }
        排序后结果 = [...新增的属性, ...修改的属性, ...默认的属性];
        // return 未排序结果;
        return 排序后结果;
    }

    get 有默认值() {
        return window.选择的地图.有默认配置(this.注册名, this.属性名);
    }

    get 默认值() {
        return window.选择的地图.获取默认值(this.注册名, this.属性名);
    }

    get 新增() {
        return !this.有默认值;
    }

    get 已修改() {
        return this.有默认值 && this.属性值 != this.默认值;
    }

    get 说明() {
        var 翻译 = window.属性名翻译.配置项;
        for (var 注册名 in 翻译) {
            for (var 属性名 in 翻译[注册名]) {
                if (this.属性名 === 属性名) {
                    return 翻译[注册名][this.属性名];
                }
            }
        }
        return '暂无翻译';

    }
}