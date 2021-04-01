<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'
  import CartList from './childComps/CartList.vue'
  import {mapGetters} from 'vuex'


  export default {
    components: { NavBar, CartList, CartBottomBar },
    name: "Cart",
    computed: {
      ...mapGetters(['cartLength', 'cartList'])
    }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
