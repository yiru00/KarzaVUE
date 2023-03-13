<template>
  <div class="container article_bannero">
    <div class="contents row">
      <div class="forum col-2">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item forumall">
              <a href="#">所有看板</a>
            </li>
            <!-- 所有看板列表 -->
            <li
              v-for="item in objforum"
              :key="item.id"
              class="list-group-item forumother"
            >
              <a href="#" @click="callForumOnceApi(item.id)">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-10">
        <div class="articl_search">
          <div>
            <input
              v-model="inputTitle"
              type="text"
              class="article_texts"
              placeholder="輸入文章關鍵字..."
              @keyup="callSearchApi"
            />
          </div>
        </div>
        <div class="article">
          <div class="card-header d-flex justify-content-between article_title">
            <a
              class="nav-link active"
              aria-current="true"
              style="cursor: pointer"
              @click.prevent="callPopularArticleApi"
            >
              全部文章
            </a>
            <div>
              <router-link to="/Forum/Create"
                ><button class="article_create">新增文章</button></router-link
              >
            </div>
            <div class="article_change">
              <p class="m-0 me-3">文章篩選 :</p>
              <select
                class="article_category"
                v-model="changeArticle"
                @change="changeNewOld"
              >
                <option value="" class="choice" disabled>未選擇</option>
                <option class="choice">熱門</option>
                <option class="choice">最新</option>
              </select>
            </div>
          </div>
          <!-- 內容在這 -->
          <Forumarticle :parentArticles="showArticle"></Forumarticle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Forumarticle from "./Forum/Forumarticle.vue";
export default {
  name: "PopularArticle",
  data() {
    return {
      objforum: [
        {
          id: 2,
          name: "AAA",
        },
        {
          id: 3,
          name: "BBB",
        },
      ],

      inputTitle: "",
      showArticle: [],

      changeArticle: "",
    };
  },
  created() {
    this.callForumallApi();
    this.callSearchApi();
  },
  mounted() {
    this.callSearchApi();
  },
  methods: {
    //全部看板
    async callForumallApi() {
      await axios
        .get("https://localhost:7259/api/Forum/ForumAll")
        .then((response) => {
          console.log(response.data);
          this.objforum = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //某看板
    async callForumOnceApi(id) {
      await axios
        .get(`https://localhost:7259/api/Article/ForumArticle?ForumId=${id}`)
        .then((response) => {
          console.log(id);
          console.log("搜尋某看板成功");
          this.showArticle = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //搜尋文章
    async callSearchApi() {
      await axios
        .get(
          `https://localhost:7259/api/Article/Search?title=${this.inputTitle}`
        )
        .then((response) => {
          console.log(response.data);
          this.showArticle = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //熱門文章
    async callPopularArticleApi() {
      await axios
        .get("https://localhost:7259/api/Article/PopularArticle")
        .then((response) => {
          console.log(response.data);
          this.showArticle = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //最新文章
    async callLatestArticleApi() {
      await axios
        .get("https://localhost:7259/api/Article/LatestArticle")
        .then((response) => {
          console.log(response.data);
          this.showArticle = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    changeNewOld() {
      if (this.changeArticle === "熱門") {
        this.callPopularArticleApi();
      } else {
        this.callLatestArticleApi();
      }
    },
  },

  components: {
    Forumarticle,
  },
};
</script>

<style scoped>
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
a {
  text-decoration-line: none;
}
.forum {
  margin: 0 auto;
  padding: 20px;
  display: flex;
  margin-top: 25px;
}
.article_bannero {
  margin-top: 10px;
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
.article {
  margin-top: 10px;
  padding: 20px;
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
  margin-left: 500px;
}
.choice {
  margin-top: 20px;
}
.articl_search {
  display: flex;
}
.article_texts {
  padding: 5px 50px;
  border-radius: 10px;
}
.article_texts p {
  margin: 0;
}
</style>
