<template>
    <div class="searchPage">
      <!-- {{result}} -->
      <!-- <router-link to="/Activity/12">go</router-link> -->
      <form class="row inputSearch">
        <div class="col-lg-3 col-md-4 col-12">
          <input
            v-model="input.activityName"
            @keydown.enter="fetchActivityData"
            class="inputName"
            name="activityName"
            id="activityName"
            type="text"
            placeholder="輸入活動名稱關鍵字..."
          />
        </div>
      </form>
    </div>
</template>

<script>
import axios from "axios"
import MyShit from "./Forum/SearchArticle"


export default {
    name:"SearchArticle",
    data() {
        return {
            showArticle: []
        }
    },
    methods: {
        callXXApi() {
            axios.get("url")
            .then(response=> {
                this.showArticle = response 
            })
            .catch(error=> {
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>