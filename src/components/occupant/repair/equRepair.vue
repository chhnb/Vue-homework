<template>
  <el-divider class = "divide1"/>
     <p class = title>宿 舍 报 修</p>
  <el-divider class = "divide2"/>
  <div class = "logo">
    <img class ="image" src="@/assets/repair_logo.png">
  </div>
  <br>
  <br>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="报修设备号" prop="equNum" class = "equNum">
      <el-input  v-model="ruleForm.equNum"></el-input>
    </el-form-item>

    <el-form-item label="报修说明" prop="equContext" class = "equContext">
      <el-input  v-model="ruleForm.equContext"></el-input>
    </el-form-item>

    <el-form-item class = "button">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

axios.defaults.baseURL='/api'
axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
export default {
  data(){
    return{
      msg:'',
      ruleForm:{
        equNum:'',
        equContext:''
      },
      /**************充值金额rule未设置************/
      rules: {
        equNum: [{required: true, message: '请输入您的设备号', trigger: 'blur'}],
        equContext: [{required: true, message: '请输入您的原因', trigger: 'blur'}]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('/addMaintenance', {userName:window.localStorage.getItem('userName'),equipmentId:this.$data.ruleForm.equNum,detail:this.$data.ruleForm.equContext})
              .then(res=>{
                console.log(res)
                this.$data.msg = res.data
                if (res.data.code === 0){
                  this.$message({
                    type: 'success',
                    message: '提交修改'
                  });
                }
                else{
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
  }
}
</script>

<style scoped>
.title{
  font-family: "微软雅黑";
  font-size: x-large;
  font-weight: bold;
  color: #4e606c;
}
.divide1 {
  border-style: dot-dot-dash ;
  border-color: #7993a2;
}
.divide2{
  border-style: dot-dot-dash ;
  border-color: #7993a2;
}
.logo{
  width: 100%;
  height: 250px;

}
.image{
  width: 250px;
  height: 250px;
  margin: 0 auto;
}
.demo-ruleForm{
  width: 400px;
  margin: 0 auto;
}
.dorNum{
  width: 350px;
}
.equNum{
  width: 350px;
}
.equContext{
  width: 350px;
}
.button{
  width: 330px;
  height: 60px;
  margin: 0 auto;
  margin-left: 70px;

}
</style>