<template> 
    <div class="container article_banners">
      <div class="row justify-content-center">
          <div class="article_insert col-md-10" >
              <div class="card-header d-flex justify-content-between article_title">
                  <a class="nav-link active fs-3" aria-current="true">
                  創建文章
                  </a>
              </div>
              <div class="post">
                    <div class="d-flex">
                      <p class="author">作者：{{ profileInfo.nickName}}</p>
                      <p class="date ms-2">發布時間：{{ new Date().toLocaleString() }}</p>
                    </div>
                      
                      <div class="article_change " >
                          <p class="forumP" >看板 : </p>
                          <select class="ms-2 form-select" v-model="objArticleforumallid">
                          <option  value="" class="" disabled>未選擇</option>
                          <option v-for="item in objArticleforumall" :key="item.id" :value="item.id" class="">{{item.name}}</option>   
                          </select>
                      </div>                        
              </div>
              <div class=" d-flex flex-column align-items-center justify-content-center">
                  <div class="insert mb-2">
                      <textarea class="form-control textareaColor" v-model="title" name="" id="" cols="102" rows="0" placeholder="標題..."></textarea>
                  </div>
                  <div>
                      <textarea class="form-control textareaColor" v-model="message" name="" id="" cols="102" rows="10" placeholder="內文..."></textarea>
                  </div>
              </div>
              <div class="mt-2">
                  <div class="ms-3 ">
                      <button  @click="openfile" class="btn btn_submit">新增照片</button> 
                      <input type="file" @change="showPhoto" ref="file" style="display: none;" class="form-control">
                      <div class="createimg">
                          <img :src="photoData" alt="error" v-show="photoshow">
                      </div>
                  </div>
                  <div class="insert_check">
                      <div>
                          <button type="button" class="btn bottomBtn" @click="createnow" >新增</button>
                      </div> 
                      <div>
                          <router-link to="/Forum" ><button type="button" class="btn ms-2  cancelBtn" >取消</button></router-link>
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
            objArticleforumallid:"",
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
            console.log(this.token)
            await axios.post(`https://localhost:7259/api/Article/CreateArticle`, articlesave, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
            )
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

    computed: {
      token() {
        return $.cookie("token")
      }
    } 
    

}
</script>

<style scoped>
.textareaColor{
  background-color: rgba(175, 199, 216,0.1);
  border: 0;
}
.bottomBtn{
  background-color:rgba(175, 199, 216);
  color: white;
}
.cancelBtn{
  background-color:#D39899;
  color: white;
}
.forumP{
  margin: 0;
  width: 80px;
}

.btn_submit {
  background: #A6B6B0;
  border-radius: 5px;
  border: none;
  color: #fff;
}
  h1, h2, h3, h4, h5, h6, p{
    margin: 0;
  }

  .createimg img{
      width: 500px;
  }
  .createimg{
    display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
  }
  .post {
    padding: 20px;
    box-shadow: 0px 0px 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    background-color: white;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid #c7cad6;

    border-radius: 15px;
  }
  .article_title{
    padding: 5px 20px;
    background: none;
    border-bottom: 1px solid #8991A9;
  }
  .article_change{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .article_create{
    border-radius: 15px;
    margin-left: 600px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
  }
</style>