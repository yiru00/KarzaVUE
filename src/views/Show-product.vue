<template>
    <div class="container h-100 py-5">
        <div class="slider">
          <img src="https://www.bigcamera.com.tw/data/flash/202302/1675329292385310396.png" alt="slider-1">
          <img src="https://www.bigcamera.com.tw/data/flash/202207/1657704437671146134.jpg" alt="slider-2">
          <img src="https://www.bigcamera.com.tw/data/flash/202112/1638432752754984139.jpg" alt="slider-3">
        </div>
        <!-- 產品全站篩選 -->
        <div class=" d-flex justify-content-end p-3">
          <select name="type" class="type_select m-2">
            <option value="">請選擇</option>
            <option v-for="category in categories" :key="category">{{category}}</option>
          </select>
          <select name="brand" class="type_select m-2">
            <option value="1">請選擇</option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
          </select>

          <div class="search d-flex  m-2">
            <div class="search_icon">**</div>
            <input type="text" class="search_input">
          </div>
        </div>
        <!-- 新品 -->
        <div class="newproduct">新品上市</div>
        <!-- CARD -->
        <div class="row  m-5">
          <div class="col-md-3">
            <div class="card card1">
              <div class="card-img-top  h200px">
                <img class="d-block w-238px h-236px " src="https://www.bigcamera.com.tw/data/goods/201311/1384338680718085767.jpg" alt="">
              </div>
              <!-- <img class="card-img-top d-block w-100 h200px object-fit-cover" src="./BS02/DQS-1.webp" alt=""> -->
                <div class="card-body">
                      <a class="text-dark text-decoration-none stretched-link" href="https://www.bigcamera.com.tw/goods_view.php?no=182" target="_blank">
                        Fujifilm Instax Mini 40 
                      </a>
                </div>
                <div class="card-footer bg-white border-top-0 d-flex">
                  <span class="me-auto">NT$24,900</span>
                </div>
            </div>
          </div>
        </div> 
        <!-- 篩選 -->
        <div class="newproduct ">
          <button class="filter_btn border_btn ">最新*</button>
          <button class="filter_btn border_btn">價格*</button>
          <button class="filter_btn">價格*</button>
        </div>
        <div class="row  m-5">
          <div class="col-md-3">
            <div class="card card1" @click="intoDetailpro()">
              <div class="card-img-top  h200px">
                <img class="d-block w-238px h-236px " src="https://www.bigcamera.com.tw/data/goods/201311/1384338680718085767.jpg" alt="">
              </div>
              <!-- <img class="card-img-top d-block w-100 h200px object-fit-cover" src="./BS02/DQS-1.webp" alt=""> -->
                <div class="card-body">
                      <a class="text-dark text-decoration-none stretched-link" href="https://www.bigcamera.com.tw/goods_view.php?no=182" target="_blank">
                        Fujifilm Instax Mini 40 
                      </a>
                </div>
                <div class="card-footer bg-white border-top-0 d-flex">
                  <span class="me-auto">NT$24,900</span>
                </div>
            </div>
          </div>
        </div> 
      </div>
</template>

<script>

export default {
data(){
    return{
      categories: ["貓貓", "狗狗", "貓狗", "小黑"]

    }
},
//  mounted(){
//     this.Categorylist();
//     this.Brandlist();
//     this.Search();
//  },
 methods: {
    //  async Categorylist(){
    //     await this.$axios
    //     .get(`api/Category/Categorylist`)
    //     .then((res) => {
    //         if(res.data){
    //             this.products = res.data.data;
    //             console.log(err.response.data);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(err.response.data);
    //     });
    //  },

    // async intoDetailpro(){


    // },
    }
}
</script>

<style scoped>
 .h200px{
    height: 200px;
  }
  .slider img{
    width:100%;
  }
  .card{
    width:15rem;
  } 
  
  .card1 img{
    transition: all 0.2s;
  }
  /* 放大效果 */
  .card1:hover img{
      transform: scale(1.1);
  }

  .search_icon{
    font-size: 20px;
  }
  .search_input{
    background: none;
    border: none;
    border-bottom:2px solid #000;
  }
  .newproduct{
    font-size: 22px;
    padding: 5px 65px;
    font-weight: 800;
    background:#AFC7D8 ;
  }
.filter_btn{
  border: none;
  background: none;
  padding: 3px 8px;
  font-weight: 800;
}
.type_select{
  background: none;
  padding: 5px 10px;
}

</style>