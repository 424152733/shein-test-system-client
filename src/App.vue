<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  ul, li{
    list-style: none;
  }
  a {
    color: #2db7f5;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
  }
  .shein-warp{
    width:  100%;
    height:  100vh;
    background: #333;
    overflow-y: hidden;
  }
  .shein-modal-footer{
    padding: 15px;
    text-align: right;
    border-top: 1px solid #eee;
  }
  .markdown {
    color: #777;
    font-size: 14px;
  }
  .markdown>span {
      color: #5C6B77;
      font-weight: 600;
      font-size:  24px;
  }
  .markdown hr {
      border-radius: 10px;
      height: 3px;
      border: 0;
      background: #eee;
      margin: 20px 0;
  }
   pre {
    outline: 1px solid #ccc; 
    padding: 5px; 
    margin: 5px; 
    height:500px;
    overflow-y: auto; 
    overflow-x: hidden
  }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }
  .warp-loading {
      position: absolute;
      top: 0;
      left: 0;
      width:  100vw;
      height: 100vh;
      background: #454952;
      z-index: 1001;
    }
  .warp-loading .loading-svg{
    width:  100%;
    height:  100%;
    background: url('./assets/gears.svg') no-repeat center ;
    background-size: 35% 35%;
  }
  /* 必需 */
  .expand-transition {
    transition: all .8s ease;
    opacity: 1
  }

  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter {
    opacity: 1;
  }
  .expand-leave {
    opacity: 0;
  }
</style>

<template>
  <div class="shein-warp">
      <s-header></s-header>
      <router-view></router-view>
      <div v-show="reflash_loading" class="warp-loading" transition="expand">
         <div class="loading-svg"></div>
      </div>
  </div>

</template>

<script>
import 'iview/dist/styles/iview.css'
import SHeader from './components/layout/header'
import store from './vuex/store'
export default {
  vuex: {
    getters: {
      reflash_loading: ({ setting }) => {
          return setting.reflash_loading
      },
    }
  },

  components: {
    SHeader
  },
  store
}
</script>