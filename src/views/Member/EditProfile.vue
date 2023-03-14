<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="edit_profile_header">
          <h1>編輯個人資訊</h1>
        </div>

        <div class="edit_profile">
          <div class="edit_profile_left">
            <img :src="photoData" />
            <div class="edit_profile_right_info_photo">
              <button for="" class="file-label" @click="uploadpicture">
                頭貼
              </button>
              <input
                id="file-input"
                class="file-input"
                type="file"
                ref="fileSticker"
                @change="handleFileChange"
              />
            </div>
          </div>

          <div class="edit_profile_right">
            <div class="edit_profile_right_info">
              <label for="">姓名</label>
              <input type="text" v-model="realname" />
            </div>
            <div class="edit_profile_right_info">
              <label for="">暱稱</label>
              <input type="text" v-model="nickname" />
            </div>
            <div class="edit_profile_right_info">
              <label for="">生日</label>
              <input type="text" v-model="birthday" />
            </div>
            <div class="edit_profile_right_info">
              <label for="">手機</label>
              <input type="text" v-model="mobile" />
            </div>
            <div class="edit_profile_right_info">
              <label for="">地址</label>
              <input type="text" v-model="address" />
            </div>
            <div class="edit_profile_right_info">
              <label for="">關於</label>
              <textarea
                class="text_about"
                type="text"
                v-model="about"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="edit_profile_submit">
          <button class="btn edit_profile_submit_btn" @click="submitForm">
            送出
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import utility from "../../../public/utility.js";
import axios from "axios";

export default {
  data() {
    return {

        realname:'',
        nickname:'',
        birthday:'',
        mobile:'',
        address:'',
        about:'',
        selectedFile: null,
        photoData: {},
    };
  },
  mixins: [utility],
  async created() {
    let id = await this.fetchMemberId();

    await axios.get(`https://localhost:7259/api/Members/Profile?id=${id}`,
       {
        headers: {
          Authorization: "Bearer " + $.cookie("token"),
        },
      })
      .then((response) => {
        if(response.data.birthOfDate)
        this.birthday = response.data.birthOfDate.substring(0,10);

        this.realname = response.data.realName;
        this.nickname = response.data.nickName;
        this.mobile = response.data.mobile;
        this.address = response.data.address;
        this.about = response.data.about;
        if (response.data.photoSticker) this.photoData = `https://localhost:7259/Images/${response.data.photoSticker}`;
        else this.photoData= new URL("../../assets/userPic.png", import.meta.url)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    uploadpicture() {
      this.$refs.fileSticker.click();
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.photoData = reader.result;
      };
    },
    async submitForm() {
      if (
        !this.selectedFile ||
        !this.realname ||
        !this.nickname ||
        !this.birthday ||
        !this.mobile ||
        !this.address ||
        !this.about
      ) {
        this.showAlert("填完所有資料開始最好體驗");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("RealName", this.realname);
      formData.append("NickName", this.nickname);
      formData.append("birthOfDate", this.birthday);
      formData.append("Mobile", this.mobile);
      formData.append("Address", this.address);
      formData.append("About", this.about);

      try {
        const response = await axios.post(
          "https://localhost:7259/api/Members/EditProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + $.cookie("token"),
            },
          }
        );

        this.$router.go(0);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 1440px;
  margin: 0 auto;
}
.content {
  width: 800px;
  height: fix-content;
  margin: 0 auto;
  border-radius: 15px;
  padding: 50px 80px;
  background-color: #fcf7f0;
  color: #8991a9;
}
.edit_profile_header {
  color: #8991a9;
  text-align: center;
  padding-bottom: 30px;
}
.edit_profile_header h1 {
  margin: 15px 0;
  font-size: 35px;
  font-weight: bolder;
}
.edit_profile {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* .edit_profile_left{

        } */
.edit_profile_left img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 1px solid #000;
}
.edit_profile_right {
  width: 300px;
  color: #8991a9;
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
}
.edit_profile_right_info {
  /* margin: 20px 0; */
  display: flex;
  justify-content: start;
  align-items: center;
  /* align-items: end; */
}
.edit_profile_right_info label {
  width: 80px;
  margin-right: 0px;
  margin: 20px 0;
  display: flex;
  justify-content: start;
  align-items: end;
}
.edit_profile_right_info input {
  /* margin-left: 20px; */
  height: 30px;
  background: none;
  border: none;
  border-bottom: 1px solid #8991a9;
}

.edit_profile_submit {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  margin-right: 20px;
}
.edit_profile_submit_btn {
  background: #afc7d8;
  /* background: #A6B6B0; */
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  color: #ffffff;
  letter-spacing: 1px;
}

.edit_profile_right_info_photo {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.file-label {
  background: #afc7d8;
  /* background: #A6B6B0; */
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  color: #ffffff;
  letter-spacing: 1px;
}
.file-input {
  display: none;
}

textarea {
  margin-top: 40px;
  display: block;
  width: 370px;
  height: 100px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

textarea:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
