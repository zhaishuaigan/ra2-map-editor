import 属性 from './属性.mjs';
import 武器 from './武器.mjs';
export default class 单位 {
    注册名 = '';
    属性 = {};
    动画 = {};
    constructor(注册名, 属性, 动画) {
        this.注册名 = 注册名;
        this.属性 = 属性;
        this.动画 = 动画;
    }
    get 显示名() {
        if (this.属性 && this.属性.UIName) {
            var 标识 = this.属性.UIName.toLowerCase();
            if (标识 in window.字库.配置项.csf) {
                return window.字库.配置项.csf[标识];
            }
            return this.属性.UIName;
        }

        if ('Name' in this.属性) {
            return this.属性.Name;
        }
        return "";
    }

    get 图标() {
        if (this.动画 && this.动画.Cameo) {
            return `/资源文件/图片/单位图标/${this.动画.Cameo.toLowerCase()}.png`;
        }
        return '/资源文件/图片/单位图标/xxicon.png';
    }

    get 可以建造() {
        if ('TechLevel' in this.属性 && this.属性.TechLevel < 11 && this.属性.TechLevel >= 0) {
            return true;
        }
        return false;
    }

    get 不能建造() {
        return !this.可以建造;
    }

    get 新添加() {
        // 如果rules中没有这个注册名，则返回true, 否则返回false
        if (this.注册名 in window.选择的地图.默认配置.配置项) {
            return false;
        }
        return true;
    }

    get 拥有武器() {
        var 武器属性列表 = [
            'Primary',
            'ElitePrimary',
            'Secondary',
            'EliteSecondary',
            'SuperWeapon',
            'Weapon1',
            'EliteWeapon1',
            'DeathWeapon',
        ];

        for (var 属性名 of 武器属性列表) {
            if (属性名 in this.属性) {
                return true;
            }
        }
        return false;

    }

    get 已被修改() {
        if (!window.选择的地图) {
            return false;
        }
        var 地图的配置项 = Object.keys(window.选择的地图.地图数据.配置项);
        if (地图的配置项.includes(this.注册名)) {
            return true;
        }
        return false;

    }
    get 所有武器() {
        var 武器属性列表 = [
            'Primary',
            'ElitePrimary',
            'Secondary',
            'EliteSecondary',
            'SuperWeapon',
            'Weapon1',
            'EliteWeapon1',
            'DeathWeapon',
        ];

        武器属性列表 = 武器属性列表.filter(属性名 => {
            if (属性名 in this.属性) {
                return true;
            }
            return false;
        });

        if ('WeaponCount' in this.属性) {
            for (var i = 0; i < this.属性.WeaponCount; i++) {
                if (this.属性[`Weapon${i}`]) {
                    武器属性列表.push(`Weapon${i}`);
                }
                if (this.属性[`EliteWeapon${i}`]) {
                    武器属性列表.push(`EliteWeapon${i}`);
                }
            }
        }

        var 返回结果 = [];

        for (var 属性名 of 武器属性列表) {
            var 当前武器 = 武器.获取武器(this.属性[属性名]);
            当前武器.类型 = 属性名
            返回结果.push(当前武器);
        }
        return 返回结果;
    }

    获取属性默认配置(属性名) {
        return window.选择的地图.获取默认值(this.注册名, 属性名);
    }

    有属性默认配置(属性名) {
        return window.选择的地图.有默认配置(this.注册名, 属性名);
    }

    属性被修改(属性名) {
        return this.有属性默认配置(属性名) && this.属性[属性名] != this.获取属性默认配置(属性名);
    }

    获取属性列表() {
        return 属性.获取所有属性(this.注册名);
    }

}