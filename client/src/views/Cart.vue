<template>
    <div>
        <HavHeader/>
        <div class="cart">
            <div class="page-title-normal">
                <h2 class="page-title-h2">
                    <span>My Cart</span>
                </h2>
            </div>
            <div class="item-list-wrap">
                <div class="cart-item">
                    <div class="cart-item-head">
                        <ul>
                            <li>Items</li>
                            <li>Price</li>
                            <li>Quantity</li>
                            <li>Subtotal</li>
                            <li>Edit</li>
                        </ul>
                    </div>
                    <ul class="cart-item-list">
                        <li v-for="(item,index) in cartList" :key="index">
                            <div class="cart-tab-1">
                                <div class="cart-item-check">
                                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked',item)">
                                        <svg class="icon icon-ok">
                                            <use xlink:href="#icon-ok"></use>
                                        </svg>
                                    </a>
                                </div>
                                <div class="cart-item-pic">
                                    <img :src="'/static/img/'+item.productImage">
                                </div>
                                <div class="cart-item-title">
                                    <div class="item-name">{{item.productName}}</div>
                                </div>
                            </div>
                            <div class="cart-tab-2">
                                <div class="item-price">{{item.salePrice}}</div>
                            </div>
                            <div class="cart-tab-3">
                                <div class="item-quantity">
                                    <div class="select-self select-self-open">
                                        <div class="select-self-area">
                                            <a class="input-sub" @click="editCart('minu',item)">-</a>
                                            <span class="select-ipt">{{item.productNum}}</span>
                                            <a class="input-add" @click="editCart('add',item)">+</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cart-tab-4">
                                <div class="item-price-total">{{item.productNum*item.salePrice}}</div>
                            </div>
                            <div class="cart-tab-5">
                                <div class="cart-item-opration">
                                    <a href="javascript:;" class="item-edit-btn">
                                        <svg class="icon icon-del">
                                            <use xlink:href="#icon-del"></use>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cart-foot-wrap">
                <div class="cart-foot-inner">
                    <div class="cart-foot-l">
                        <div class="item-all-check">
                            <a href="javascipt:;" @click="toggleCheckAll">
                                <span class="checkbox-btn item-check-btn" :class="{'check':checkedAllFlag}">
                                    <svg class="icon icon-ok">
                                        <use xlink:href="#icon-ok" />
                                    </svg>
                                </span>
                                <span>Select all</span>
                            </a>
                        </div>
                    </div>
                    <div class="cart-foot-r">
                        <div class="item-total">
                            Item total:
                            <span class="total-price">{{totalPrice}}</span>
                        </div>

                        <div class="btn-wrap">
                            <a class="btn btn--red">Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footers/>
    </div>
</template>
<script>
import NavHeader from '../components/HavHeader'
import Footers from '../components/Footer'
// export default {
//     name: 'cart',
//     components: {
//         HavHeader,
//         Footers
//     },
//     data() {
//         return {
//             cartList: '',
//             modalConfirm: false,
//             productId: '',
//         }
//     },
//     computed: {
//         // 购物车被选中的数量
//         checkedCount() {
//             var i = 0;
//             this.cartList.forEach(item => {
//                 if (item.checked == '1') i++;
//             })
//             return i;
//         },
//         // 判断是否全选
//         checkedAllFlag() {
//             // 党前选中的商品和购物车里面的所有商品对比
//             return this.checkedCount == this.cartList.length;
//         },
//         totalPrice() {
//             let money = 0;
//             this.cartList.forEach(item => {
//                 if (item.checked == "1") {
//                     money += item.salePrice * item.productNum
//                 }
//             })
//             return money;
//         }
//     },
//     created() {
//         this.getCartList()
//     },
//     methods: {
//         getCartList() {
//             this.$http.post('/users/cartList').then(result => {
//                 let res = result.data;
//                 this.cartList = res.result;
//                 console.log(res);
//             })
//         },
//         editCart(flag, item) {
//             if (flag == 'minu') {
//                 if (item.productNum <= 1) {
//                     return;
//                 }
//                 item.productNum--;
//             } else if (flag == 'add') {
//                 item.productNum++;
//             } else {
//                 item.checked = item.checked == '1' ? 0 : 1;
//             }
//             this.$http.post('/users/cartEdit', {
//                 productId: item.productId,
//                 productNum: item.productNum,
//                 checked: item.checked
//             }).then(result => {
//                 console.log(result);
//             })
//         },
//         toggleCheckAll() {
//             let flag = !this.checkedAllFlag;
//             console.log(this.cartList);
//             this.cartList.forEach(item => {
//                 item.checked = flag ? 1 : 0;
//             })
//             this.$http.post('/users/editCheckAll', { checkAll: item.checked }).then(res => {
//                 console.log(res);
//             })
//         },
//     }
// }

 export default {
        data(){
            return{
                cartList:'',
                modalConfirm:false,
                productId:'',
            }
        },
        computed:{
            // 购物车被选中的数量
            checkedCount(){
                var i = 0;
                this.cartList.forEach(item=>{
                    if(item.checked == '1') i++;
                })
                return i;
            },
            // 判断是否全选
            checkedAllFlag(){
                // 当前选中的商品  和 购物车里面的所有商品对比
                return this.checkedCount == this.cartList.length;
            },
            totalPrice(){
                let money = 0;
                this.cartList.forEach(item=>{
                    if(item.checked == '1'){
                        money += item.salePrice * item.productNum
                    }
                })
                return money;
            }
        },
        components:{
            NavHeader,
            Footers
            // NavBread,
            // Modal
        },
        created(){
            this.getCartList()
        },
        methods:{
            getCartList(){
                this.$http.post('/users/cartList').then(result=>{
                    let res = result.data;
                    this.cartList = res.result;
                    console.log(res);
                })
            },
            editCart(flag,item){
                if(flag == 'minu'){
                    if(item.productNum <= 1){
                        return;
                    }
                    item.productNum --;
                }else if(flag == 'add'){
                    item.productNum ++;
                }else{
                    item.checked = item.checked == '1' ? 0 : 1; 
                }
                this.$http.post('/users/cartEdit',{
                    productId:item.productId,
                    productNum:item.productNum,
                    checked:item.checked
                }).then(result=>{
                    console.log(result);
                    // alert(result.data.result);
                })

            },
            toggleCheckAll(){
                let flag = !this.checkedAllFlag;

                this.cartList.forEach(item=>{
                    item.checked = flag ? 1 : 0;
                })
                this.$http.post('/users/editCheckAll',{checkAll:item.checked}).then(res=>{
                    console.log(res);
                })
            },
            delCartConfirm(item){
                this.productId = item.productId;
                this.modalConfirm = true;
            },
            cartDel(){
                this.$http.post('/users/cartDel',{productId:this.productId}).then(item=>{
                    this.getCartList()
                    this.modalConfirm = false;
                    // alert('商品删除成功')
                })
            },
            checkout(){
                if(this.checkedCount > 0){
                    this.$router.push({
                        path:'/address'
                    })
                }else{
                    alert('购物车，必须有选中的商品！才能去结账')
                }
            }
        }
    }
</script>
