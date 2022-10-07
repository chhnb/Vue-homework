//register组件

<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="userName" class = "userName">
      <el-input v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name" class = "name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd" class = "pwd">
      <el-input type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" class = "check">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="id" class = "id">
      <el-input v-model="ruleForm.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户类型" prop="userType" class = "type">
      <el-select v-model="ruleForm.userType" class="m-2"   placeholder="请选择用户类别" size="large" autocomplete="off">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item class = "bottom">
      &ensp;&ensp;&ensp;
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
       &ensp;&ensp;&ensp;
      <el-button @click="resetForm('ruleForm')" >重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import axios from "axios";

axios.defaults.baseURL='/api'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      options: [{
        value: 1,
        label: '宿舍居住者'
      }, {
        value: 2,
        label: '宿舍管理员'
      }, {
        value: 3,
        label: '系统管理员'
      }],
      activeName: 'second',
      ruleForm: {
        userName: '',
        pwd: '',
        checkPass: '',
        id: '',
        userType: 1,
        name:''
      },
      rules: {
        userName: [{required: true, message: '请输入您的名称', trigger: 'blur'}, {
          min: 4,
          max: 16,
          message: '长度在 4 到 16 个字符',
          trigger: 'blur'
        }],
        pwd: [{required: true, validator: validatePass, trigger: 'blur'},{
          min: 6,
          max: 16,
          message: '长度在 6 到 16 个字符',
          trigger: 'blur'
        }],
        checkPass: [{required: true, validator: validatePass2, trigger: 'blur'}],
        id: [{required: true, message: '请输入您的身份证号码', trigger: 'blur'}, {
          pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入合法的身份证',
          trigger: 'blur'
        },],
        name: [{required: true, message: '请输入您的姓名', trigger: 'blur'}]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          axios.post('/register',this.$data.ruleForm)
              .then(res=>{
                console.log(res.data)
                let code = res.data.code
                if (code !== 0){
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  });
                  this.$router.push('/')
                }
                else
                {
                  this.$message({
                    type: 'success',
                    message: '提交注册成功'
                  });
                }
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.demo-ruleForm{
  margin: 0 auto;
  width: 400px;
}
.userName{
  width: 300px;
  align-content: center;
}
.name{
  width: 300px;
  align-content: center;
}
.pwd{
  width: 300px;
  align-content: center;
}
.id{
  width: 300px;
  align-content: center;
}
.check{
  width: 300px;
  align-content: center;
}

.type{
  width: 300px;
  align-content: center;
}
.bottom{
  width: 300px;
}
</style>