var viewport = document.querySelector("meta[name=viewport]");
//下面是根据设备像素设置viewport
if (window.devicePixelRatio == 1) {
  viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
}
if (window.devicePixelRatio == 2) {
  viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
}
if (window.devicePixelRatio == 3) {
  viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
}
var docEl = document.documentElement;
var fontsize = 10 * (docEl.clientWidth / 360) + 'px';
docEl.style.fontSize = fontsize;

var app = new Vue({
  el: '#app',
  data: {
    count: 0,
    width:docEl.clientWidth,
    height:docEl.clientHeight,
    list:[]
  },
  computed: {
    getList: function () {
      var boxWidth = document.getElementById('content').clientWidth;
      var boxHeight = document.getElementById('content').clientHeight;
      var top_1 = docEl.clientHeight-document.getElementById('foot').offsetTop;
      var top_2 = docEl.clientHeight-document.getElementById('content').offsetTop;
      var fontsize = parseFloat(docEl.style.fontSize.split('px')[0]);
      this.list.forEach(function(item,index){
        var site = Math.random();
        var site_1 = Math.random();
        if(item.currencyName!='eth'){
          if(item.amount>10000){
            item.amount = (item.amount/10000).toFixed(2)+'W'
          }else if(item.amount>1000){
            item.amount = (item.amount/1000).toFixed(2)+'K'
          }else {
            item.amount = item.amount.toFixed(2)
          }
        }
        // 很随便的位置随机，可以自己修改
        item.style = {
          left:site*boxWidth+(7*fontsize)<boxWidth?site*boxWidth+'px':site*boxWidth-(7*fontsize)-100+'px',
          bottom:site_1*boxHeight+(8*fontsize)+top_1<top_2?site_1*boxHeight+top_1+'px':site_1*boxHeight+top_1-200+'px'
        };
      })
      return this.list;
    }
  },
  created:function(){
    //可以接后台数据
    var init_data = [
      {
        amount:10
      },
      {
        amount:100000
      },
      {
        amount:1021
      },
      {
        amount:101
      },
      {
        amount:102
      },
    ]
    init_data.forEach(function(item,index){
      item.style = {
        left:0,
        top:0
      }
    })
    this.list = init_data;
  },
  methods:{
    collect:function(item,index,e){
      var width = e.currentTarget.offsetWidth;
      var size = 10 * (docEl.clientWidth / 360);
      var toleft = 1-(width/size-4.3)/2+'rem';
      var x = document.getElementById("myaudio");
      var _this = this;
      x.play();
      _this.list[index].style = {left:toleft,bottom:'1rem'};
      setTimeout(function(){
        _this.list[index].style = {display:'none'}
      },2000)
    },
    goWallet:function(){
      // 回调方法
      window.android.openWallet();
    },
    goTask:function(){
      // 回调方法
      window.android.openTask();
    },
    goInviting:function(){
      // 回调方法
      window.android.openInviting();
    }
  }
})
