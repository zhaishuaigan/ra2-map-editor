import 目录 from "./目录.mjs";

export default class 项目 {
    项目目录 = null;
    地图文件 = null;

    constructor(项目目录, 地图文件 = null) {
        this.项目目录 = 项目目录;
        this.地图文件 = 地图文件;
    }

    static async 打开项目目录() {
        this.项目目录 = await 目录.打开目录();
        var 文件列表 = await this.项目目录.获取子文件列表();
        var 地图文件列表 = 文件列表.filter(文件 => ['yrm', 'mpr'].includes(文件.扩展名));
    }
}