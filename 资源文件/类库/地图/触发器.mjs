import 事件 from "./事件.mjs"
import 动作 from "./动作.mjs"
import 标签 from "./标签.mjs"

export default class 触发器 {
    国家标识 = "";
    关联触发 = "";
    所属方 = "";
    禁用 = "0";
    简单 = "0";
    中等 = "0";
    困难 = "0";

    标签 = null;
    事件列表 = [];
    动作列表 = [];

    constructor() {
        
    }

    添加事件(事件) {
        this.事件列表.push(事件);
    }

    添加动作(动作) {
        this.动作列表.push(动作);
    }
    添加标签(标签) {
        this.标签 = 标签;
    }

}