export default class 动作 {
    动作类型 = "";
    参数 = [];
    constructor(动作配置 = '') {
        var 参数列表 = 动作配置.split(',');
        this.动作类型 = 参数列表.shift();
        this.参数 = 参数列表;
    }

    转换为字符串() {
        return this.动作类型 + ',' + this.参数.join(',');
    }

    static 解析动作列表(动作配置) {
        var 配置列表 = 动作配置.split(',');
        if (配置列表.length == 0) {
            return [];
        }
        var 总数 = 配置列表.shift();
        var 动作列表 = [];
        var 动作参数个数 = 8;;
        for (var i = 0; i < 总数; i++) {
            var 动作参数 = [];
            for (var j = 0; j < 动作参数个数; j++) {
                动作参数.push(配置列表.shift());
            }
            动作列表.push(new 动作(动作参数.join(',')));
        }
        return 动作列表;
    }

}