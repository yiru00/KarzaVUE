<template>
  
  <div class="col-md-3" v-for="item in products" :key="item.id" >
    <router-link :to="/Product/ +item.id">
            <div class="card card1">
              <div class="card-img-top">
                <img class="d-block w-100 h-236px " src="https://www.bigcamera.com.tw/data/goods/201311/1384338680718085767.jpg" alt="">
              </div>
              <!-- <img class="card-img-top d-block w-100 h200px object-fit-cover" src="./BS02/DQS-1.webp" alt=""> -->
                <div class="card-body">
                      <a class="text-dark text-decoration-none stretched-link" href="https://www.bigcamera.com.tw/goods_view.php?no=182" target="_blank">
                        {{ item.name }}
                      </a>
                </div>
                <div class="card-footer bg-white border-top-0 d-flex">
                  <span class="me-auto">{{item.price}}</span>
                </div>
            </div>
          </router-link>
          </div>
        
</template>

<script>

export default {
    name: "AllProduct",
    props: ["parentProduct"],
    data() {
    return {
      products: null,   
      };
    },
    watch: {
      parentProduct(){
        this.products = this.parentProduct
      }
    },

  created(){
    this.CallAllProductsApi();
  },
 methods: {
    async CallAllProductsApi() {
        await axios.get("https://localhost:7259/api/Product/AllProducts")
          .then(response=>{
            this.products = response.data
          })
          .catch(error => {
            console.log(error);
          });
      },


  },
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: #070707;
}
 .card{
    margin-bottom: 45px;
    width:15rem;
  } 
  .card1 img{
    transition: all 0.2s;
  }
  /* 放大效果 */
  .card1:hover img{
      transform: scale(1.1);
  }
</style>