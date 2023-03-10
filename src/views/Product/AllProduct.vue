<template>
   
  <div class="col-md-3" v-for="item in products" :key="item.id" >
    <router-link :to="/Product/ +item.id">
            <div class="card card1">
              <div class="card-img-top">
                <img class="d-block w-100 h-236px " src="https://www.bigcamera.com.tw/data/goods/201311/1384338680718085767.jpg" alt="">
              </div>
              <!-- <img class="card-img-top d-block w-100 h200px object-fit-cover" src="./BS02/DQS-1.webp" alt=""> -->
                <div class="card-body">
                      <a class="text-nowrap text-dark text-decoration-none stretched-link" href="https://www.bigcamera.com.tw/goods_view.php?no=182" target="_blank">
                        {{ item.name.slice(0,18) }}...
                      </a>
                </div>
                <div class="card-footer bg-white border-top-0 price">
                  <span>NTD  {{item.price}}</span>
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


      async addToCart(item, mode, className) {
      // 點選 + - 或 直接輸入數量 (mode 0 1 2)
      if (mode != 3) {
        // 取得物件數量
        let input = document.querySelector(className);
        let count = input.value;
        // 此物件index
        let findIndex = this.cartsSelect.indexOf(item);

        console.log("findIndex", findIndex);
        console.log("input", input);
        console.log("count", count);

        // 假如數量 = 1 且按下-按鈕 (mode = 1)
        if (mode == 1 && count == 1) {
          // 刪除動作
          this.removeCartItem(item);
          return;
        }

        // 假如數量 = 1 指定數量為0 (mode = 2)
        if (mode == 2 && count == 0) {
          // 刪除動作
          this.removeCartItem(item, true);
          return;
        }

        // 依照mode改變數量
        switch (mode) {
          case 0:
            this.cartsSelect[findIndex].Qty++;
            break;
          case 1:
            this.cartsSelect[findIndex].Qty--;
            break;
          case 2:
            this.cartsSelect[findIndex].Qty = count;
            break;
        }

        // 儲存到storage
        this.saveLocalStorage("cartsSelect", this.cartsSelect);
      } else {
        // 點選加入購物車(mode 3)

        // 防呆 依id確認購物車有沒有商品 有的話更新陣列數量+1 沒有新增一筆
        let findProduct = this.cartsSelect.find((a) => a.Id == item.id);
        console.log("findProduct add", findProduct);

        if (findProduct) {
          // 已在購物車 找到index 修改物件值
          let index = this.cartsSelect.indexOf(findProduct);
          this.cartsSelect[index].Qty++;
        } else {
          // 未在購物車 加入陣列
          this.cartsSelect.push({
            Id: item.id,
            Qty: 1,
            Name: item.name,
            Price: item.price,
          });
        }

        // 儲存到storage
        this.saveLocalStorage("cartsSelect", this.cartsSelect);
      }

      console.log(this.cartsSelect);
    },

    // 刪除購物車內容
    async removeCartItem(item, getDefaultVal) {
      let index = this.cartsSelect.indexOf(item);
      // 找不到index會是-1 找得到才刪
      if (index > -1) {
        // 確認刪除
        this.$swal.fire(this.delSweetConfirm).then((result) => {
          if (result.isConfirmed) {
            // 按下刪除
            this.cartsSelect.splice(index, 1); // 刪除陣列元素
            // 儲存到storage
            this.saveLocalStorage("cartsSelect", this.cartsSelect);
          } else {
            // 按下取消
            // 從storage取回預設值 (數量input blur後值會改變 所以要回歸預設值)
            if (getDefaultVal) {
              this.getlocalStorage("cartsSelect");
            }
          }
        });
      }
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
  .card1:hover {
      transform: scale(1.1);
  }
  .price{
    display: flex;
    justify-content: end;

  }
</style>