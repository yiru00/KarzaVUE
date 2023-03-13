<template>
  <div class="container article_bannerss">
    <div class="row justify-content-center">
      <div class="article_insert">
        <div class="card-header d-flex justify-content-between article_title">
          <div class="d-flex align-items-center mb-2">
            <p class="author">{{ objArticleDetail.nickName }}</p>
            <p class="date ms-2">發布時間：{{ objArticleDetail.time }}</p>
            <p class="author ms-2">看板{{ objArticleDetail.forumName }}</p>
          </div>
          <div>
            <a href="#contentid" class="mylink">撰寫留言</a>
          </div>
        </div>
        <div class="post">
          <div class="align-items-center mb-2">
            <div>
              <h2>標題 {{ objArticleDetail.title }}</h2>
            </div>
            <div>
              <p class="date">文章內容 {{ objArticleDetail.content }}</p>
            </div>
            <div class="imgate">
              <img
                :src="`https://localhost:7259/Images/${objArticleDetail.articlePhoto}`"
                alt=""
              />
            </div>
            <div>
              <p class="comments">共XX則留言</p>
            </div>
          </div>
        </div>
        <p class="comment_title">留言區</p>

        <div
          class="contents_area"
          ref="commentall"
          v-for="item in objArticleDetail.messageComment"
          :key="item.id"
        >
          <div class="comment">
            <div class="ms-3 d-flex">
              <p class="me-1">{{ item.nickName }} :</p>
              <p>{{ item.content }}</p>
              <p>{{ item.time }}</p>
            </div>
            <!-- v-if="memberid==item.memberId"  登入的人是留言者，就可以刪除這則留言 -->
            <button
              type="button"
              class="btn btn-danger delete_btn"
              @click="removeMessage($event, item.id)"
            >
              刪除
            </button>
          </div>
          <!-- Insert -->
          <!-- <div class="comment">
              <div class="ms-3 d-flex">
                <p class="me-1">A :</p>
                <p>123</p>
              </div>
              <button type="button" class="btn btn-danger delete_btn" @click="removeMessage">刪除</button>
            </div> -->
        </div>
        <div class="comment_contents" id="contentid">
          <div class="content_img">
            <img src="" alt="" />
          </div>
          <input
            class="comment_contents_input"
            type="text"
            placeholder="留言..."
            v-model="createMessage"
          />
          <div class="btnbox">
            <button type="button" class="btn btn_submit" @click="clickMessage">
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetail",
  props: ["Articleid"],
  data() {
    return {
      objArticleDetail: {},
      // objArticleComment: {},
      createMessage: "",
      count: 0,
    };
  },

  created() {
    this.callArticleDetailApi();
    // this.callArticleCommentApi()
  },

  methods: {
    async clickMessage() {
      console.log(this.createMessage);
      await axios
        .post(`https://localhost:7259/api/Message/CreateComment`, {
          content: this.createMessage,
          // 是誰留言的 要登入
          memberId: 1,
          articleId: this.objArticleDetail.articleId,
        })
        .then((response) => {
          console.log("新增留言成功");
          const allComment = {
            time: new Date().toLocaleString(),
            // 是誰留言的 要登入
            nickName: "黑",
            content: this.createMessage,
          };
          this.objArticleDetail.messageComment.push(allComment);
          this.createMessage = "";
        });
    },

    // async callArticleCommentApi(){
    //       await axios.get(`https://localhost:7259/api/Article/ArticleComment?messageId=${this.Articleid.messageid}`)
    //       .then(response=> {
    //           console.log(response.data)
    //           this.objArticleComment = response.data
    //       })
    //       .catch(error=> {
    //           console.log(error)
    //       })
    //   },

    async removeMessage(event, id) {
      console.log(id);
      await axios
        .delete(
          `https://localhost:7259/api/Message/DeleteComment?messageid=${id}`
        )
        .then((response) => {
          console.log("刪除留言成功");
          event.target.parentNode.remove();
        });
    },

    // async clickMessage() {
    //     //console.log(this.createMessage)
    //     //console.log(this.$refs.commentall)
    //     const node = document.createElement("div")
    //     node.setAttribute("class", "comment")
    //     node.innerHTML = `
    //       <div class="ms-3 d-flex">
    //         <p class="me-1">A :</p>
    //         <p>${this.createMessage}</p>
    //       </div>
    //       <button type="button" class="btn btn-danger delete_btn" id="btn${this.count}">刪除</button>
    //     `
    //     this.$refs.commentall.appendChild(node);
    //     document.getElementById(`btn${this.count}`).addEventListener("click", this.removeMessage)
    //     this.createMessage = ""
    //     this.count++;
    // },

    async callArticleDetailApi() {
      await axios
        .get(
          `https://localhost:7259/api/Article/ArticleDetails?ArticleId=${this.Articleid}`
        )
        .then((response) => {
          console.log(response.data);
          this.objArticleDetail = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.mylink {
  color: #afc7d8;
}

.imgate img {
  width: 500px;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
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
.article_bannerss {
  margin-top: 10px;
  padding: 0px;
}
.contents {
  display: flex;
}
.forumall {
  text-align: center;
  padding: 20px 50px;
  border-bottom: solid;
}
.forumother {
  text-align: center;
  border-bottom: none;
}
.contents_area {
  margin-top: 30px;
}
.article_insert {
  margin-top: 10px;
  padding: 20px 70px 20px 70px;
  border: 3px solid #8991a9;
  border-radius: 15px;
}
.article_title {
  padding: 5px 20px;
  background: none;
  border-bottom: 1px solid #000;
}
.article_change {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
}
.article_category {
  padding: 3px 10px;
}
.article_create {
  border-radius: 15px;
  margin-left: 600px;
}
.choice {
  margin-top: 20px;
}
.articl_search {
  display: flex;
}
.article_text {
  background: blue;
  padding: 5px 50px;
  border-radius: 10px;
}
.article_text p {
  margin: 0;
}
.insert {
  border: none;
}
.insert_title {
  width: 100%;
  height: 50px;
  border: none;
}
.insert_content {
  width: 100%;
  height: 400px;
}
.insert_photos {
  margin-left: 20px;
  border-radius: 15px;
  margin-top: 10px;
}
.delete_btn {
  margin-top: 4px;
  display: flex;
  font-size: 14px;
}
.comment_title {
  margin-left: 20px;
}
.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.comment_contents {
  padding: 0px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment_contents_input {
  width: 80%;
  height: 45px;
  border-radius: 15px;
  border: 1px solid #000;
  padding-left: 15px;
}
.content_img {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #000;
}
.btnbox {
  margin-left: 10px;
}
.btn_submit {
  background: green;
  padding: 7px 13px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  color: #fff;
  height: 40px;
}
</style>
