<template>
    <div class="post" v-for="item in showArticle" :key="item.id">
        <div class="d-flex align-items-center mb-2">
        <p class="">作者：{{ item.nickName }}</p>
        <p class="date ms-2">發布時間：{{ item.time }}</p>
        <p class="ms-2">{{ item.forumName }}</p>
        </div>
        <div class="borderImgsss ">
        <h2 class= "mb-2 " ><router-link :to="`/Forum/ArticleDetail/${item.articleId}`" class="wordss" >{{ item.title }}</router-link></h2>
        <div class="imgsss">
        <img class="" :src="`https://localhost:7259/Images/${item.articlePhoto}`" alt="">
        </div>
        </div>
        <p class="content mb-2">{{ item.content }}</p>
        <!-- <p class="">留言數：{{ item }}</p> -->
    </div>
</template>     


<script>
export default {
    name: "ForumArticle",
    props: ["parentArticles"],
    data(){
        return{
            showArticle: [],
            
        }
    },
    watch: {
        parentArticles() {
            this.showArticle = this.parentArticles
        }
    },  
}


</script>

<style scoped>

  .wordss{
    color:#444444;
    font-weight:bold;
  }
  .borderImgsss {
    display: flex;
    justify-content: space-between;
  }
    .imgsss img{
      width: 200px;
    }

    h1, h2, h3, h4, h5, h6, p{
      margin: 0;
    }
    .post {
      padding: 20px 20px 10px 20px;
      border-bottom: 1px solid #aaa;
      box-shadow: 0px 0px 5;
    }
    .post p {
      margin-bottom: 5px;
    }
    a {
      text-decoration-line: none;
    }
    .contents {
      display: flex;
    }
</style>