import 消息隧道 from '../类库/消息隧道.mjs';
export default {
    install(app, options) {
        app.config.globalProperties.触发事件 = 消息隧道.触发事件;
        app.config.globalProperties.事件服务 = 消息隧道.事件服务;
    }

}