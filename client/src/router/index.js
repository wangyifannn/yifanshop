import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Address from '@/views/Address'
import Cart from '@/views/CartList'
import OrderConfirm from '@/views/orderConfirm'
import orderSuccess from '../views/orderSuccess'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'GoodsList',
            component: GoodsList
        }, {
            path: '/cart',
            name: 'cart',
            component: Cart
        }, {
            path: '/address',
            name: 'address',
            component: Address
        },
        {
            path: '/orderConfirm',
            name: 'orderConfirm',
            component: OrderConfirm
        },
        {
            path: '/orderSuccess',
            name: 'orderSuccess',
            component: orderSuccess
        }
    ]
})