<template>
  <div class="container h-100 py-5">
    <div class="topProduct">
      <div class="ProName">
        <p class="ProName-P">品名 : {{detail.name}}</p>
      </div>
      <div>
        <div class="Pro-lef d-flex">
          <img
            class="card-img"
            src="https://www.bigcamera.com.tw/data/goods/201311/1384338680303711768.jpg"
            style="width: 40%"
            alt=""
          />
          <div class="Pro-right">加寬</div>
          <div>
            <p class="Id-Pborder">商品編號 : {{detail.id}}</p>
            <p>商品類別 : {{  }}</p>
            <p>品牌 : {{  }}</p>
            <p>庫存量 : {{  }}</p>
           <span> NT  1234 {{ }}</span>
           <button class="add-btn">直接購買</button>
           <div>
           <button class="add-btn">購物車</button>
           <button class="add-btn">收藏</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="TBborder">
      <p class="PBack">商品介紹</p>
    </div>
    <div class="botproduct">
      <img
            class="card-img"
            src="https://live.staticflickr.com/65535/49241907022_3650e2db83_o.jpg"
            style="width: 100%"
            alt=""
          />
      <div class="spec-Out">
        <p>Fujifilm Instax Mini 90 銀色 </p>
        <p>商品介紹:
Fujifilm instax mini 90 搭載高性能智慧型閃光燈，依照被照物體的距離及四周亮度細部調整閃光燈亮度，讓智慧型閃燈能拍出清楚的室內背景影像。搭載豐富的拍攝模式，如初次採用近拍模式、風景模式等；mini 90 還加入 B 快門模式，最長可達 10 秒，以及雙重曝光模式，可重複拍攝兩張影像。

■ 支援B快門拍攝，曝光時間最長為10秒
■ 支援重複曝光拍攝功能
■ 雙快門鈕設計，機身底部設有腳架孔
■ 使用NP-45充電式鋰電池
商品規格:
使用底片 Fujifilm Instax Mini 拍立得底片 / 鏡頭 f=60mm 1:12.7 / 觀景窗 0.37倍 / 對焦距離 0.3m、0.6~3m、無限遠 / 使用電池 NP-45 / 尺寸 113.4 x 91.9 x 57.2mm / 重量 約296g</p>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name:"DetailProduct",
    data(){
      return{
        detail:[],
      }
    },
    created(){
      this.CallDetailProductsApi();
    },
    methods: {
      async CallDetailProductsApi(){
        let detailId=this.$route.path.slice(9)
        console.log(detailId)
         axios.get(`https://localhost:7259/api/Product/DetailProducts?Id=${detailId}`)
        .then(response=>{
            this.detail = response.data
          })
          .catch(error => {
            console.log(error);
          });
      }
    }

};
</script>

<style scoped>
.topProduct{
    background: #FFFF;
    padding:10% 10%;
}
.ProName{
  border-bottom:7px solid #899EA9;
  margin-bottom: 130px;
  margin-left: 50px;
  margin-right: 50px;
}
.ProName-P{
  padding-left: 50px;
  font-size: 22px;
  font-weight: 800;
}
.card-img{
  padding: 0% 5% ;
  margin-bottom: 50px;
}
.Pro-right{
  margin-left: 150px;
  border-bottom:5px solid #FFFF;
  color:#FFFF;
  
}
.Id-Pborder{
  
}
.add-btn{
  margin: 20px;
}
.TBborder{
  border-top:5px solid #899EA9;
  border-bottom:5px solid #899EA9;
 
}
.PBack{
  background: #FFFF;
  margin: 0%;
  padding-left: 20%;
  font-size: 22px;
  font-weight: 800;
  padding-top: 10px;
  padding-bottom: 10px;
}
.botproduct{
  background: #FFFF;
  margin-top:0;
  padding: 15%;
}
.spec-Out{
  padding: 50px;
}
</style>
