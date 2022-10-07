//register组件

<template>
  <el-divider class = "divide1"/>
  <p class = title>修 改 密 码</p>
  <el-divider class = "divide2"/>
  <div class = "logo">
    <img class ="image" src="@/assets/changePwd_logo.png">
  </div>
  <br>
  <br>
  <br>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass" class = "pwd">
      <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" class = "check">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item class = "button">
      <el-button type="primary" @click="submitForm('ruleForm')" class = "submit">修改</el-button>
      <el-button @click="resetForm('ruleForm')" class = "reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import axios from "axios";

axios.defaults.baseURL='/api'
axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
export default {
  name: "changePassword",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [{required: true, validator: validatePass, trigger: 'blur'},{
          min: 6,
          max: 16,
          message: '长度在 6 到 16 个字符',
          trigger: 'blur'
        }],
        checkPass: [{required: true, validator: validatePass2, trigger: 'blur'}]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });

          axios.post('/changePwd',{token:window.localStorage.getItem('token'),pwd:this.$data.ruleForm.pass}) //todo
              .then(res=>{
                this.$router.push("/housemaster")
                console.log(res.data);
              })
        } else {
          console.log('error submit!!!!!!!!!!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.pwd{
  width: 350px;
}
.check{
  width: 350px;
}
.button{
  width: 330px;
  height: 60px;
  margin: 0 auto;

}
</style>