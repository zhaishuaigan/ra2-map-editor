<script>
export default {
    data() {
        return {
            用户已选择地图: false,
            预览图地址: '',
            消息隧道: null,
        };

    },
    mounted() {
        // console.log('地图展示区加载完成');
        this.绑定边界地图平移事件();
        this.绑定右键地图平移事件();
        this.绑定消息处理事件();
        this.绑定窗口大小改变事件();
        this.事件服务(this);
    },
    methods: {
        已选择地图() {
            this.用户已选择地图 = true;
            this.获取预览图();

        },
        async 获取预览图() {
            var 预览图名字 = '预览图.png';
            var 预览图 = await window.项目.项目目录.获取子文件(预览图名字);
            if (预览图) {
                var 读取器 = new FileReader();
                读取器.onload = () => {
                    this.预览图地址 = 读取器.result;
                };
                读取器.readAsDataURL(await 预览图.文件句柄.getFile());
                return;
            }
        },
        绑定窗口大小改变事件() {
            window.addEventListener('resize', () => {
                this.发送地图区域大小改变();
            });
        },
        发送地图区域大小改变() {
            var 地图区域 = this.$refs.地图区域;
            var 实际宽度 = 地图区域.scrollWidth;
            var 实际高度 = 地图区域.scrollHeight;
            var 可视宽度 = 地图区域.offsetWidth;
            var 可视高度 = 地图区域.offsetHeight;
            this.消息隧道.发送消息({
                消息类型: '地图区域大小改变',
                实际宽度,
                实际高度,
                可视宽度,
                可视高度
            });
        },
        地图加载完成() {
            setTimeout(() => {
                this.发送地图区域大小改变();
                var 地图区域 = this.$refs.地图区域;
                var 实际宽度 = 地图区域.scrollWidth;
                var 实际高度 = 地图区域.scrollHeight;
                var 可视宽度 = 地图区域.offsetWidth;
                var 可视高度 = 地图区域.offsetHeight;
                var 左边偏移百分比 = (实际宽度 - 可视宽度) / 2 / 实际宽度 * 100;
                var 上边偏移百分比 = (实际高度 - 可视高度) / 2 / 实际高度 * 100;
                this.移动视角(左边偏移百分比, 上边偏移百分比);
                this.消息隧道.发送消息({
                    消息类型: '大地图偏移',
                    左边偏移百分比: 左边偏移百分比,
                    上边偏移百分比: 上边偏移百分比
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
        绑定边界地图平移事件() {
            var 当前组件 = this;
            var 地图区域 = this.$refs.地图区域;
            var 地图宽度 = 地图区域.scrollWidth;
            var 地图高度 = 地图区域.scrollHeight;
            var 网页宽度 = document.body.clientWidth;
            var 网页高度 = document.body.clientHeight;
            var 鼠标到达边界的移动地图方法 = null;
            var 边界 = 5;
            var 移动速度 = 30;
            var 移动x = 0;
            var 移动y = 0;

            window.addEventListener('resize', function () {
                网页宽度 = document.body.clientWidth;
                网页高度 = document.body.clientHeight;
            });

            document.addEventListener('mousemove', function (e) {
                var 鼠标X = e.clientX;
                var 鼠标Y = e.clientY;
                var 鼠标到达边界 = 鼠标X <= 边界
                    || 鼠标X >= 网页宽度 - 边界
                    || 鼠标Y <= 边界
                    || 鼠标Y >= 网页高度 - 边界;
                if (鼠标到达边界) {
                    if (鼠标X <= 边界) {
                        移动x = -移动速度;
                    } else if (e.clientX >= 网页宽度 - 边界) {
                        移动x = 移动速度;
                    } else {
                        移动x = 0;
                    }

                    if (鼠标Y <= 边界) {
                        移动y = -移动速度;
                    } else if (鼠标Y >= 网页高度 - 边界) {
                        移动y = 移动速度;
                    } else {
                        移动y = 0;
                    }

                    if (鼠标到达边界的移动地图方法) {
                        return;
                    }

                    地图宽度 = 地图区域.scrollWidth;
                    地图高度 = 地图区域.scrollHeight;
                    鼠标到达边界的移动地图方法 = setInterval(function () {
                        var 新左边偏移 = 地图区域.scrollLeft + 移动x;
                        var 新右边偏移 = 地图区域.scrollTop + 移动y;
                        地图区域.scrollLeft = 新左边偏移;
                        地图区域.scrollTop = 新右边偏移;
                        var 左边偏移百分比 = 新左边偏移 / 地图宽度 * 100;
                        var 上边偏移百分比 = 新右边偏移 / 地图高度 * 100;
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
                    if (鼠标到达边界的移动地图方法) {
                        clearInterval(鼠标到达边界的移动地图方法);
                        鼠标到达边界的移动地图方法 = null;
                    }
                }
            })
        },
        绑定右键地图平移事件() {
            // 按住鼠标右键拖动地图区域
            var 当前组件 = this;
            var 地图区域 = this.$refs.地图区域;
            var 网页宽度 = document.body.clientWidth;
            var 网页高度 = document.body.clientHeight;
            var 地图宽度 = 地图区域.scrollWidth;
            var 地图高度 = 地图区域.scrollHeight;
            var 鼠标右键被按下 = false;
            var 开始坐标X = 0;
            var 开始坐标Y = 0;
            var 结束坐标X = 0;
            var 结束坐标Y = 0;
            var 移动坐标X = 0;
            var 移动坐标Y = 0;
            var 右键按下的移动地图方法 = null;
            地图区域.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            })
            地图区域.addEventListener('mousedown', function (e) {
                if (e.button == 2) {
                    鼠标右键被按下 = true;
                    网页宽度 = document.body.clientWidth;
                    网页高度 = document.body.clientHeight;
                    地图宽度 = 地图区域.scrollWidth;
                    地图高度 = 地图区域.scrollHeight;
                    开始坐标X = e.clientX;
                    开始坐标Y = e.clientY;
                    // 把鼠标改成移动样式
                    地图区域.style.cursor = 'move';
                }
            });
            document.addEventListener('mousemove', function (e) {
                if (!鼠标右键被按下) {
                    return;
                }
                结束坐标X = e.clientX;
                结束坐标Y = e.clientY;
                移动坐标X = 结束坐标X - 开始坐标X;
                移动坐标Y = 结束坐标Y - 开始坐标Y;
                if (右键按下的移动地图方法) {
                    return;
                }
                右键按下的移动地图方法 = setInterval(function () {
                    var 新左边偏移 = 地图区域.scrollLeft + 移动坐标X / 2;
                    var 新右边偏移 = 地图区域.scrollTop + 移动坐标Y / 2;
                    地图区域.scrollLeft = 新左边偏移;
                    地图区域.scrollTop = 新右边偏移;
                    var 左边偏移百分比 = 新左边偏移 / 地图宽度 * 100;
                    var 上边偏移百分比 = 新右边偏移 / 地图高度 * 100;
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
            });

            window.addEventListener('mouseup', function (e) {
                var 右键被按下 = (e.button == 2);
                if (右键被按下) {
                    if (右键按下的移动地图方法) {
                        clearInterval(右键按下的移动地图方法);
                        右键按下的移动地图方法 = null;
                    }
                    鼠标右键被按下 = false;
                }
                地图区域.style.cursor = 'auto';
            });
        }
    },
    计算属性: {

    },
};
</script>
<template>
    <div class="map">
        <div class="box" ref="地图区域">
            <img v-if="预览图地址" :src="预览图地址" alt="" @load="地图加载完成">
        </div>
    </div>
</template>