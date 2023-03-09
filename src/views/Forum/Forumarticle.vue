<template>
    <div class="post">
        <div class="d-flex align-items-center mb-2">
        <p class="author">作者：使用者名稱</p>
        <p class="date ms-2">發布時間：2023/03/07</p>
        <p class="author ms-2">看板</p>
        </div>
        <h2 class= "mb-2"><a>標題</a></h2>
        <p class="content mb-2">文章內容</p>
        <p class="comments">留言數：10</p>
    </div>
</template>

<script>
export default {
    name: "ForumArticle"
}
</script>

<style scoped>
    h1, h2, h3, h4, h5, h6, p{
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    header {
      background-color: #000001;
      color: #fff;
      padding: 20px;
    }

    nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
    }

    nav li {
      margin-right: 20px;
    }

    nav li:last-child {
      margin-right: 0;
    }

    nav a {
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
    }

    main {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
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
    .forum {
      margin: 0 auto;
      padding: 20px;
      display: flex;
      margin-top: 25px;

    }
    .article_banner{
      margin-top: 10px;
    }
    .contents {
      display: flex;
    }
    .forumall {
      text-align: center;
      padding: 20px 50px;
      border-bottom:solid;
    }
    .forumother{
      text-align: center;
      border-bottom:none;
      
    }
    .article{
      margin-top: 10px;
      padding: 20px;
      border: 3px solid blue;
      border-radius: 15px;
    }
    .article_title{
      padding: 5px 20px;
      background: none;
      border-bottom: 1px solid #000;
    }
    .article_change{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 50px;
    }
    .article_category{
      padding: 3px 10px;
    }
    .article_create{
      border-radius: 15px;
      margin-left: 600px;
    }
    .choice{
      margin-top: 20px;
    }
    .articl_search{
      display: flex;
    }
    .article_text{
      background: blue;
      padding: 5px 50px;
      border-radius: 10px;
    }
    .article_text p {
      margin: 0;
    }
</style>