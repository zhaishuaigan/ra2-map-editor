import 文件 from "./文件.mjs";
export default class 目录 {
    句柄 = null;
    constructor(目录句柄) {
        this.句柄 = 目录句柄;
    }

    static async 打开目录(访问模式 = "readwrite") {
        const 目录句柄 = await window.showDirectoryPicker({
            mode: 访问模式
        })
        return new 目录(目录句柄);
    }

    async 获取子文件列表() {
        const 子文件列表 = [];
        for await (const 子文件 of this.句柄.values()) {
            if (子文件.kind == "file") {
                子文件列表.push(new 文件(子文件));
            }
        }
        return 子文件列表;
    }

    async 获取子目录列表() {
        const 子目录列表 = [];
        for await (const 子目录 of this.句柄.values()) {
            if (子目录.kind == "directory") {
                子目录列表.push(new 目录(子目录));
            }
        }
        return 子目录列表;

    }

    async 创建子目录(子目录名) {
        const 子目录句柄 = await this.句柄.getDirectoryHandle(子目录名, {
            create: true
        });
        return new 目录(子目录句柄);
    }
    async 创建子文件(子文件名, 内容 = '') {
        const 子文件句柄 = await this.句柄.getFileHandle(子文件名, {
            create: true
        });
        const 新文件 = new 文件(子文件句柄);
        await 新文件.写入(内容);
        return 新文件;
    }
    async 删除子目录(子目录名) {
        await this.句柄.removeEntry(子目录名);
    }

    async 删除子文件(子文件名) {
        await this.句柄.removeEntry(子文件名);
    }

    get 名字() {
        return this.句柄.name;
    }

    async 获取所有子文件名字() {
        var 文件名列表 = [];
        for await (var 文件名 of this.句柄.keys()) {
            文件名列表.push(文件名);
        }
        return 文件名列表;
    }

    static async 获取缓存目录() {
        return navigator.storage.getDirectory('缓存');
    }

    async 文件是否存在(文件名) {
        return await this.句柄.getFileHandle(文件名).then(() => true).catch(() => false);
    }

    async 目录是否存在(目录名) {
        return await this.句柄.getDirectoryHandle(目录名).then(() => true).catch(() => false);
    }

    async 获取子文件(文件名) {
        if (!await this.文件是否存在(文件名)) {
            return null;
        }
        return new 文件(await this.句柄.getFileHandle(文件名));
    }

}