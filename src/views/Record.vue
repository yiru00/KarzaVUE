<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
    <nav>
        <h4>我的紀錄</h4>
        <ul>
            <h5>官方活動</h5>
            <li> <RouterLink to="/ActivitySave">收藏</RouterLink></li>
            <li><RouterLink to="">報名</RouterLink></li>
        </ul>
        <ul>
            <h5>商城</h5>
            <li> <RouterLink to="">收藏</RouterLink></li>
            <li><RouterLink to="">訂單記錄</RouterLink></li>
        </ul>
       
    </nav>
  

    <RouterView /> 

</template>



<style>

</style>