import 属性 from "./属性.mjs";
import 弹头 from "./弹头.mjs";
import 抛射体 from "./抛射体.mjs";

export default class 武器 {
    注册名 = '';
    类型 = '';
    属性 = {};
    constructor(注册名, 属性) {
        this.注册名 = 注册名;
        this.属性 = 属性;
    }

    static 获取武器(注册名) {
        var 配置 = window.选择的地图.合并后的数据.地图数据.获取配置项(注册名);
        return new 武器(注册名, 配置);
    }

    get 弹头() {
        return 弹头.获取弹头(this.属性.Warhead);
    }

    get 抛射体() {
        return 抛射体.获取抛射体(this.属性.Projectile);
    }

    获取属性列表() {
        var 返回结果 = 属性.获取所有属性(this.注册名);
        return 返回结果;
    }

};