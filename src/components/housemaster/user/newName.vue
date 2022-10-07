<template>
  <el-divider class = "divide1"/>
  <p class = title>修 改 用 户 名</p>
  <el-divider class = "divide2"/>
  <div class = "logo">
    <img class ="image" src="@/assets/repair_logo.png">
  </div>
  <br>
  <br>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="新用户名" prop="userName" class = "name">
      <el-input  v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <br>
    <el-form-item class = "button">
      <el-button type="primary"  @click="submitForm('ruleForm')" class = "submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";


axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
export default {
  name: "newName",
  data(){
    return{
      ruleForm:{
        userName:'',
      },
      rules: {
        userName: [{required: true, message: '请输入您的名称', trigger: 'blur'}, {
          min: 4,
          max: 16,
          message: '长度在 4 到 16 个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.$data.ruleForm.userName)
          axios.post('/changeUserName',{token:window.localStorage.getItem('token'),userName:this.$data.ruleForm.userName})
              .then(res=>{
                console.log(res.data)
                if (res.data.code  === 0){
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  });
                  window.localStorage.setItem('userName',this.ruleForm.userName)
                  window.localStorage.setItem('token',res.data.token)
                }
                else{
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  });
                  if(res.data.code === '50000'){
                    window.localStorage.removeItem('token')
                    this.$router.push('/')
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
  height: 200px;

}
.image{
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.demo-ruleForm{
  width: 400px;
  margin: 0 auto;
}
.name{
  width: 350px;
}
.button{
  width: 260px;
  height: 60px;
  margin: 0 auto;

}

</style>