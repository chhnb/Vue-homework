<template>
  <div class = "all">
    <div class = "head">
      <br>
      <p class="title">宿 舍 管 理 系 统</p>
    </div>
    <p class="login">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName" class = "name">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass" class ="pwd">
              <el-input type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              &ensp;&ensp;&ensp;
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="second">
          <register></register>
        </el-tab-pane>
      </el-tabs>
      <el-button class = 'search' @click="tosearch">查看审核</el-button>
    </p>
  </div>

</template>

<script>

import register from '@/components/start/register';
import axios from "axios";


export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        callback();
      }
    };

    return {
      activeName: 'first',
      token:'',
      code:0,
      message:'',
      usertype:0,
      ruleForm: {
        userName: '',
        pwd: '',
        checkPass: ''
      },
      rules: {
        userName: [{required: true, message: '请输入您的名称', trigger: 'blur'}, {
          min: 4,
          max: 16,
          message: '长度在 4 到 16 个字符',
          trigger: 'blur'
        }],
        pass: [{required: true, validator: validatePass, trigger: 'blur'},{
          min: 6,
          max: 16,
          message: '长度在 8 到 16 个字符',
          trigger: 'blur'
        }]
      }
    };
  },

  methods: {
    //选项卡切换
    // handleClick(tab, event) {},
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    tosearch(){
      this.$router.push('/search');
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {

        if (valid) {
          axios.post('/login',this.$data.ruleForm)
              .then(res=>{
                console.log(res.data.data)
                this.$data.code = res.data.code
                this.$data.message = res.data.message
                this.$data.token = res.data.token
                // this.$data.usertype = res.data.usertype

                let code = this.$data.code
                if (code !== 0){
                  this.$message({
                    type: 'error',
                    message:this.$data.message
                  });
                }
                else{
                  this.$data.usertype = res.data.data.userType
                  this.$message({
                    type:'success',
                    message:"登录成功"
                  })
                  window.localStorage.setItem('token',this.$data.token)
                   window.localStorage.setItem('userName',res.data.data.userName)
                   window.localStorage.setItem('name',res.data.data.name)
                   window.localStorage.setItem('userType',res.data.data.nuserType)
                  console.log(window.localStorage.getItem('dormitoryId'))
                  let ty = this.$data.usertype;

                  if (ty === 1){
                    this.$router.push('/index')
                  }
                  else if (ty === 2){
                    this.$router.push('/housemaster')
                  }
                  else if (ty === 3){
                    this.$router.push('/admin')
                  }
                  else{
                    console.log("userType Error")
                  }
                }
              })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  components: {
    register
  }
};
</script>
<style scoped>

.title{
  font-family: "华文行楷";
  font-size: xxx-large;
  text-align: center;
  /*font-weight: bolder;*/
  margin-bottom: 0px;
  color: #4e768f;
}
.login{
  text-align: center;

}
::v-deep .el-tabs__nav-scroll{
  width:10%;
  margin:0 auto
}
.demo-ruleForm{
  margin: 0 auto;
  width: 400px;
}
.name{
  width: 300px;
  align-content: center;
}
.pwd{
  width: 300px;
  align-content: center;
}
</style>
<!--<style lang="scss">-->
<!--.login {-->
<!--  width: 400px;-->
<!--  margin: 0 auto;-->
<!--}-->

<!--.el-tabsitem {-->
<!--  text-align: center;-->
<!--  width: 60px;-->
<!--}-->
<!--.search{-->

<!--}-->
<!--</style>-->