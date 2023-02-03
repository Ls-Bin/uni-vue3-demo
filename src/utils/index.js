/*
 * 工具类函数
 */


// 获取用户浏览器UA
const getUa = function () {
    const _cache = {}
    if (_cache.ua) {
        return _cache.ua
    }

    let isMobile = false
    let isApple = false
    let isAndroid = false
    let isUc = false
    let isWeixin = false
    let isQQ = false
    let isQQBrowser = false
    let isWeibo = false

    // #ifdef H5
    // APP端可用，plus.navigator.getUserAgent
    var ua = window.navigator.userAgent.toLocaleLowerCase()
    // console.log(ua);
    isMobile = !!ua.match(/AppleWebKit.*Mobile.*/i)
    isApple = !!ua.match(/(ipad|iphone|ipod|mac)/i)
    isAndroid = !!ua.match(/android/i)
    isUc = !!ua.match(/ucbrowser/i)
    isWeixin = !!ua.match(/micromessenger/i) // 微信内置浏览器
    isQQ = !!ua.match(/pa qq/i) // QQ内置浏览器
    isQQBrowser = !!ua.match(/MQQBrowser/i) // QQ浏览器
    isWeibo = !!ua.match(/weiBo/i)
    // #endif

    _cache.ua = {
        isMobile: isMobile,
        isApple: isApple,
        isAndroid: isAndroid,
        isUc: isUc,
        isWeixin: isWeixin,
        isQQ: isQQ,
        isWeibo: isWeibo,
        isQQBrowser: isQQBrowser
    }

    return _cache.ua
}



/* 防抖
 *@param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 * @return {Function}     返回一个“去弹跳”了的函数
 * 用法：import { debounce } from '@/utils/utils.js';
 *       sure:debounce(function(){}),
 */
function debounce(fn, delay = 500) {
    let timer = null // 声明计时器
    return function () {
        const context = this
        const args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

/* 查询节点信息(目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)，解决办法为在组件根部再套一个没有任何作用的view元素)
 * @param flag {Object} 这个就是页面上的this
 * @param selector {String} 页面元素的class名字或id名字，如：.goods-item,#id
 * @param all {Boolean} selector元素是否为一个数组(即是有多个相同class名字或id名字)元素
 * @return {Function}  返回元素的节点信息
 * 用法：注意：需要用async异步方法来接收
 *      import { getRect } from '@/utils/utils.js';
 *      async init() {
            let tabRect = await getRect(this,'.goods-item');//如果goods-item为数组，则这样写await getRect(this,'.goods-item',true)
        }
 */
function getRect(flag, selector, all) {
    return new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(flag)
        [all ? 'selectAll' : 'select'](selector)
            .boundingClientRect((rect) => {
                if (all && Array.isArray(rect) && rect.length) {
                    resolve(rect)
                }
                if (!all && rect) {
                    resolve(rect)
                }
            })
            .exec()
    })
}

/**
 * 处理颜色的工具
 */
const color = {
    /**
     * 十六进制颜色值转rgb值
     * 例如：colorRgb(#ee9922) = {r:238,g:153,b:34}
     */
    colorRgb(sColor) {
        if (sColor) {
            sColor = sColor.toLowerCase()
        }
        // 十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        // 如果是16进制颜色
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = '#'
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                }
                sColor = sColorNew
            }
            // 处理六位的颜色值
            var sColorChange = []
            for (var i = 1; i < sColor.length; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }

            return {
                r: sColorChange[0],
                g: sColorChange[1],
                b: sColorChange[2]
            }
        }
        return {}
    }
}

