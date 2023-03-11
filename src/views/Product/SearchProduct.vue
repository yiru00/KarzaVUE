<template>
  <div class="d-flex justify-content-center m-5">
    <select name="type" class="type_select m-2">
      <option value="0">所有類別</option>
      <option v-for="category in categories" :key="category">
        {{ category }}
      </option>
    </select>
    <select name="brand" class="type_select m-2">
      <option value="0">所有品牌</option>
    </select>

    <div class="search d-flex m-2">
      <div class="search_icon">**</div>
      <input type="text" class="search_input" />
    </div>
  </div>
</template>

<script>
// import axios from "axios"
export default {
    name:"SearchProduct",
    props: ["ChangeProduct"],
    data() {
    return {
        ShowSearchProduct:[]
    };
  },

  created(){
    this.CallBrandlistApi(),
    this.CallCategorylistApi,
  },
  methods: {
    async CallCategorylistApi(){
        await axios.get("https://localhost:7259/api/Product/Categorylist")
        .then(response=>{
            this.ProCategory =response.data
        })
        .catch(error=>{
            console.log(error);

        });
    } ,
    async CallBrandlistApi(){
        await axios.get("https://localhost:7259/api/Product/Brandlist")
        .then(response=>{
            this.brand =response.data
        })
        .catch(error=>{
            console.log(error);
        });
    } ,


  },
}
</script>

<style scoped>
.search_icon {
  font-size: 20px;
}
.search_input {
  background: none;
  border: none;
  border-bottom: 2px solid #899ea9;
}
.type_select {
  background: #899ea9;
  padding: 10px 15px;
  border: none;
}
</style>
