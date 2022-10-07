<template>
  <div class = "active" v-if="!isActive" style="text-align: center" >
    <div class = "word">
      <el-text class = "text"  size = "large"  >
        宿舍号: {{Form.dorNum}}<br><br>
        1号床 : &ensp;{{Form.peopleNum1}}<br><br>
        2号床 ：{{Form.peopleNum2}}<br><br>
        3号床 ：{{Form.peopleNum3}}<br><br>
        4号床 ：{{Form.peopleNum4}}<br><br>
      </el-text>
    </div>

    <div class = "logo">
      <img class ="image" src="@/assets/searchDor_logo.png">
    </div>
  </div>

  <div class = "not" v-if="isActive">
      宿管尚未分配宿舍！
  </div>


</template>

<script>
import axios from "axios";

axios.defaults.baseURL='/api'
// 请求拦截器，每次请求都会先执行这里的代码
axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头


export default {
  name: "searchDor",
  data(){
    return{
      /**********************前后端交互******************/
      isActive : true,
      Form:{
        dorNum : '',
        peopleNum1 :'',
        peopleNum2 :'',
        peopleNum3 :'',
        peopleNum4 :'',
      }
    }
  },
  mounted() {
    axios.post('/queryDormitory', {token:window.localStorage.getItem('token')})
        .then(res=>{
          console.log(res.data)
          if (res.data.code === 0){
            this.$data.Form.dorNum = res.data.data.id
            this.$data.Form.peopleNum1 = res.data.data.peopleNum1
            this.$data.Form.peopleNum2 = res.data.data.peopleNum2
            this.$data.Form.peopleNum3 = res.data.data.peopleNum3
            this.$data.Form.peopleNum4 = res.data.data.peopleNum4
            this.$data.isActive = false
          }
          else{
            this.$data.isActive = true
            if (res.data.code === '50000'){
              window.localStorage.removeItem('token');
              this.$message({
                type: 'error',
                message: '登录过期 请重新登录'
              });
              this.$router.push('/')
              console.log(res)
            }
            else{
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }
        })
  }
}
</script>

<style scoped>
.logo{
  width: 100%;
  height: 300px;
  margin-top: 50px;
}
.image{
  width: 511px;
  height: 300px;
  margin: 0 auto;
}
.active{
  margin: 0 auto;
  margin-top: 10px;
  height: 556px;

}
.not{
  height: 50px;
  width: 150px;
  background-color: gray;
  margin: 0 auto;
}
.text{
  width: 200px;
  height: 200px;
  font-size: large;
  font-weight: bold;
  font-family: "微软雅黑";
  text-align: left;
  margin: 0 auto;
  margin-top: 100px;
  color: #4e606c;
}
.word{
  text-align: left;
  margin-left: 45%;
  width: 300px;
}
</style>