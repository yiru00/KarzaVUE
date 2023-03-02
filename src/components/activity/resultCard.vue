<template>
   <div class="col-12 col-sm-6 col-md-4 col-xl-3">
    <div class="card" :activityId="activityId">
      <div class="card-header">
        <router-link :to="route" ><img :src="coverImage" alt="cover"/></router-link>
      </div>
      <div class="card-body">
        <h5>{{ activityName }}</h5>
        <p><i class="fa-solid fa-calendar-days"></i>{{gatheringTime}}</p>
        <p><i class="fa-solid fa-map-pin"></i><a class="addressTag" :city="city">{{ city }}</a></p>
        <span class="tag"
          ><a class="categoryTag" :categoryId="categoryId">{{categoryName}}</a>
        </span>
      </div>
      <div class="info">
        <div class="enroll">
          <i class="fa-solid fa-user"></i>
          <p>{{numOfEnrolment}}</p>
        </div>

        <div class="save" >
          
            <!-- 未登入 -->
          <button v-if="memberId==0" data-bs-toggle="modal" data-bs-target="#loginModal" type="button" class="saveBtn1" :activityId="activityId"><i class="fa-regular fa-bookmark"></i></button>
          <!-- 登入沒收藏 -->
          <button v-else-if="statusId == 3 && memberId != 0" type="button" class="saveBtn" :activityId="activityId"><i class="fa-regular fa-bookmark"></i></button>
          <!-- 登入有收藏 -->
          <button v-else-if="statusId == 4 && memberId != 0" type="button" class="unsaveBtn" :activityId="activityId" :unSaveId="unSaveId"><i class="fa-solid fa-bookmark"></i></button>
          
          <p>{{numOfCollections}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
    props: {
        
        route:String,
        activityId: Number,
        categoryId: Number,
        categoryName:String,
        coverImage:String,
        activityName:String,
        gatheringTime:String,
        city:String,
        numOfEnrolment:Number,
        numOfCollections:Number,
        statusId:Number,
        unSaveId:Number,
        memberId:Number,
  }

}
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

</style>