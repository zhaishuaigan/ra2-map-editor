import 视图 from "../第三方模块/vue/视图.js";
import 消息隧道 from '../类库/消息隧道.mjs';
import 配置 from '../类库/配置.mjs';

(async function () {
    window.属性名翻译 = await 配置.加载配置文件('属性名翻译.ini');
    window.属性值翻译 = await 配置.加载配置文件('属性值翻译.ini');
    window.视图 = 视图;
    window.消息隧道 = 消息隧道;
    视图.创建('主界面');
})();