<script>
var 消息服务 = new 消息隧道("地图偏移");
export default {
    data() {
        return {
            默认图片: '/资源文件/图片/小地图默认图片.png',
            小地图图片: '/资源文件/测试文件/不公平的熬鹰地时间.png',
            已选择地图: false
        }
    },
    mounted() {
        消息隧道.数据服务(this);
        this.监听地图偏移消息();
    },
    methods: {
        监听地图偏移消息() {

            消息服务.监听消息((消息) => {
                switch (消息.消息类型) {
                    case "大地图偏移":
                        this.设置小地图聚焦点(消息.左边偏移百分比, 消息.上边偏移百分比);
                        break;
                    case "地图区域大小改变":

                        var 缩放比例 = {
                            宽度: 消息.可视宽度 / 消息.实际宽度,
                            高度: 消息.可视高度 / 消息.实际高度
                        };
                        var 小地图 = this.$refs.小地图;
                        var 小地图宽度 = 小地图.offsetWidth;
                        var 小地图高度 = 小地图.offsetHeight;
                        this.设置聚焦框的大小(小地图宽度 * 缩放比例.宽度, 小地图高度 * 缩放比例.高度);
                        break;
                }
            });
        },
        点击小地图(e) {
            var 小地图 = this.$refs.小地图;
            var 点击坐标X = e.offsetX;
            var 点击坐标Y = e.offsetY;
            var 小地图宽度 = e.target.offsetWidth;
            var 小地图高度 = e.target.offsetHeight;

            var 聚焦框 = {
                宽度: parseInt(小地图.style.getPropertyValue('--width')),
                高度: parseInt(小地图.style.getPropertyValue('--height'))
            };

            var 新坐标X = 点击坐标X - 聚焦框.宽度 / 2;
            var 新坐标Y = 点击坐标Y - 聚焦框.高度 / 2;
            if (新坐标X < 0) {
                新坐标X = 0;
            }
            if (新坐标Y < 0) {
                新坐标Y = 0;
            }
            if (新坐标X > 小地图宽度 - 聚焦框.宽度) {
                新坐标X = 小地图宽度 - 聚焦框.宽度;
            }
            if (新坐标Y > 小地图高度 - 聚焦框.高度) {
                新坐标Y = 小地图高度 - 聚焦框.高度;
            }
            小地图.style.setProperty('--left', 新坐标X + 'px');
            小地图.style.setProperty('--top', 新坐标Y + 'px');

            var 左边偏移百分比 = 新坐标X / 小地图宽度 * 100;
            var 上边偏移百分比 = 新坐标Y / 小地图高度 * 100;
            if (左边偏移百分比 < 0) {
                左边偏移百分比 = 0;
            }
            if (上边偏移百分比 < 0) {
                上边偏移百分比 = 0;
            }
            消息服务.发送消息({
                消息类型: '小地图偏移',
                左边偏移百分比,
                上边偏移百分比
            });
        },
        设置小地图聚焦点(左边偏移百分比, 上边偏移百分比) {
            var 小地图 = this.$refs.小地图;
            小地图.style.setProperty('--left', 左边偏移百分比 + '%');
            小地图.style.setProperty('--top', 上边偏移百分比 + '%');
        },
        设置聚焦框的大小(宽度, 高度) {
            var 小地图 = this.$refs.小地图;
            小地图.style.setProperty('--width', parseInt(宽度) + 'px');
            小地图.style.setProperty('--height', parseInt(高度) + 'px');
        }
    }

};
</script>
<template>
    <div class="小地图展示区域">
        <div class="默认图片" v-show="!已选择地图">
            <img :src="默认图片" @click="点击小地图" alt="">
        </div>
        <div class="盒子" ref="小地图" v-show="已选择地图">
            <img :src="小地图图片" @click="点击小地图" alt="">
        </div>
    </div>
</template>
<style>
.小地图展示区域 {
    position: absolute;
    left: 14px;
    top: 3px;
    width: 140px;
    height: 110px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.小地图展示区域 .盒子,
.小地图展示区域 .默认图片 {
    max-width: 100%;
    max-height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    --left: 0px;
    --top: 0px;
    --width: 30px;
    --height: 20px;
}

.小地图展示区域 .盒子 img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    border: 1px solid #ffff00;
    box-sizing: border-box;
}

.小地图展示区域 .默认图片 img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    box-sizing: border-box;
}


.小地图展示区域 .盒子::after {
    width: var(--width);
    height: var(--height);
    position: absolute;
    content: '';
    left: var(--left);
    top: var(--top);
    border: 1px solid #ffff00;
    pointer-events: none;
    box-sizing: border-box;
}
</style>
