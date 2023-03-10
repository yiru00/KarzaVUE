<template>
    <div class="container h-100 py-5">
        <div class="slider">
          <img src="https://www.bigcamera.com.tw/data/flash/202302/1675329292385310396.png" alt="slider-1">
        </div>
      
        <!-- 新品 -->
        <div class="newproduct">新品上市</div>
        <!-- 新品CARD -->
        <div class="row d-flex justify-content-center">
          <NewProduct></NewProduct>
        </div> 
          <!-- 產品全站篩選 -->
          <div class=" d-flex justify-content-center m-5">
          <select name="type" class="type_select m-2" v-model="optionCate">
            <option value="0">所有類別</option>
            <option  v-for="cate in Categorylist" :key="cate.name" :value="cate.id" >{{cate.name}}</option>
          </select>
          <select name="brand" class="type_select m-2" v-model="optionbrand">
            <option value="0">所有品牌</option>
            <option v-for="brand in Brandlist" :key="brand.name" :value="brand.id" >{{brand.name}}</option>
          </select>
          <div class="search d-flex  m-2">
            <div class="search_icon" @click="CallSearchApi">**</div>
            <input  v-model="inputProName" type="text"  placeholder="輸入商品關鍵字..." @keyup="CallSearchApi" class="search_input">
          </div>
        </div>

            <!-- 篩選在這 -->
            <div class="newproduct">
          <!-- <button class="filter_btn border_btn ">最新*</button> -->
          <button  @click  ="CallOrderByPriceS" class="filter_btn">價格*</button>
          <button  @click  ="CallOrderByPriceB" class="filter_btn">價格*</button>
        </div>

        <!-- 全部Card在這 -->

        <div class="row  m-3 ">
       <AllProduct :parentProduct="ProductResult"></AllProduct>
        </div>
  </div>
</template>

<script>
import NewProduct from './Product/NewProduct.vue';
import AllProduct from './Product/AllProduct.vue';

export default {
  components: {
    NewProduct,
    AllProduct
  },
  name:"AllProducts",
  data(){
    return{
      Categorylist: [],
      Brandlist:[],
      optionCate:"0",
      optionbrand:"0",
      inputProName:"",
      ProductResult:[],
    }
  },
created(){
  this.CallCategorylistApi();
  this.CallBrandlistApi();
  this.CallOrderByPriceS();
},
  methods: {
      async CallCategorylistApi(){
        await axios.get("https://localhost:7259/api/Category/Categorylist")
        .then(response=>{
          console.log(response.data)

          this.Categorylist = response.data 
        })
        .catch(error=>{
          console.log(error);
        });
      },
      async CallBrandlistApi(){
        await axios.get("https://localhost:7259/api/Brands/Brandlist")
        .then(response=>{
          console.log(response)
          this.Brandlist = response.data 
        })
        .catch(error=>{
          console.log(error);
        });
      },

      async CallSearchApi() {
        await axios.get(`https://localhost:7259/api/Product/Search?name=${this.inputProName}&categoryId=${this.optionCate}&brandId=${this.optionbrand}`)
          .then(response=>{
            console.log(response.data)
            this.ProductResult = response.data
          })
          .catch(error => {
            console.log(error);
          });
      },
      async CallOrderByPriceS(){
        await axios.get("https://localhost:7259/api/Product/OrderByPriceS")
        .then(response=>{
          this.ProductResult = response.data
        })
        .catch(error => {
          console.log(error);
        })
      },
      async CallOrderByPriceB(){
        await axios.get("https://localhost:7259/api/Product/OrderByPriceB")
        .then(response=>{
          this.ProductResult = response.data
        })
        .catch(error => {
          console.log(error);
        })
      },
      async CallEventphotos(){
        await axios.get("")
        .then(response=>{
          this.eventimg = response.data
        })
        .catch(error => {
          console.log(error);
        })
      }

  },


};
</script>

<style scoped>
  .slider img{
    width:100%;
  }
  .newproduct{
    font-size: 22px;
    padding: 5px 65px;
    font-weight: 800;
    background:#AFC7D8 ;
    margin-top: 10px;
    margin-bottom:20px ;
  }
  .search_icon{
    font-size: 20px;
  }
  .search_input{
    background: none;
    border: none;
    border-bottom:2px solid #899EA9;
  }
  .type_select{
    background: #899EA9;
    padding: 10px 15px;
    border: none;

  }
  .filter_btn{
  border: none;
  background: none;
  padding:  3px 15px;
  font-weight: 800;
}
</style>