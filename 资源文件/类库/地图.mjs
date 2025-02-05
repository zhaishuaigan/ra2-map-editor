import 单位 from "./地图/单位.mjs";
import 配置 from "./配置.mjs";
export default class 地图 {
    地图数据 = new 配置();
    原始数据 = new 配置();
    动画数据 = new 配置();

    constructor(地图数据, 原始数据, 动画数据) {

    }

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

    获取地图大小() {
        var 地图配置 = this.地图数据.配置项['Header'];
        return {
            宽度: parseInt(地图配置['Width']),
            高度: parseInt(地图配置['Height'])
        }
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

    /* 触发相关 */

    生成新触发器编号() {
        if (!this.地图数据.配置项['Triggers']) {
            return '01000000';
        }
        var 最大编号 = Object.keys(this.地图数据.配置项['Triggers']).pop();
        console.log('当前最大编号: ', 最大编号);
        最大编号 = parseInt(最大编号);
        最大编号 += 2;
        return 最大编号.toString().padStart(8, '0');
    }

    添加触发器(触发器) {
        var 编号 = this.生成新触发器编号();

    }


    删除触发器(编号) {
        this.地图数据.删除属性值('Triggers', 编号);
        this.地图数据.删除属性值('Events', 编号);
        this.地图数据.删除属性值('Actions', 编号);
        var 标签配置 = this.地图数据.配置项['Tags'];
        for (var 标签编号 in 标签配置) {
            var 标签对应的触发器编号 = 标签配置[标签编号].split(',').pop()
            if (标签对应的触发器编号 == 编号) {
                this.地图数据.删除属性值('Tags', 标签编号);
            }
        }
    }

    更新触发器(触发器) {


    }

    获取所有触发器() {
        var 标签配置 = this.地图数据.配置项['Tags'];
        var 触发器配置 = this.地图数据.配置项['Triggers'];
        var 事件配置 = 触发器配置['Events'];
        var 行为配置 = 触发器配置['Actions'];
        var 所有触发器 = [];
        for (var 编号 in 标签配置) {
            var 触发器 = new 触发器(编号, 标签配置, 事件配置, 行为配置);
            所有触发器.push(触发器);
        }
        return 所有触发器;

    }
    /* 触发 结束 */



    获取所有作战小队() {

    }

    添加属性值(配置项, 属性名, 属性值) {
        this.地图数据.添加属性值(配置项, 属性名, 属性值);
    }

    删除属性值(配置项, 属性名) {
        this.地图数据.删除属性值(配置项, 属性名);
    }

    修改属性值(配置项, 属性名, 属性值) {
        this.地图数据.修改属性值(配置项, 属性名, 属性值);
    }

    生成一个可用的触发器标识() {

    }

    获取单位(单位注册名) {
        var 单位数据 = { ...this.合并后的地图数据[单位注册名] }
        var 动画注册名 = 单位数据.Image ? 单位数据.Image : 单位注册名;
        var 动画数据 = { ...this.合并后的动画数据[动画注册名] }
        return new 单位(单位数据, 动画数据);
    }

    获取缩略图数据() {
        return this.地图数据.拼接配置项的值('PreviewPack');
    }

    获取地图数据() {
        return this.地图数据.拼接配置项的值('IsoMapPack5');
    }

    生成渲染图() {
        var 数据 = this.地图数据
    }

    生成缩略图(最大宽度, 最大高度) {

    }


}