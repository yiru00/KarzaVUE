<template @load="fetchData">
  <div>
    <!-- {{result}} -->
    <!-- <router-link to="/Activity/12">go</router-link> -->
    <form @change="fetchActivityData" class="row inputSearch">
      <div class="col-lg-3 col-md-4 col-12">
        <input
          v-model="input.activityName"
          class="inputName"
          name="activityName"
          id="activityName"
          type="text"
          placeholder="輸入活動名稱關鍵字..."
        />
      </div>
      <div class="col-lg-2 col-md-4 col-6">
        <select
          v-model="input.categoryId"
          class="inputCategory"
          name="categoryId"
          id="categoryId"
        >
          <option value="" disabled>選擇拍攝類型</option>
          <option value="0">所有拍攝類型</option>
          <option
            v-for="option in categoryOption"
            :key="option.categoryName"
            :value="option.id"
          >
            {{ option.categoryName }}
          </option>
        </select>
      </div>
      <div class="col-lg-2 col-md-4 col-6">
        <select
          v-model="input.address"
          class="inputAddress"
          name="address"
          id="adress"
        >
          <option disabled>選擇地區</option>
          <option value="" selected>所有地區</option>
          <option value="基隆市">基隆市</option>
          <option value="台北市">台北市</option>
          <option value="新北市">新北市</option>
          <option value="桃園市">桃園市</option>
          <option value="新竹市">新竹市</option>
          <option value="新竹縣">新竹縣</option>
          <option value="苗栗縣">苗栗線</option>
          <option value="台中市">台中市</option>
          <option value="彰化縣">彰化縣</option>
          <option value="南投縣">南投縣</option>
          <option value="雲林縣">雲林縣</option>
          <option value="嘉義市">嘉義市</option>
          <option value="嘉義縣">嘉義縣</option>
          <option value="台南市">台南市</option>
          <option value="高雄市">高雄市</option>
          <option value="屏東縣">屏東縣</option>
          <option value="宜蘭縣">宜蘭縣</option>
          <option value="花蓮縣">花蓮縣</option>
          <option value="台東縣">台東縣</option>
          <option value="澎湖縣">澎湖縣</option>
          <option value="金門縣">金門縣</option>
          <option value="連江縣">連江縣</option>
        </select>
      </div>
      <div class="col-lg-5 col-md-12 col-12">
        <input
          v-model="input.time"
          :min="minDate"
          class="inputTime"
          name="time"
          type="datetime-local"
          id="inputTime"
        />

        之後的活動
      </div>
    </form>
    <div class="row" id="resultCard">
      <div
        v-for="(card, index) in result"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-xl-3"
      >
        <div class="card" :activityId="card.activityId">
          <div class="card-header">
            <router-link :to="card.route"
              ><img :src="card.coverImage" alt="cover"
            /></router-link>
          </div>
          <div class="card-body">
            <h5>{{ card.activityName }}</h5>
            <p>
              <i class="fa-solid fa-calendar-days"></i>{{ card.gatheringTime }}
            </p>
            <p>
              <i class="fa-solid fa-map-pin"></i
              ><a
                @click="Citytag(card.city)"
                class="addressTag"
                :city="card.city"
                >{{ card.city }}</a
              >
            </p>
            <span class="tag"
              ><a
                @click="Categorytag(card.categoryId)"
                class="categoryTag"
                :categoryId="card.categoryId"
                >{{ card.categoryName }}</a
              >
            </span>
          </div>
          <div class="info">
            <div class="enroll">
              <i class="fa-solid fa-user"></i>
              <p class="num">{{ card.numOfEnrolment }}</p>
            </div>

            <div class="save">
              <!-- 未登入 -->
              <button
                v-if="this.input.memberId == 0"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                type="button"
                class="saveBtn1"
                :activityId="card.activityId"
              >
                <i class="fa-regular fa-bookmark"></i>
              </button>
              <!-- 登入沒收藏 -->
              <button
                v-else-if="card.statusId == 3 && this.input.memberId != 0"
                type="button"
                class="saveBtn"
                :activityId="card.activityId"
                :memberId="this.input.memberId"
              >
                <i class="fa-regular fa-bookmark"></i>
              </button>
              <!-- 登入有收藏 -->
              <button
                v-else-if="card.statusId == 4 && this.input.memberId != 0"
                type="button"
                class="unsaveBtn"
                :activityId="card.activityId"
                :memberId="this.input.memberId"
                :deleteId="card.unSaveId"
              >
                <i class="fa-solid fa-bookmark"></i>
              </button>

              <p class="num">{{ card.numOfCollections }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center"><loginModal /></div>
  </div>
</template>
<script>
import loginModal from "../../components/loginModal.vue";
export default {
  components: {
    loginModal,
  },

  data() {
    return {
      input: {
        activityName: "",
        categoryId: 0,
        address: "",
        time: new Date(),
        memberId: 0,
      },
      result: [],
      minDate: new Date(),
      categoryOption: [],
    };
  },
  mounted() {
    //取得memberId
    this.getMemberId();

    //取得分類選單
    this.getCategory();

    //設定日期最小值和預設值
    this.setTime();

    // 获取 JSON 数据
    this.fetchActivityData();

    $("body").on("click", ".saveBtn", function (e) {
      //有登入會員才能按
      let numOfCollection = Number($(this).next().text());
      $(this)
        .next()
        .text(`${numOfCollection + 1}`);
      let activityId = $(this).attr("activityId");
      let memberId = $(this).attr("memberId");
      $(this)[0].innerHTML = `<i style="width: 16px;
        color: #444444;
        margin-right: 10px;" 
        class="fa-solid fa-bookmark"></i>`;
      //$(this).attr("deleteId", 0); //避免還沒跑完（按鈕還沒變取消收藏鈕）又按一次
      //console.log(activityId);
      let saveData = {
        memberId: memberId,
        activityId: activityId,
      };
      fetch("https://localhost:7259/api/ActivitySave/Save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          $(this).attr("deleteId", data.activityCollectionId);
          $(this).attr("class", "unsaveBtn");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      //console.log(saveData);
    });
    $("body").on("click", ".unsaveBtn", function (e) {
      //有登入會員才能按
      $(this)[0].innerHTML = `<i style="width: 16px;
  color: #444444;
  margin-right: 10px;" class="fa-regular fa-bookmark"></>`;
      let deleteId = $(this).attr("deleteId");
      let numOfCollection = Number($(this).next().text());
      $(this)
        .next()
        .text(numOfCollection - 1);
      // console.log(deleteId);
      fetch("https://localhost:7259/api/ActivitySave/UnSave/" + deleteId, {
        method: "Delete",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          $(this).attr("class", "saveBtn");
          $(this).attr("deleteId", 0);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
    //卡片上的address tag點到時
    this.$nextTick(() => {
      this.result.forEach((city) => {
        const button = this.$el.querySelector(".addressTag");
        button.addEventListener("click", () => {
          this.Citytag(city);
        });
      });
    });
    // 卡片上的categoryTag tag點到時
    this.$nextTick(() => {
      this.result.forEach((categoryId) => {
        const button = this.$el.querySelector(".categoryTag");
        button.addEventListener("click", () => {
          this.Categorytag(categoryId);
        });
      });
    });
  },
  methods: {
    async fetchActivityData() {
      let queryParams = {
        activityName: this.input.activityName,
        categoryId: this.input.categoryId,
        address: this.input.address,
        time: this.input.time,
        memberId: this.input.memberId,
      };
      console.log(queryParams);
      let queryStr = "https://localhost:7259/api/Activity/Search?";
      if (queryParams.activityName !== "")
        queryStr += `activityName=${queryParams.activityName}&`;
      if (queryParams.categoryId !== 0)
        queryStr += `categoryId=${queryParams.categoryId}&`;
      if (queryParams.address !== "")
        queryStr += `address=${queryParams.address}&`;

      queryStr += `time=${queryParams.time}&`;
      queryStr += `memberId=${queryParams.memberId}`;
      console.log(queryStr);
      const response = await fetch(queryStr);
      const data = await response.json();

      this.result = data;
    },
    setTime() {
      let now = new Date(); //取得目前時間
      let time = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        min: now.getMinutes(),
      };

      //拿到格式是xxxx-xx-xxTxx:xx:xx的日期字串
      if (time.month < 10) time.month = `0${time.month}`;
      if (time.day < 10) time.day = `0${time.day}`;
      if (time.hour < 10) time.hour = `0${time.hour}`;
      if (time.min < 10) time.min = `0${time.min}`;
      let timeStr = `${time.year}-${time.month}-${time.day}T${time.hour}:${time.min}`;

      this.input.time = timeStr;
      this.minDate = timeStr;
    },
    Citytag(city) {
      this.input.address = city;
      this.input.activityName = "";
      this.input.categoryId = 0;
      this.setTime();
      this.fetchActivityData();
    },
    Categorytag(categoryId) {
      this.input.address = "";
      this.input.activityName = "";
      this.input.categoryId = categoryId;
      this.setTime();
      this.fetchActivityData();
    },
    getMemberId() {
      let memberId = 0;
      $.ajax({
        url: "https://localhost:7259/api/Members/Read",
        type: "GET",
        async: false,
        beforeSend: function (xhr) {
          let token = $.cookie("token");
          xhr.setRequestHeader("Authorization", "bearer " + token); //將token包在header裡&解碼
        },
        success: function (data) {
          console.log(data);
          memberId = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {},
      });
      this.input.memberId = memberId;
    },
    async getCategory() {
      let response = await fetch(
        "https://localhost:7259/api/Activity/Category"
      );
      let data = await response.json();
      this.categoryOption = data;
    },
  },
};
</script>

<style scoped>
.card {
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 15px #00000033;
  /* height: 300px; */
}
.card-header {
  width: 100%;
  height: 200px;
}
.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-header {
  padding: 0px;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  overflow: auto;
  /* min-height: 200px;
  max-height:250px ; */
}
.card-body a {
  color: #070707;
  text-decoration: none;
  cursor: pointer;
}
.tag {
  background: #a6b6b0;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #fff;
  padding: 1px 5px;
  cursor: pointer;
}
.tag a {
  color: #fff;
  text-decoration: none;
}

.info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
}
.info .enroll,
.info .save {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
p {
  padding: 0px;
  margin: 0%;
}

.saveBtn,
.unsaveBtn,
.saveBtn1 {
  padding: 0px;
  border: 0px;
  background-color: transparent;
}
i {
  width: 16px;
  color: #444444;
  margin-right: 10px;
}

/* search bar */
.inputSearch {
  border-radius: 10px;
  border: 1px solid #fcf7f0;
  background-color: #ffffffd7;
  max-width: 780px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  min-height: 50px;
}
.inputName,
.inputCategory,
.inputAddress,
.inputTime {
  height: 40px;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: 0px;
  color: #444444;
}
.inputName {
  width: 200px;
}

/* result card */
</style>
