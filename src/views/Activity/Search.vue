<template @load="fetchData">
  <div > 
  {{result}}
  <router-link to="/Activity/12">go</router-link>
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
            <select v-model="input.categoryId" class="inputCategory" name="categoryId" id="categoryId">
              <option value="0" >所有拍攝類型</option>
            </select>
          </div>
          <div class="col-lg-2 col-md-4 col-6">
            <select v-model="input.address" class="inputAddress" name="address" id="adress">
              <option value="" selected disabled>選擇地區</option>
              <option value="">所有地區</option>
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
          
        </div>
</div>
</template>
<script>

export default {
 
  data() {
    return {
      input:{activityName:"",categoryId:0,address:"",time:new Date(),memberId:0},
      result: [],
      minDate: new Date()  // 最小值为当前日期
    };
  },
  mounted() {
    //設定日期最小值和預設值
    this.setTime();
    // 获取 JSON 数据
    this.fetchActivityData();
   
  
  },
  methods: {

async fetchActivityData() {
      let queryParams={
        activityName:this.input.activityName,
        categoryId:this.input.categoryId,
        address:this.input.address,
        time:this.input.time,
        memberId:this.input.memberId
      }
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
  console.log(queryStr)
    const response = await fetch(queryStr)
    const data = await response.json()
    this.result = data
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

  this.input.time=timeStr
  this.minDate=timeStr
},


}
}
</script>


<style scoped>

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