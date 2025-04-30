export default class 消息隧道 {

    隧道 = null;

    constructor(隧道名字) {
        this.隧道 = new BroadcastChannel(隧道名字);
    }

    发送消息(消息) {
        this.隧道.postMessage(消息);
    }

    监听消息(回调函数) {
        this.隧道.onmessage = (消息) => {
            回调函数(消息.data);
        }
    }

    关闭隧道() {
        this.隧道.close();
    }

    static 数据服务(组件) {
        new 消息隧道("数据服务").监听消息((数据) => {
            for (var 标识 in 数据) {
                if (标识 in 组件 && typeof 组件[标识] != 'function') {
                    组件[标识] = 数据[标识];
                }
            }
        });
    }

    static 设置数据(数据) {
        (new 消息隧道("数据服务")).发送消息(数据);
    }

    static 监听数据(标识, 回调) {
        new 消息隧道("数据服务").监听消息((数据) => {
            if (标识 in 数据) {
                回调(数据[标识]);
            }
        });
    }

    static 事件服务(组件) {
        (new 消息隧道("事件服务")).监听消息((事件) => {
            for (var 标识 in 事件) {
                if (标识 in 组件 && typeof 组件[标识] == 'function') {
                    if (Array.isArray(事件[标识])) {
                        组件[标识](...事件[标识]);
                    } else {
                        组件[标识](事件[标识]);
                    }
                }
            }
        });
    }

    static 触发事件(事件名, 参数 = []) {
        new 消息隧道("事件服务").发送消息({
            [事件名]: 参数
        });
    }
}