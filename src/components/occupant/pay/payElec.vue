<template>
  <el-divider class = "divide1"/>
  <p class = title>￥ 电 费 充 值 ￥</p>
  <el-divider class = "divide2"/>

  <div class = "logo">
    <img class ="image" src="@/assets/payElec_logo.png">
  </div>
  <br>
  <br>
  <br>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="宿舍号" prop="dorNum" class = "dorNum">
      <el-input  v-model="ruleForm.dorNum"></el-input>
    </el-form-item>

    <el-form-item label="充值金额" prop="elecPay" class = "elecPay">
      <el-input  v-model="ruleForm.elecPay"></el-input>
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
        dorNum:'',
        elecPay:''
      },
      /**************充值金额rule未设置************/
      rules: {
        dorNum: [{required: true, message: '请输入您的宿舍号', trigger: 'blur'}, {
          max:3,
          pattern: /^[0-9]+$/,
          message: '只能输入正整数',
          trigger: ['blur']
        }],
        elecPay:[{required: true, message: '请输入充值金额', trigger: 'blur'}, {
         pattern: /^[0-9]+$/,
         message: '只能输入正整数',
          trigger: ['blur']
        }]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('/addElectricCost',{id:this.$data.ruleForm.dorNum,money:this.$data.ruleForm.elecPay})
              .then(res=>{
                let code = res.data.code
                console.log(res.data)
                if (code === 0 ){
                  this.$message({
                    type: 'success',
                    message: '提交查询'
                  });
                  this.$data.msg = res.data.data.electric
                  console.log(this.$data.msg)
                  location.reload()
                }
                else{
                  if (code === '50000'){
                    window.localStorage.removeItem('token');
                    this.$message({
                      type: 'error',
                      message: '登录过期 请重新登录'
                    });
                    this.$router.push('/')
                    console.log(res)
                  }
                  else
                  {
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
  height: 200px;

}
.image{
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.demo-ruleForm{
  width: 420px;
  margin: 0 auto;
}
.dorNum{
  width: 350px;
}
.elecPay{
  width: 350px;
}
.button{
  width: 260px;
  height: 60px;
  margin: 0 auto;

}
</style>