const pages = {
    /* 从什么页面过来的就跳回什么页面去:
        num: Number,跳转到前num个页面,默认值为0,传1就是跳转到前一个页面,传2就是跳转到前2个页面,0是当前页面。当没有前一个页面时,则默认跳到首页
        excludePage:Array,排除某个页面(当检测到该页面包含该符时的页面时,直接跳到首页),如：pages.goBeforePage(1,['/login','thirdLoginResult']),
        备注：如果传的excludePage数组第一个元素是传['login']，则会触发条件，排除configfix.excludeLoginURIs这些页面，如：pages.goBeforePage(1,['login'])
    */
    goBeforePage(num) {
        const pages = getCurrentPages() // 当前页面
        const pagesNumber = num ? Number(num) : 0
        const beforePage = pages[pages.length - pagesNumber - 1] // 前num个页面
        if (!beforePage) {
            // 跳转首页
            uni.switchTab({ url: '/pages/index/index' })
        } else {
            // 从什么页面过来的就跳回什么页面去
            if (pagesNumber == 1) {
                uni.navigateBack()
            } else {
                uni.navigateBack({
                    delta: pagesNumber
                })
                // 注意,如果返回带参数的页面,不能用该方法,因为该方法并不能带上参数的
                // uni.reLaunch({url: '/' + beforePage.route})
            }
        }
    },
    /* 拿当前页面的路由地址(注意:不包括参数)
        num: Number,拿前N个页面的路由地址,默认值为0,传1拿前一个页面的路由地址
    */
    getPageRoute(num) {
        const pagesNumber = num ? Number(num) : 0
        const pages = getCurrentPages() // 当前页面
        const beforePage = pages[pages.length - pagesNumber - 1] // 前num个页面,0是当前页面
        return beforePage ? beforePage.route : false
    }
}

/**
 * 处理时间戳的工具
 */
const time = {
    /**
     * 传送一个以前或将来的时间戳，计算现在距离这个时间多久，小于小时的返回:X分钟前(后)，大小于1天的返回：X小时前(后).......
     */
    timeAgo(time) {
        var nowTime = new Date().getTime()
        var f = nowTime - time
        var bs = f >= 0 ? '前' : '后' // 判断时间点是在当前时间的 之前 还是 之后
        f = Math.abs(f)
        if (f < 6e4) {
            return '刚刚'
        } // 小于60秒,刚刚
        if (f < 36e5) {
            return parseInt(f / 6e4) + '分钟' + bs
        } // 小于1小时,按分钟
        if (f < 864e5) {
            return parseInt(f / 36e5) + '小时' + bs
        } // 小于1天按小时
        if (f < 2592e6) {
            return parseInt(f / 864e5) + '天' + bs
        } // 小于1个月(30天),按天数
        if (f < 31536e6) {
            return parseInt(f / 2592e6) + '个月' + bs
        } // 小于1年(365天),按月数
        return parseInt(f / 31536e6) + '年' + bs // 大于365天,按年算
    },

    // 比价两个时间的时间差, 返回其文本形式
    twoTimeCompare(beginTime, endTime) {
        let begin = moment(beginTime).unix()
        let end = moment(beginTime).unix()
        let diff = begin - end
        if (diff < 6e4) {
            return '刚刚'
        } // 小于60秒,刚刚
        if (diff < 36e5) {
            return parseInt(diff / 6e4) + '分钟' + bs
        } // 小于1小时,按分钟
        if (diff < 864e5) {
            return parseInt(diff / 36e5) + '小时' + bs
        } // 小于1天按小时
        if (diff < 2592e6) {
            return parseInt(diff / 864e5) + '天' + bs
        } // 小于1个月(30天),按天数
        if (diff < 31536e6) {
            return parseInt(diff / 2592e6) + '个月' + bs
        } // 小于1年(365天),按月数
        return parseInt(diff / 31536e6) + '年' + bs // 大于365天,按年算
    }
}

// 登录模态框类
class LoginModal {
    constructor () {
        this.show = false
    }
    showModal(param) {
        if (this.show) {
            return
        }
        this.show = true
        uni.showModal({
            ...param,
            complete: () => {
                this.show = false
                if (param.complete) {
                    param.complete()
                }
            }
        })
    }
}

//单例模式抽象，分离创建对象的函数和判断对象是否已经创建(第二版单例)
const createSingle = function (fn) {
    let result
    return function () {
        return result || (result = new fn(...arguments))
    }
}

const singleLoginModal = createSingle(LoginModal)
const loginModal = singleLoginModal()

export { getUa, debounce, getRect, time, color, pages, loginModal, createSingle }
