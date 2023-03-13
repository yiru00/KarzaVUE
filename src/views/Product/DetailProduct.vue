<template>
  <div class="container h-100 py-5" >
    <div class="topProduct">
      <div class="ProName">
        <p class="ProName-P">{{detail.name}}</p>
      </div>
      <div>
        <div class="Pro-lef d-flex">
          <img
            class="card-img"
            :src="'https://localhost:7027/ProductImgFiles/'+coverimg"
            style="width:470px; object-fit: cover;"
            alt=""
          />
          <div class="Pro-right">12加寬</div>
          <div>
            <table>
              <thead>
                <tr>
                  <th class="push-td">12345<span class="m-5 p-2"></span></th>
                </tr>
              </thead>
              <tbody>
                <tr class="cate-mt">
                  <td>商品編號 : </td>
                  <td class="td-r">{{detail.id}}</td>
                </tr>
                <tr>    
                  <td>商品類別 : </td>
                  <td class="td-r">{{ detail.categoryName }}</td>
                </tr>
                <tr>    
                  <td>品牌 : </td>
                  <td class="td-r">{{ detail.inventory }}</td>
                </tr>
                <tr>    
                  <td>庫存量 : </td>
                  <td class="td-r">{{ detail.inventory }}</td>
                </tr>
                <tr>    
                  <td> NTD : </td>
                  <td class="td-r">{{detail.price }}</td>
                </tr>
              </tbody>
            </table>
            <div>
           <button class="add-btn ">直接購買</button>
          </div>
           <div>
           <button class="add-btn-buy"><i class="fa-solid fa-cart-shopping buy-i"></i></button>
           <button class="add-btn-like">
            <i  v-if="MId==0" @click="CallUnFavorites(status.deleteId)" class="fa-regular fa-star like-i" data-bs-toggle="modal" data-bs-target="#loginModal"></i>

            <i v-else-if="!status.upshot" @click="CallProductFavorites()" class="fa-regular fa-star  like-i"></i>
            <i v-else @click="CallUnFavorites(status.deleteId)" class="fa-solid fa-star  like-i"></i>
            

          </button>
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
        <p class="spec-name">Fujifilm Instax Mini 90 銀色 </p>
        <p class="Spec">商品介紹:
          {{ detail.productSpec }}
        </p>
    </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import utility from '../../../public/utility';

export default {
  mixins:[utility],
  name:"DetailProduct",
    data(){
      return{
        detail:{},
        coverimg:"",
        picture:[],
        MId:0,
        PId:0,
        status:{},

      }
    },
    created(){
  this.scrollToTop();
     
      this.CallDetailProductsApi();
      this.CallFavoritesStatus();
    },
    mounted(){
      this.GetMemberId();
    },
    
    methods: {

      async CallDetailProductsApi(){
        let detailId=this.$route.path.slice(9)

       this.PId=detailId
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
      },
      async GetMemberId(){
     
       this.MId=await this.fetchMemberId()
        console.log(this.MId)
      },
      async CallProductFavorites(){
       await axios.post(`https://localhost:7259/api/Favorites/ProductFavorites?memberId=${this.MId}&productId=${this.PId}`)
        .then(response=>{
         console.log(response.data) 
         let res=response.data
         if(res.upshot){
          this.status.deleteId=res.deleteId
         this.status.upshot=true
         this.showAlert(res.reply)
         }
         
        })
        .catch(error=>{
          console.log(error);
        })
      },
      async CallUnFavorites(deleteId){
        axios.delete(`https://localhost:7259/api/favorites/unfavorites/${deleteId}`)
        .then(response=>{
          if(response)
          {
            this.status.upshot=false
            this.status.deleteId=0
            this.showAlert("取消收藏成功")
          }
         console.log(response)
        })
        .catch(error=>{
          console.log(error);
        })
      },
      async CallFavoritesStatus(){
        let memberId=await this.fetchMemberId()
        axios.get(`https://localhost:7259/api/Favorites/FavoritesStatus?memberId=${memberId}&productId=${this.PId}`)
        .then(response=>{
          this.status =response.data
          console.log( this.status);
        })
        .catch(error=>{
          console.log(error);
        })
      },
    }

};
</script>

<style scoped>
.topProduct{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
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
  font-size: 24px;
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
p{
  font-size: 20px;
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
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.spec-Out{
  padding: 50px;
  max-width: 1000px;
  align-content: center;
  border: #899EA9 solid 5px;
  border-radius:10px ;
}
.Spec{
  white-space: pre-wrap;
  margin-top: 30px;
}
.add-btn-buy{
margin-left: 30px;
padding: 5px 35px 5px 35px;
border: none;
border-radius: 5px; 
background: #d3989938;
font-size: 20px;

}
.add-btn-like{
margin-left: 60px;
margin-right: 30px;
padding: 5px 35px 5px 35px;
border: none;
border-radius: 5px; 
background: #e9cb8931;
font-size: 20px;
}
.add-btn{
margin-bottom: 35px;
margin-left: 82.5px;
padding: 5px 30px 5px 30px;
border: none;
border-radius: 5px; 
background:#899ea9ab;
font-size: 20px;
font-weight: 800;
}
td{
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
}
.push-td{
  color: #FFFF;
}
.like-i{
  color:#e9cb89;
}
.buy-i{
  color:#d39899;
}
.spec-name{
  font-size: 24px;
  font-weight: 800;
  padding: 20px;
  border-bottom:3px solid #899EA9;
}
</style>
