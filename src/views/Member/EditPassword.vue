<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="insert_editpassword">
          <div class="editpassword_user">變更密碼</div>
          <div class="flex_middle">
            <label for="" class="editpassword_text">舊密碼 :　</label>
            <input
              type="password"
              v-model="oldpassword"
              placeholder="舊密碼"
              class="form-control Mcontrol"
              required
            />
          </div>
          <div class="flex_middle">
            <label for="" class="editpassword_text">新密碼 :　</label>
            <input
              type="password"
              v-model="password"
              placeholder="輸入密碼"
              class="form-control Mcontrol"
              required
            />
          </div>
          <div class="flex_middle">
            <label for="" class="editpassword_text">確認新密碼 :　</label>
            <input
              type="password"
              v-model="confirmpassword"
              placeholder="重複密碼"
              class="form-contro Mcontrol"
              required
            />
          </div>
          <div class="editpassword_btn">
            <button @click="editpassword">送出</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import utility from "../../../public/utility";
export default {
  mixins: [utility],
  data() {
    return {
      oldpassword: "",
      password: "",
      confirmpassword: "",
    };
  },
  methods: {
    editpassword() {
      if (!this.oldpassword || !this.password || !this.confirmpassword) {
        this.showAlert("必須填入密碼");
        return;
      }

      if (this.password !== this.confirmpassword) {
        this.showAlert("兩次密碼不一樣");
      } else
        axios
          .post(
            "https://localhost:7259/api/Members/EditPassword",
            {
              OldEncryptedPassword: this.oldpassword,
              EncryptedPassword: this.password,
              ConfirmEncryptedPassword: this.confirmpassword,
            },
            {
              headers: {
                Authorization: "Bearer " + $.cookie("token"),
              },
            }
          )
          .then((response) => {
            if (response.data === "密碼有誤") {
              this.showAlert("密碼有誤");
            } else {
              this.showAlert("密碼已修改");
              this.$router.push("/HomeVie");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>

<style scoped>
.content {
  margin: 69px auto;
  width: 450px;
}
.insert_editpassword {
  padding: 40px 60px 50px;
  border: 5px solid #afc7d8;
  border-radius: 20px;
}
.editpassword_user {
  text-align: center;
  font-size: 30px;
  margin-bottom: 35px;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #8991a9;
}
.flex_middle {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}
.flex_middle label {
  width: 100px;
  letter-spacing: 1px;
}
.editpassword_text {
  font-size: 16px;
  font-weight: bolder;
  color: #8991a9;
}
.flex_middle input {
  width: 200px;
  padding: 5px 10px;
  border: none;
  border-bottom: 1px solid #8991a9;
  letter-spacing: 1.5px;
  background: none;
  color: #8991a9;
}
.editpassword_btn {
  display: flex;
  justify-content: center;
  height: 40px;
  border-radius: 10px;
  border: 0px;
  background: #afc7d8;
  margin-top: 30px;
}
.editpassword_btn button {
  border: none;
  background: none;
  color: #fff;
}
</style>
