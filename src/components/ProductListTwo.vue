<template>
    <div id="product-list-two">
        <h2>Product List Two</h2>
        <ul>
            <li v-for="product in products">
                <span class="name">{{ product.name }}</span>
                <span class="price">${{ product.price }}</span>
            </li>
            <!-- 添加一个按钮,为其添加一个点击事件, 给点击事件触发minusPrice方法 -->
            <button @click="minusPrice">减少价格</button> 
            <button @click="minusPriceAsync">异步减少价格</button>
        </ul>
    </div>
</template>

<script>
export default {
    // props: ['products'],
     data () {
        return {
            products : this.$store.state.products //获取store中state的数据
        }
     },
     methods:{
        //  调用mutaions中回调函数, 只能使用store.commit(type, payload)
        minusPrice(){
            this.$store.commit('minusPrice',2); //提交`minusPrice,payload为2
        },
        minusPriceAsync(){
            this.$store.dispatch('minusPriceAsync',5); ////分发actions中的minusPriceAsync这个异步函数
        }
     }
}
</script>

<style scoped>
#product-list-two{
    background: #D1E4FF;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
}
#product-list-two ul{
    padding: 0;
    list-style-type: none;
}
#product-list-two li{
    margin-right: 10px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255,255,255,0.7);
}
.price{
    font-weight: bold;
    color: #860CE8;
    display: block;
}
</style>