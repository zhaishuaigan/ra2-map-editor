export default class 文件 {
    文件句柄 = null;
    文件监听器 = null;
    constructor(文件句柄) {
        this.文件句柄 = 文件句柄;
    }
    static async 打开一个文件(参数 = {}) {
        const [fileHandle] = await window.showOpenFilePicker(参数);
        if (!fileHandle) {
            // 用户取消了选择
            return null;

        }
        return new 文件(fileHandle);
    }

    async 写入(内容) {
        const 可写对象 = await this.文件句柄.createWritable();
        await 可写对象.write(内容);
        await 可写对象.close();
    }

    async 追加(内容) {
        const 可写对象 = await this.文件句柄.createWritable({ keepExistingData: true });
        await 可写对象.write(内容);
        await 可写对象.close();
    }

    async 读取内容() {
        if (!this.文件句柄) { return '' };
        await this.文件句柄.requestPermission({ mode: 'readwrite' });
        const 文件内容 = await this.文件句柄.getFile();
        return await 文件内容.text();
    }

    async 使用国标编码读取内容() {
        if (!this.文件句柄) { return '' };
        await this.文件句柄.requestPermission({ mode: 'readwrite' });
        var 文件对象 = await this.文件句柄.getFile();
        return await new Promise((resolve, reject) => {
            var 读取器 = new FileReader();
            读取器.onload = function (event) {
                var arrayBuffer = event.target.result;
                var decoder = new TextDecoder('gb18030');
                var text = decoder.decode(new Uint8Array(arrayBuffer));
                resolve(text);
            };
            读取器.readAsArrayBuffer(文件对象);
        });
    }

    async 使用国标编码写入内容(内容) {
        await this.文件句柄.requestPermission({ mode: 'readwrite' });
        var 可写对象 = await this.文件句柄.createWritable();
        可写对象.write(转国标(内容));
        可写对象.close();
    }

    async 删除() {
        await this.文件句柄.requestPermission({ mode: 'readwrite' });
        await this.文件句柄.remove();
    }

    async 重命名(新名称) {
        await this.文件句柄.requestPermission({ mode: 'readwrite' });
        await this.文件句柄.rename(新名称);
    }
    async 创建副本(新名称) {
        await this.文件句柄.requestPermission({ mode: 'readwrite' });
        await this.文件句柄.copyTo(新名称);
    }
    get 文件名() {
        return this.文件句柄.name;
    }
    get 扩展名() {
        return this.文件句柄.name.split('.').pop();
    }

    async 复制到(新文件) {
        await 新文件.文件句柄.requestPermission({ mode: 'readwrite' });
        var 可写对象 = await 新文件.文件句柄.createWritable();
        可写对象.write(await this.文件句柄.getFile());
        可写对象.close();
    }

    监控文件(回调函数) {
        this.文件监听器 = new FileSystemObserver((records, observer) => {
            for (const record of records) {
                console.log("检测到的变化：", record);
                console.log(`观察到的变更为 ${record.changedHandle.kind} ${record.changedHandle.name}。类型：${record.type}。`);
                回调函数(record);
            }
        });
        this.文件监听器.observe(this.文件句柄);

    }
    停止监控文件() {
        if (!this.文件监听器) return;
        this.文件监听器.disconnect();
    }
}