<script>
import 消息隧道 from '../类库/消息隧道.mjs';

export default 视图.创建组件({
    数据: {
        消息隧道: null
    },
    挂载() {
        this.监听地图偏移消息();
    },
    方法: {
        监听地图偏移消息() {
            this.消息隧道 = new 消息隧道("地图偏移");
            this.消息隧道.监听消息((消息) => {
                if (消息.类型 = "大地图偏移") {
                    this.设置小地图聚焦点(消息.左边偏移百分比, 消息.上边偏移百分比);
                }
            });
        },
        点击小地图(e) {
            var 小地图 = this.$refs.小地图;
            var 点击坐标X = e.offsetX;
            var 点击坐标Y = e.offsetY;
            var 小地图宽度 = e.target.offsetWidth;
            var 小地图高度 = e.target.offsetHeight;

            var 新坐标X = 点击坐标X - 15;
            var 新坐标Y = 点击坐标Y - 10;
            if (新坐标X < 0) {
                新坐标X = 0;
            }
            if (新坐标Y < 0) {
                新坐标Y = 0;
            }
            if (新坐标X > 小地图宽度 - 30) {
                新坐标X = 小地图宽度 - 30;
            }
            if (新坐标Y > 小地图高度 - 20) {
                新坐标Y = 小地图高度 - 20;
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
            this.消息隧道.发送消息({
                消息类型: '小地图偏移',
                左边偏移百分比,
                上边偏移百分比
            });
        },
        设置小地图聚焦点(左边偏移百分比, 上边偏移百分比) {
            var 小地图 = this.$refs.小地图
            小地图.style.setProperty('--left', 左边偏移百分比 + '%');
            小地图.style.setProperty('--top', 上边偏移百分比 + '%');
        }
    }

});
</script>
<template>
    <section>
        <div class="smallMap">
            <div class="box">
                <div class="panel" ref="小地图">
                    <img :src="'./资源文件/测试文件/不公平的熬鹰地时间.png'" @click="点击小地图" alt="">
                </div>
            </div>
        </div>
        <div class="items">

        </div>
        <div class="footer">

        </div>
    </section>
</template>