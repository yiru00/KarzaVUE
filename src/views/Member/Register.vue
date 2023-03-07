<template>
    
  <div class="d-flex justify-content-center align-items-center">
        <form action="">
        <div>
            <input type="email" v-model="account" placeholder="Email帳號" class="form-control" required>
        </div>
        <div>
            <input type="password" v-model="password" placeholder="密碼" class="form-control" required>
        </div>
        <div>
            <input type="password" v-model="confirmPassword" placeholder="確認密碼" class="form-control" required>
        </div>
        <div>
            <input type="text" v-model="nickname" placeholder="暱稱" class="form-control" required>
        </div>
        <div class="d-flex justify-content-end">
        <button @click="register">註冊</button>
        </div>
      </form>
      </div>
</template>

<script>
 import axios from 'axios';
  export default {
    data(){
        return{
            account:'',
            password:'',
            confirmPassword:'',
            nickname:''
        }
    },
    methods:{
        register(){
            if(!this.password === this.confirmPassword)
            {alert('密碼不相符')}
            else
            
            axios.post('https://localhost:7259/api/Members/SignUp', {
                EmailAccount:this.account,
                EncryptedPassword:this.password,
                ConfirmEncryptedPassword:this.confirmPassword,
                NickName:this.nickname
                }).then(response => {
                console.log(response.data);
                }).catch(error => {
                console.log(error);
                });
            }
        }
    
  }
</script>

<style scoped>

</style>