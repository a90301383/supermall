<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
         @tabClick="tabClick" ref="tabControl1" 
         class="tab-control"  v-show="isTabFixed"/> 
    <scroll class="content" ref="scroll" 
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']"
         @tabClick="tabClick" ref="tabControl2" 
         /> 
        <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import Scroll from '../../components/common/scroll/Scroll.vue'
  
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import BackTop from '../../components/content/backTop/BackTop.vue'

  import {getHomeMultidata, getHomeGoods} from "../../network/home"
  import {itemListenerMixin} from '../../common/mixin'
  


  export default {
    name: "Home",
    components: {
      TabControl,
      NavBar,
      Scroll,

      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      BackTop,
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 10)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
    },
    mounted() {
   
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break 
          case 2:
            this.currentType = 'sell'
            break    
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
     

      /**
       * 网络请求相关
       */
      getHomeMultidata() {
        //1.请求多个数据
        getHomeMultidata().then(res => {
        // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
      })
      },

      getHomeGoods(type) {
         //2.请求商品数据
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
      })
      }
    }
  }

</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
