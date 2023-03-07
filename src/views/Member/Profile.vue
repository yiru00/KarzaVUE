<template>
   <div>
    <table>
      <thead>
        <tr>
          <th>帳號</th>
          <th>密碼</th>
          <th>姓名</th>
          <th>生日</th>
          <th>暱稱</th>
          <th>電話</th>
          <th>地址</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.birthday }}</td>
          <td>{{ user.nickname }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    axios.get('https://localhost:7259//api/Members/Profile').then(response => {
      this.users = response.data
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style>

</style>