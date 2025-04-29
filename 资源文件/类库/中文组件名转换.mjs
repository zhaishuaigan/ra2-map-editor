export default class 中文组件名转换 {
    static 中文转编码(中文) {
        var 返回值 = '';
        for (var i = 0; i < 中文.length; i++) {
            返回值 += "u" + 中文.charCodeAt(i).toString(16);
        }
        return 返回值;
    }

    static 编码转中文(编码) {
        var 返回值 = '';
        var 编码数组 = 编码.split('u');
        for (var i = 1; i < 编码数组.length; i++) {
            返回值 += String.fromCharCode(parseInt(编码数组[i], 16));
        }
        return 返回值;
    }

}