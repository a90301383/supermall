<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/> 
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/> 
      <goods-list ref="recommend" :goods="recommends"/> 
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import {getDetail, getRecommend, Goods, GoodsParam, Shop} from '../../network/detail'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import {itemListenerMixin, backTopMixin} from '../../common/mixin'
import { debounce } from '../../common/utils'
import {mapActions} from 'vuex'
import Toast from '../../components/common/toast/Toast'


export default {
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo, DetailCommentInfo, GoodsList, DetailBottomBar,Toast},
  name:"Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: '',
      show: false
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      //获取顶部的图片轮播数
      this.topImages = data.itemInfo.topImages
      
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      
      //保存商品的详情数据
      this.detailInfo = data.detailInfo

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }),
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
       this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopY.push(Number.MAX_VALUE)
        console.log(this.themeTopY)
    },100)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index])
    },
    contentScroll(position) {
      //1.获取Y值
      const positionY = -position.y
      let length = this.themeTopY.length
      for(let i = 0; i < length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {
          this.currentIndex = i;
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)
        this.$toast.show(res, 2000)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }
  
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 93px);
  }
</style>