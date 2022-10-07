<template>
  <div class = "head">
    <br>
    <p class="title">宿 舍 管 理 系 统</p>
  </div>
  <el-divider />
  <div class = "main">
    <div class = "logo">
      <img class ="image" src="@/assets/search_logo.png">
    </div>
    <div class="right">
      <p class="title2"></p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :class="form">
        <el-form-item label="用户名" prop="userName" class = "name">
          <el-input v-model="ruleForm.userName" ></el-input>
        </el-form-item>
        <el-form-item class = "button">
          <el-button type="primary" @click="submitForm('ruleForm')">点击查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


  <div class = "show">
    <h1>{{msg}}</h1>
  </div>

</template>

<script>
import axios from "axios";
axios.defaults.baseURL='/api'
export default {
  name: "search",
  data(){
    return{
      msg:'',
      ruleForm:{
        userName:''
      },
      rules: {
        userName: [{required: true, message: '请输入您的名称', trigger: 'blur'}, {
          min: 2,
          max: 5,
          message: '长度在 2 到 5 个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '查询成功'
          });
          axios.post('/queryRegister',this.$data.ruleForm)
              .then(res=>{
                console.log(res)
                this.$data.msg = res.data.message
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
  font-family: "华文行楷";
  font-size: xxx-large;
  text-align: center;
  /*font-weight: bolder;*/
  margin-bottom: 0px;
  color: #4e768f;
}
.logo{

  height: 200px;
  width:500px;
  float: left;

}
.image{
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-left: 250px;
}
.right{
  height: 200px;
  width:698px;
  float: right;

}
.title2{
  width: 420px;
  font-family: "微软雅黑";
  font-size: large;
  text-align: center;
  margin-left: 0px;
  margin-bottom: 0px;
  color: dimgray;

}
.demo-ruleForm{
  width: 420px;
  margin: 0 auto;
  margin-left: 0px;
  margin-top: 50px;
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