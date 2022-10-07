<template>
  <!--  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原宿舍号" prop="oldNum">
        <el-input  v-model="ruleForm.oldNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>-->
  <el-dialog
      v-model="Visible"
      width="30%"
      title=""
      align-center
      append-to-body
  >
    <p class = "dialog">是否确认注销账号？</p>
    <div class="dialog-inner" >
      <el-button @click="Visible = false" class="button1">取消</el-button>
      <el-button type="primary" @click="submit()" class = "button2"
      >确认</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";

axios.defaults.baseURL='/api'
axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
export default {
  data(){
    return{
      Visible:true,
    }
  },
  methods:{
    submit(){
      axios.post('/delLogin',{token:window.localStorage.getItem('token')}).then(
          ()=>{
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('userName')
            window.localStorage.removeItem('userType')
            this.$router.push('/')
          }
      )
    }
  }
}
</script>

<style scoped>
.dialog{
  text-align: center;
  font-size: large;
  margin-bottom: 30px;
  color: dimgray;
}
.button1{
  margin-left: 80px;
}
.button2{
  margin-left: 40px;
}
</style>