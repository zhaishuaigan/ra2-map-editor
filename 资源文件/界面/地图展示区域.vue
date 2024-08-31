<script>
import 消息隧道 from '../类库/消息隧道.mjs';

export default 视图.创建组件({
    数据: {
        预览图地址: './资源文件/测试文件/不公平的熬鹰地时间.png',
        消息隧道: null,
    },
    挂载() {
        // console.log('地图展示区加载完成');
        this.绑定地图平移事件();
        this.绑定消息处理事件();
    },
    方法: {
        居中显示地图() {
            setTimeout(() => {
                this.移动视角(40, 40);
                this.消息隧道.发送消息({
                    消息类型: '大地图偏移',
                    左边偏移百分比: 40,
                    上边偏移百分比: 40
                });
            }, 1000);
        },
        绑定消息处理事件() {
            this.消息隧道 = new 消息隧道('地图偏移');
            this.消息隧道.监听消息((消息) => {
                if (消息.消息类型 == '小地图偏移') {
                    this.移动视角(消息.左边偏移百分比, 消息.上边偏移百分比);
                }
            });

            new 消息隧道("事件").监听消息((消息) => {
                if (消息.消息类型 == '用户选择地图') {
                    // this.居中显示地图();
                    console.log('用户选择地图: ', 消息);
                }
            });
        },
        移动视角(左边偏移百分比, 上边偏移百分比) {
            var 地图区域 = this.$refs.地图区域;
            var 地图宽度 = 地图区域.scrollWidth;
            var 地图高度 = 地图区域.scrollHeight;
            var 左边偏移 = 左边偏移百分比 / 100 * 地图宽度;
            var 上边偏移 = 上边偏移百分比 / 100 * 地图高度;
            地图区域.scrollLeft = 左边偏移;
            地图区域.scrollTop = 上边偏移;
        },
        绑定地图平移事件() {
            // 按住鼠标右键拖动地图区域
            var 当前组件 = this;
            var 地图区域 = this.$refs.地图区域;
            var 鼠标右键被按下 = false;
            var 开始坐标X = 0;
            var 开始坐标Y = 0;
            var 结束坐标X = 0;
            var 结束坐标Y = 0;
            var 移动坐标X = 0;
            var 移动坐标Y = 0;
            地图区域.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            })
            地图区域.addEventListener('mousedown', function (e) {
                if (e.button == 2) {
                    鼠标右键被按下 = true;
                    开始坐标X = e.clientX;
                    开始坐标Y = e.clientY;
                }
            });
            var 右键按下移动鼠标的定时器 = null;
            document.addEventListener('mousemove', function (e) {
                if (鼠标右键被按下) {
                    if (右键按下移动鼠标的定时器) {
                        clearInterval(右键按下移动鼠标的定时器);
                    }
                    结束坐标X = e.clientX;
                    结束坐标Y = e.clientY;
                    移动坐标X = 结束坐标X - 开始坐标X;
                    移动坐标Y = 结束坐标Y - 开始坐标Y;
                    右键按下移动鼠标的定时器 = setInterval(function () {
                        var 新左边偏移 = 地图区域.scrollLeft + 移动坐标X / 2;
                        var 新右边偏移 = 地图区域.scrollTop + 移动坐标Y / 2;
                        地图区域.scrollLeft = 新左边偏移;
                        地图区域.scrollTop = 新右边偏移;
                        var 左边偏移百分比 = 新左边偏移 / 地图区域.scrollWidth * 100;
                        var 上边偏移百分比 = 新右边偏移 / 地图区域.scrollHeight * 100;
                        if (左边偏移百分比 < 0) {
                            左边偏移百分比 = 0;
                        }
                        if (上边偏移百分比 < 0) {
                            上边偏移百分比 = 0;
                        }
                        当前组件.消息隧道.发送消息({
                            消息类型: '大地图偏移',
                            左边偏移百分比,
                            上边偏移百分比
                        });
                    }, 15);
                }
            });

            var 鼠标移动到地图之外的定时器 = null;
            document.addEventListener('mousemove', function (e) {
                var 鼠标X = e.clientX;
                var 鼠标Y = e.clientY;
                var 网页宽度 = document.body.clientWidth;
                var 网页高度 = document.body.clientHeight;
                var 边界 = 5;
                var 移动速度 = 30;
                var 移动x = 0;
                var 移动y = 0;
                if (鼠标X <= 边界 || 鼠标X >= 网页宽度 - 边界 || 鼠标Y <= 边界 || 鼠标Y >= 网页高度 - 边界) {
                    if (鼠标移动到地图之外的定时器) {
                        clearInterval(鼠标移动到地图之外的定时器);
                    }

                    if (鼠标X <= 边界) {
                        移动x = -移动速度;
                    }
                    if (e.clientX >= 网页宽度 - 边界) {
                        移动x = 移动速度;
                    }
                    if (鼠标Y <= 边界) {
                        移动y = -移动速度;
                    }
                    if (鼠标Y >= 网页高度 - 边界) {
                        移动y = 移动速度;
                    }
                    鼠标移动到地图之外的定时器 = setInterval(function () {
                        var 新左边偏移 = 地图区域.scrollLeft + 移动x;
                        var 新右边偏移 = 地图区域.scrollTop + 移动y;
                        地图区域.scrollLeft = 新左边偏移;
                        地图区域.scrollTop = 新右边偏移;
                        var 左边偏移百分比 = 新左边偏移 / 地图区域.scrollWidth * 100;
                        var 上边偏移百分比 = 新右边偏移 / 地图区域.scrollHeight * 100;
                        if (左边偏移百分比 < 0) {
                            左边偏移百分比 = 0;
                        }
                        if (上边偏移百分比 < 0) {
                            上边偏移百分比 = 0;
                        }
                        当前组件.消息隧道.发送消息({
                            消息类型: '大地图偏移',
                            左边偏移百分比,
                            上边偏移百分比
                        });
                    }, 15);

                } else {
                    if (鼠标移动到地图之外的定时器) {
                        clearInterval(鼠标移动到地图之外的定时器);
                    }
                }
            })
            window.addEventListener('mouseup', function (e) {
                var 右键被按下 = (e.button == 2);
                if (右键被按下) {
                    if (右键按下移动鼠标的定时器) {
                        clearInterval(右键按下移动鼠标的定时器);
                    }
                    鼠标右键被按下 = false;
                }
            });

        }
    },
    计算属性: {

    },
});
</script>
<template>
    <div class="map">
        <div class="box" ref="地图区域">
            <img :src="预览图地址" alt="" @load="居中显示地图">
        </div>
    </div>
</template>