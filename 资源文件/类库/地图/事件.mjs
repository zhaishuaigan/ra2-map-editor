export default class 事件 {
    事件类型 = "";
    参数 = [];
    constructor(事件配置) {
        var 参数列表 = 事件配置.split(',');
        this.事件类型 = 参数列表.shift();
        this.参数 = 参数列表;
    }

    static 解析事件列表(事件配置) {
        var 配置列表 = 事件配置.split(',');
        if (配置列表.length == 0) {
            return [];
        }
        var 总数 = 配置列表.shift();
        var 列表 = [];
        var 参数个数 = 3;
        for (var i = 0; i < 总数; i++) {
            var 参数 = [];
            for (var j = 0; j < 参数个数; j++) {
                参数.push(配置列表.shift());
            }
            列表.push(new 事件(参数.join(',')));
        }
        return 列表;
    }

}