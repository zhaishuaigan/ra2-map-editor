export default class 文件 {
    文件句柄 = null;
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
        await this.文件句柄.requestPermission({ mode: 'readwrite' });
        const 文件内容 = await this.文件句柄.getFile();
        return await 文件内容.text();
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
}