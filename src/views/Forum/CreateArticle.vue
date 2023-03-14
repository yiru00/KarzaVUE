<template> 
    <div class="container article_banners">
    <div class="row justify-content-center">
        <div class="article_insert col-md-10" >
            <div class="card-header d-flex justify-content-between article_title">
                <a class="nav-link active " aria-current="true">
                創建文章
                </a>
            </div>
            <div class="post">
                <div class="d-flex align-items-center mb-2 "  >
                    <p class="author">作者：{{ profileInfo.nickName}}</p>
                    <p class="date ms-2">發布時間：{{ new Date().toLocaleString() }}</p>
                    <div class="article_change " >
                        <p class="m-0 ms-4 " >文章篩選 : </p>
                        <select class="article_category ms-2" v-model="objArticleforumallid">
                        <option  value="" class="choice" disabled>選擇看板</option>
                        <option v-for="item in objArticleforumall" :key="item.id" :value="item.id" class="choice">{{item.name}}</option>   
                        </select>
                    </div>              
                </div>
                <div class="insert mb-2">
                    <textarea v-model="title" name="" id="" cols="100" rows="0" placeholder="標題..."></textarea>
                </div>
                <div>
                    <textarea v-model="message" name="" id="" cols="100" rows="10" placeholder="內文..."></textarea>
                </div>
            </div>
            <div class="mt-2">
                <div class="ms-3">
                    <button  @click="openfile">新增照片</button> 
                    <input type="file" @change="showPhoto" ref="file" style="display: none;">
                    <div class="createimg">
                        <img :src="photoData" alt="error" v-show="photoshow">
                    </div>
                </div>
                <div class="insert_check ">
                    <div>
                        <button type="button" class="btn btn-primary insert_check" @click="createnow" >新增</button>
                    </div> 
                    <div>
                        <router-link to="/Forum" ><button type="button" class="btn btn-danger insert_check ms-2" >取消</button></router-link>
                    </div>         
                    </div>   
                </div>
                
            </div>
            
        </div>
    </div> 
</template>

<script>
import axios from "axios" 
import utility from "../../../public/utility.js";

export default {
    name: "CreateArticle",
    data(){
        return {
            photoData: "",
            photoshow: false,
            photofile: {},


            objArticleforumall: [],
            profileInfo: {},
            title:"",
            message:"",
            objArticleforumallid:""

        }
    },

    mixins: [utility],

    created() {
        this.loginPerson();
        this.callCreateArticleForumAllApi();
    },  
    methods: {
        openfile(){
            this.$refs.file.click()
        },

        showPhoto(event) {
            const file = event.target.files[0];
            this.photofile = file;
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () =>{
                this.photoshow = true;
                // console.log(reader.result);
                this.photoData = reader.result;
            }
        },
        async goSubmit() {
            console.log(this.photofile)
            console.log(this.title);
            console.log(this.description);

            const formData = new FormData();
            formData.append("Id", 2);
            formData.append("File", this.photofile);
            formData.append("Title", this.title);
            formData.append("Description", this.title);

            await axios.post("https://localhost:7259/api/Photo/Create", formData)
            .then(response => {
                console.log("GOGO")
            })
            .catch(error => {
                console.log(error)
            })
        },


        async callCreateArticleApi(articlesave){
            await axios.post(`https://localhost:7259/api/Article/CreateArticle`, articlesave)
            .then(()=> {
                console.log("成功")
                this.$router.push("/Forum")
            })
            .catch(error=> {
                console.log(error)
            })
        },

        async callCreateArticleForumAllApi(){
            await axios.get(`https://localhost:7259/api/Forum/ForumAll`)
            .then(response=> {
                // console.log(response.data)
                this.objArticleforumall = response.data
            })
            .catch(error=> {
                console.log(error)
                
            })
            
        },

        async createnow() {
            let id = await this.fetchMemberId();

            console.log(Number(this.objArticleforumallid))

            const formData = new FormData();
            formData.append("MemberId", id);
            formData.append("Title", this.title);
            formData.append("Files", this.photofile);
            formData.append("Content", this.message);
            formData.append("ForumId", Number(this.objArticleforumallid));

            this.callCreateArticleApi(formData)
        },


        async loginPerson() {
      let id = await this.fetchMemberId();

      if (id != 0) {
        fetch(`https://localhost:7259/api/Members/Profile?id=${id}`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${$.cookie("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            this.profileInfo = data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    },

    

}
</script>

<style scoped>
    h1, h2, h3, h4, h5, h6, p{
      margin: 0;
    }

    .createimg img{
        margin-top: 20px;
        width: 500px;
    }
    

    header {
      background-color: #000001;
      color: #fff;
      padding: 20px;
    }
    .post {
      padding: 20px 20px 10px 20px;
      /* border-bottom: 1px solid #aaa; */
      box-shadow: 0px 0px 5;
    }
    .post p {
      margin-bottom: 5px;
    }
    a {
      text-decoration-line: none;
    }
    .date{
      letter-spacing: 1px;
    }
    .forum {
      margin: 0 auto;
      padding: 20px;
      display: flex;
      margin-top: 25px;

    }
    .article_banners{
      margin-top: 10px;
      padding: 50px ;
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
    .article_insert{
      margin-top: 10px;
      padding: 20px 70px 20px 70px;
      border: 3px solid #8991A9;
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
    .insert{
        border: none;
    }
    .insert_title{
        width: 100%;
        height: 50px;
        border: none;
    }
    .insert_content{
        width: 100%;
        height: 400px;
    }
    .insert_photos{
      margin-left: 20px;
      border-radius: 15px;
      margin-top: 10px;
    }
    .insert_check{
        margin-top: 30px;
        display: flex;
        margin-left: 185px;
    }
</style>