<template>
  <section>
        <div class="container">
          <div class="content ">
            <div class=" insert_forgotpassword">
                <div class="forgotpassword_user">忘記密碼</div>
                <div class="flex_middle">
                    <label for="" class="forgotpassword_text">姓名 :　</label>
                    <input type="text" v-model="realname" placeholder="請輸入姓名" class="form-control Mcontrol" required>
                </div>
                <div class="flex_middle">
                    <label for="" class="forgotpassword_text">帳號 :　</label>
                    <input type="email" v-model="account" placeholder="請輸入Email" class="form-control Mcontrol" required>
                </div>
                <div class="flex_middle">
                    <label for="" class="forgotpassword_text">電話 :　</label>
                    <input type="text" v-model="mobilenumber" placeholder="請輸入手機號碼" class="form-control Mcontrol" required>
                </div>             
                <div class="forgotpassword_btn">
                    <button @click="forgotpassword" >送出</button>
                </div>
              </div>
            
          </div>
        </div>
      </section >
</template>

<script>
import utility from "../../../public/utility.js"
import axios from 'axios';
  export default {
    data(){
        return{
            realname:'',
            account:'',
            mobilenumber:''
        }
    },
  mixins: [utility],
    methods:{
        forgotpassword(){

            axios.post('https://localhost:7259/api/Members/ForgotPassword', {
                RealName:this.realname,
                EmailAccount:this.account,
                Mobile:this.mobilenumber             
                }).then(response => {
                if(response.data==="資料有誤")
                {
                  this.showAlert("資料有誤")
                }else
                {
                  this.showAlert("請至信箱查看新密碼")
                  this.$router.push("/HomeVie")
                }
                }).catch(error => {
                console.log(error);
                });
            }
        }
    
  }
</script>

<style scoped>
  .content{
    margin: 69px auto;
    width: 450px;
  }
  .insert_forgotpassword{
    padding: 40px 60px 50px;
    border: 5px solid #afc7d8;
    border-radius: 20px;
  }
  .forgotpassword_user{
    text-align: center;
    font-size: 30px;
    margin-bottom: 35px;
    font-weight: bold;
    letter-spacing: 1.5px;
    color:#8991a9;
  }
  .flex_middle{
    display: flex;
    align-items: center;
    width: 100%;
    margin: 20px 0;
  }
  .flex_middle label{
    width: 100px;
    letter-spacing: 1px;
  }
  .register_text{
    font-size: 16px;
    font-weight: bolder;
    color:#8991a9;
  }
  .flex_middle input{
    width: 200px;
    padding: 5px 10px;
    border: none;
    border-bottom: 1px solid #8991a9;
    letter-spacing: 1.5px;
    background: none;
    color:#8991a9;
  }
  .forgotpassword_btn{
    display: flex;
    justify-content: center;
    height: 40px;
    border-radius: 10px;
    border: 0px;
    background: #afc7d8;
    margin-top: 30px;
  }
  .forgotpassword_btn button{
    border: none;
    background: none;
    color: #fff;
  }

</style>