import 配置 from "./配置.js";
export default class 地图 {
    地图数据 = {};
    原始数据 = {};
    动画数据 = {};
    async 加载地图(地图数据) {
        this.地图数据 = new 配置(地图数据);
        await this.地图数据.异步解析();
    }

    async 加载原始数据(原始数据) {
        this.原始数据 = new 配置(原始数据);
        await this.原始数据.异步解析();
    }

    async 加载动画(动画数据) {
        this.动画数据 = new 配置(动画数据);
        await this.动画数据.异步解析();
    }



    获取版本号() {
        if (this.地图数据.配置项['FA2spVersionControl'] && this.地图数据.配置项['FA2spVersionControl']['Version']) {
            return parseInt(this.地图数据.配置项['FA2spVersionControl']['Version']);
        }
    }

    获取单位图标(单位注册名) {
    }

    获取测试运行的参数() {
        return this.地图数据.配置项['FA2spMapTesterConfig'];
    }

    获取所有路径点() {
        return this.地图数据.配置项['Waypoints'];
    }

    获取所有建筑() {

    }

    获取所有防御设施() {

    }

    获取所有步兵() {

    }

    获取所有战车和飞机() {

    }

    获取所有触发器() {

    }

    获取所有作战小队() {

    }

    添加属性值(配置项, 属性名, 属性值) {
        this.地图数据.添加属性值(配置项, 属性名, 属性值);
    }

    修改属性值(配置项, 属性名, 属性值) {
        this.地图数据.修改属性值(配置项, 属性名, 属性值);
    }


}