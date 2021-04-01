import {debounce} from './utils';
import BackTop from '../components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
      
    //对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener) 
    console.log('我是混入其中')
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}