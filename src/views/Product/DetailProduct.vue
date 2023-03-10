<template>
  <div class="container h-100 py-5" >
    <div class="topProduct">
      <div class="ProName">
        <p class="ProName-P">品名 : {{detail.name}}</p>
      </div>
      <div>
        <div class="Pro-lef d-flex">
          <img
            class="card-img"
            :src="'https://localhost:7027/ProductImgFiles/'+coverimg"
            style="height:360px; width:470px; object-fit: cover;"
            alt=""
          />
          <div class="Pro-right">加寬</div>
          <div>
            <p class="Id-Pborder">商品編號 : {{detail.id}}</p>
            <p>商品類別 : {{ detail.categoryName }}</p>
            <p>品牌 : {{ detail.brandName }}</p>
            <p>庫存量 : {{ detail.inventory }}</p>
           <span> NT   {{detail.price }}</span>
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
      <div v-for ="(item,index) in picture " :key="index">
        <img 
            class="card-img"
            :src="'https://localhost:7027/ProductImgFiles/'+ item"
            style="width: 100%"
            alt=""
          />
      </div>
      
      <div class="spec-Out">
        <p>Fujifilm Instax Mini 90 銀色 </p>
        <p>商品介紹:
          {{ detail.productSpec }}
        </p>
    </div>

    </div>
  </div>
</template>

<script>

export default {
  name:"DetailProduct",
    data(){
      return{
        detail:{},
        coverimg:"",
        picture:[],
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
            this.detail = response.data;
            this.picture =  this.detail.source
            
            this.coverimg = this.detail.source[0]
            this.picture = this.picture.slice(1);
            console.log(this.picture)
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
