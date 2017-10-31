// module.exports = router;
var express = require('express');
var router = express.Router();
var User = require('../models/user');
require('../util/util');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('hi shudong.wang stark');
});



// 登录接口
router.post('/login', function(req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    console.log(param);
    User.findOne(param, function(err, doc) {
        console.log(err);
        if (err) { res.json({ "status": "1", msg: err.message }) } else {
            console.log('doc', doc);
            if (!doc) { res.json({ 'status': '1', msg: '', result: '用户名和密码错误' }) }
            //把userId 和 userName 存到cookie里面，在控制台的application里面找到cookie可以查看

            // 第一个参数存的是 cookie 名字，第二个参数存的是值，地三个对象，里面
            // path 是存的路径，maxAge 过期时间，以毫秒为单位
            res.cookie('userId', doc.userId, {
                path: '/',
                maxAge: 1000 * 60 * 60
            })

            res.cookie("userName", doc.userName, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24
            })

            if (doc) {
                res.json({
                    status: 0,
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            }
        }
    })
})

// 检查是否登录
router.post('/checkLogin', function(req, res, next) {
    // 使用cookies读取 cookies
    if (req.cookies.userId) {
        res.json({
            status: '0',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        })
    }
})

// 退出登录
router.post('/logout', function(req, res, next) {
        res.cookie("userId", "", {
            path: '/',
            maxAge: -1
        })

        res.json({
            status: 0,
            msg: '',
            result: '退出成功'
        })
    })
    //获取购物车列表
router.post("/cartList", function(req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
            res.json({
                status: 0,
                msg: '',
                result: doc.cartList
            })
        }
    })
})


// 获取购买的商品

// 生成订单号
var platform = "622";
var r1 = Math.floor(Math.random)

// 编辑购物车，包括商品数量的增加和减少以及某条商品是否被选中
router.post('/cartEdit', function(req, res, next) {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        checked = req.body.checked,
        productNum = req.body.productNum;
    // console.log(productNum);
    User.update({ 'userId': userId, "cartList.productId": productId }, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked
    }, function(err, doc) {
        console.log(doc);
        if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
            res.json({
                status: 0,
                msg: '',
                result: '修改购物车商品成功'
            })
        }
    })

})

// 全选和反选
router.post('/editCheckAll', function(req, res, next) {
        let userId = req.cookies.userId,
            checkAll = req.body.checkAll;
        User.findOne({ 'userId': userId }, function(err, user) {
            if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
                user.cartList.forEach(item => {
                    item.checked = checkAll;
                })

                user.save(function(err1, doc1) {
                    if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
                        res.json({ status: '0', msg: '', result: '操作成功' });
                    }
                })
            }
        })
    })
    // 删除某一条购物车商品列表
router.post('/cartDel', function(req, res, next) {
        var userId = req.cookies.userId,
            productId = req.body.productId;
        User.update({
            userId: userId
        }, {
            $pull: {
                'cartList': {
                    'productId': productId
                }
            }
        }, function(err, doc) {
            if (err) {
                res.json({ status: 1, msg: err.message, result: '' })
            } else {
                res.json({ status: 0, msg: '', result: '商品删除成功' })
            }
        })
    })
    //获取用户收货地址信息
router.get('/addressList', function(req, res, next) {
        var userId = req.cookies.userId;
        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({ status: 1, msg: err.message, result: '' })
            } else {
                res.json({ status: 0, msg: '', result: doc.addressList })
            }
        })
    })
    // 添加地址
router.post('/addaddress', function(req, res, next) {
        var userId = req.cookies.userId;
        var addressName = req.body.addressName;
        var addressDes = req.body.addressDes;
    })
    // 设置默认地址
router.post('/setDefault', function(req, res, next) {
    var userId = req.cookies.userId;
    var addressId = req.body.addressId;
    // var addressName = req.body.addressName;
    // var addressDes = req.body.addressDes;
    if (!addressId) {
        res.json({
            status: '1003',
            msg: 'addressId is null'
        })
    } else {
        User.findOne({ userId: userId }, function(err, doc) {
            var addressList = doc.addressList;
            addressList.forEach(item => {
                if (item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
            doc.save(function(err1, doc1) {
                if (err1) {
                    res.json({
                        status: '1',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: doc1
                    })
                }
            })
        })
    }
})
router.get('/orderinfo', function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({ status: 1, msg: err.message, result: '' })
            } else {
                doc.addressList.forEach(item => {
                    if (item.isDefault == true) {
                        res.json({ status: 0, msg: '', result: doc.addressList })
                    }
                })
            }
        })
        //
    var addressName = req.body.addressName;
    // var addressDes = req.body.addressDes;
})

router.post('/payMent', function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            // 获取收货地址
            var address = '';
            goodsList = [];
            doc.addressList.forEach(result => {
                    if (result.addressId == addressId) {
                        address = result;
                    }
                })
                // 获取购买的商品
            doc.cartList.filter(item => {
                    if (item.checked == '1') {
                        goodsList.push(item);
                    }
                })
                // 生成订单号
            var platform = '622';
            var r1 = Math.floor(Math.random() * 10);
            var r2 = Math.floor(Math.random() * 10);
            var sysDate = new Date().Format("yyyyMMddhhmmss");
            var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            var orderId = platform + r1 + sysDate + r2;

            var order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '10',
                createDate: createDate
            }
            doc.orderList.push(order);
            doc.save(function(err1, doc1) {
                if (err1) {
                    res.json({ 'status': '1', msg: err.message, result: '' })
                } else {
                    res.json({ 'status': '0', msg: '', result: { orderId: order.orderId, orderTotal: orderTotal } })
                }
            })
        }
    })
})
module.exports = router;