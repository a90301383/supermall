<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" 
      class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate"  @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.price * item.count
    },0).toFixed(2)
    },

    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },

    isSelectAll() {
    //  return !(this.cartList.filter(item => !item.checked).length)
    if (this.cartList.length === 0) return false
    return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}

</script>
<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    line-height: 40px;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  
  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }
</style>