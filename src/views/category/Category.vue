<template>
 <div class="wrapper">
    <ul class="content">
    <li>商品分类1</li>
    <li>商品分类2</li>
    <li>商品分类3</li>
    <li>商品分类4</li>
    <li>商品分类5</li>
    <li>商品分类6</li>
    <li>商品分类7</li>
    <li>商品分类8</li>
    <li>商品分类9</li>
    <li>商品分类10</li>
    <li>商品分类11</li>
    <li>商品分类12</li>
    <li>商品分类13</li>
    <li>商品分类14</li>
    <li>商品分类15</li>
    <li>商品分类16</li>
    <li>商品分类17</li>
    <li>商品分类18</li>
    <li>商品分类19</li>
    <li>商品分类20</li>
    <li>商品分类21</li>
    <li>商品分类22</li>
    <li>商品分类23</li>
    <li>商品分类24</li>
    <li>商品分类25</li>
    <li>商品分类26</li>
    <li>商品分类27</li>
    <li>商品分类28</li>
    <li>商品分类29</li>
    <li>商品分类30</li>
    <li>商品分类31</li>
    <li>商品分类32</li>
    <li>商品分类33</li>
    <li>商品分类34</li>
    <li>商品分类35</li>
    <li>商品分类36</li>
    <li>商品分类37</li>
    <li>商品分类38</li>
    <li>商品分类39</li>
    <li>商品分类40</li>
    <li>商品分类41</li>
    <li>商品分类42</li>
    <li>商品分类43</li>
    <li>商品分类44</li>
    <li>商品分类45</li>
    <li>商品分类46</li>
    <li>商品分类47</li>
    <li>商品分类48</li>
    <li>商品分类49</li>
    <li>商品分类50</li>
    <li>商品分类51</li>
    <li>商品分类52</li>
    <li>商品分类53</li>
    <li>商品分类54</li>
    <li>商品分类55</li>
    <li>商品分类56</li>
    <li>商品分类57</li>
    <li>商品分类58</li>
    <li>商品分类59</li>
    <li>商品分类60</li>
    <li>商品分类61</li>
    <li>商品分类62</li>
    <li>商品分类63</li>
    <li>商品分类64</li>
    <li>商品分类65</li>
    <li>商品分类66</li>
    <li>商品分类67</li>
    <li>商品分类68</li>
    <li>商品分类69</li>
    <li>商品分类70</li>
    <li>商品分类71</li>
    <li>商品分类72</li>
    <li>商品分类73</li>
    <li>商品分类74</li>
    <li>商品分类75</li>
    <li>商品分类76</li>
    <li>商品分类77</li>
    <li>商品分类78</li>
    <li>商品分类79</li>
    <li>商品分类80</li>
    <li>商品分类81</li>
    <li>商品分类82</li>
    <li>商品分类83</li>
    <li>商品分类84</li>
    <li>商品分类85</li>
    <li>商品分类86</li>
    <li>商品分类87</li>
    <li>商品分类88</li>
    <li>商品分类89</li>
    <li>商品分类90</li>
    <li>商品分类91</li>
    <li>商品分类92</li>
    <li>商品分类93</li>
    <li>商品分类94</li>
    <li>商品分类95</li>
    <li>商品分类96</li>
    <li>商品分类97</li>
    <li>商品分类98</li>
    <li>商品分类99</li>
    <li>商品分类100</li>
  </ul>
 </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        
      })
    }
  }
</script>

<style scoped>
 .wrapper{
   height: 150px;
 }
</style>
