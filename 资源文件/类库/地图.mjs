import 单位 from "./地图/单位.mjs";
import 配置 from "./配置.mjs";
export default class 地图 {
    版本 = "尤里的复仇";
    地图文件 = null;
    合并后的数据 = {
        地图数据: new 配置(),
        动画数据: new 配置(),
    };
    地图数据 = new 配置();
    默认配置 = new 配置();
    动画配置 = new 配置();

    constructor(地图目录, 地图文件, 版本 = "尤里的复仇") {
        this.版本 = 版本;
        this.地图目录 = 地图目录;
        this.地图文件 = 地图文件;
    }

    async 加载地图() {
        var 地图文件内容 = await this.地图文件.读取内容();
        var 自定义动画内容 = "";
        // TODO:: 未来实现自定义动画
        this.地图数据 = new 配置(地图文件内容);
        var 默认配置内容 = await 地图.加载默认配置(this.版本, 'rulesmd');
        var 动画配置内容 = await 地图.加载默认配置(this.版本, 'artmd');
        this.默认配置 = new 配置(默认配置内容);
        this.动画配置 = new 配置(动画配置内容);
        this.合并后的数据 = {
            地图数据: new 配置(默认配置内容 + "\n" + 地图文件内容),
            动画数据: new 配置(动画配置内容 + "\n" + 自定义动画内容),
        };

        await this.地图数据.异步解析();
        await this.合并后的数据.地图数据.异步解析();
        await this.合并后的数据.动画数据.异步解析();
        await this.默认配置.异步解析();
        await this.动画配置.异步解析();
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

    获取所有国家() {
        return Object.values(this.地图数据.配置项['Countries'])

    }

    获取所有建筑注册名() {
        return Object.values(this.合并后的数据.地图数据.配置项['BuildingTypes']);
    }

    获取所有建筑() {
        var 所有注册名 = this.获取所有建筑注册名();
        var 地图数据 = this.合并后的数据.地图数据;
        var 动画数据 = this.合并后的数据.动画数据;
        var 返回列表 = [];
        for (var 注册名 of 所有注册名) {
            if (!(注册名 in 地图数据.配置项)) {
                // console.warn(`[${注册名}]有注册, 但是没有配置!`);
                continue;
            }
            var 单位配置 = 地图数据.配置项[注册名];
            var 单位动画 = null;
            if ('Image' in 单位配置) {
                单位动画 = 动画数据.配置项[单位配置.Image];
            } else if (注册名 in 动画数据.配置项) {
                单位动画 = 动画数据.配置项[注册名];
            } else {
                console.warn(`[${注册名}]没有动画配置!`);
                continue;
            }
            返回列表.push(new 单位(注册名, 单位配置, 单位动画));
        }
        return 返回列表;
    }

    获取建筑栏的单位() {
        var 所有建筑 = this.获取所有建筑();
        var 建筑栏单位列表 = [];
        for (var 建筑 of 所有建筑) {
            if (建筑.属性.BuildCat && 建筑.属性.BuildCat != 'Combat') {
                建筑栏单位列表.push(建筑);
            }
        }
        return 建筑栏单位列表;
    }

    获取防御栏的单位() {
        var 所有建筑 = this.获取所有建筑();
        var 建筑栏单位列表 = [];
        for (var 建筑 of 所有建筑) {
            if (建筑.属性.BuildCat == 'Combat') {
                建筑栏单位列表.push(建筑);
            }
        }
        return 建筑栏单位列表;
    }

    获取其他建筑() {
        var 所有建筑 = this.获取所有建筑();
        var 建筑列表 = [];
        for (var 建筑 of 所有建筑) {
            if (!建筑.属性.BuildCat) {
                建筑列表.push(建筑);
            }
        }
        return 建筑列表;
    }

    获取步兵栏的单位() {
        var 所有注册名 = Object.values(this.合并后的数据.地图数据.配置项['InfantryTypes']);
        var 地图数据 = this.合并后的数据.地图数据;
        var 动画数据 = this.合并后的数据.动画数据;
        var 返回列表 = [];
        for (var 注册名 of 所有注册名) {
            if (!(注册名 in 地图数据.配置项)) {
                // console.warn(`[${注册名}]有注册, 但是没有配置!`);
                continue;
            }
            var 单位配置 = 地图数据.配置项[注册名];
            var 单位动画 = null;
            if ('Image' in 单位配置) {
                单位动画 = 动画数据.配置项[单位配置.Image];
            } else if (注册名 in 动画数据.配置项) {
                单位动画 = 动画数据.配置项[注册名];
            } else {
                console.warn(`[${注册名}]没有动画配置!`);
                continue;
            }
            返回列表.push(new 单位(注册名, 单位配置, 单位动画));
        }
        return 返回列表;
    }

    获取战车栏的单位() {
        var 所有注册名 = [
            ...Object.values(this.合并后的数据.地图数据.配置项['VehicleTypes']),
            ...Object.values(this.合并后的数据.地图数据.配置项['AircraftTypes']),
        ];
        var 地图数据 = this.合并后的数据.地图数据;
        var 动画数据 = this.合并后的数据.动画数据;
        var 返回列表 = [];
        for (var 注册名 of 所有注册名) {
            if (!(注册名 in 地图数据.配置项)) {
                // console.warn(`[${注册名}]有注册, 但是没有配置!`);
                continue;
            }
            var 单位配置 = 地图数据.配置项[注册名];
            var 单位动画 = null;
            if ('Image' in 单位配置) {
                单位动画 = 动画数据.配置项[单位配置.Image];
            } else if (注册名 in 动画数据.配置项) {
                单位动画 = 动画数据.配置项[注册名];
            } else {
                console.warn(`[${注册名}]没有动画配置!`);
                continue;
            }
            返回列表.push(new 单位(注册名, 单位配置, 单位动画));
        }
        return 返回列表;
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
        this.合并后的数据.地图数据.添加属性值(配置项, 属性名, 属性值);
    }

    删除属性(注册名, 属性名) {
        this.地图数据.删除属性值(注册名, 属性名);
        if (注册名 in this.默认配置.配置项 && 属性名 in this.默认配置.配置项[注册名]) {
            this.合并后的数据.地图数据.修改属性值(注册名, 属性名, this.默认配置.配置项[注册名][属性名]);
        } else {
            this.合并后的数据.地图数据.删除属性值(注册名, 属性名);
        }
    }

    修改属性值(配置项, 属性名, 属性值) {
        this.地图数据.修改属性值(配置项, 属性名, 属性值);
        this.合并后的数据.地图数据.修改属性值(配置项, 属性名, 属性值);
    }

    生成一个可用的触发器标识() {

    }

    获取单位(单位注册名) {
        var 单位数据 = { ...this.合并后的数据.地图数据.获取配置项(单位注册名) }
        var 动画注册名 = 单位数据.Image ? 单位数据.Image : 单位注册名;
        var 动画数据 = { ...this.合并后的数据.动画数据.获取配置项(动画注册名) }
        return new 单位(单位注册名, 单位数据, 动画数据);
    }

    获取缩略图数据() {
        return this.地图数据.拼接配置项的值('PreviewPack');
    }

    获取地图数据() {
        return this.地图数据.拼接配置项的值('IsoMapPack5');
    }

    生成渲染图() {
    }

    生成缩略图(最大宽度, 最大高度) {

    }

    有地图配置(注册名, 属性名 = null) {
        if (!(注册名 in this.地图数据.配置项)) {
            return false;
        }
        if (属性名 === null) {
            return true;
        }
        if (属性名 in this.地图数据.配置项[注册名]) {
            return true;
        }
        return false;
    }

    有默认配置(注册名, 属性名 = null) {
        if (!(注册名 in this.默认配置.配置项)) {
            return false;
        }
        if (属性名 === null) {
            return true;
        }
        if (属性名 in this.默认配置.配置项[注册名]) {
            return true;
        }
        return false;
    }

    获取默认值(注册名, 属性名 = null) {
        if (!(注册名 in this.默认配置.配置项)) {
            return null;
        }
        if (属性名 === null) {
            return this.默认配置.配置项[注册名];
        }
        if (属性名 in this.默认配置.配置项[注册名]) {
            return this.默认配置.配置项[注册名][属性名];
        }
        return null;
    }

    static async 加载默认配置(版本, 配置名) {
        var 返回值 = await fetch(`/资源文件/配置/默认配置/${版本}/${配置名}.ini`);
        返回值 = await 返回值.text();
        return 返回值;
    }


}