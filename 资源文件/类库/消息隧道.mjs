
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
}