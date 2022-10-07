<template>
  <el-container class = "top">
    <el-header class = "head">
      <div class = head_left>
        <br>

        <p class = "homeTitle" align="center">个人主页</p>
      </div>
      <div class = "head_right">
        <p class = "name">
          <u>Hello!&ensp;{{userName}}&ensp;欢迎登录</u>
        </p>
        <p class = "nameTitle" align="center">系统管理员</p>
      </div>

    </el-header>
    <el-divider />
  </el-container>
  <el-container class = "contain">
    <el-aside class = "left" width="200px" >
      <el-menu
          active-text-color="#ffd04b"
          background-color="#4e606c"
          text-color="#fff"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router = "true"
      >
        <!--    返回-->
        <el-menu-item index="1" @click="quit">
          <el-icon><document /></el-icon>
          <span>退出</span>
        </el-menu-item>


        <!--    账户信息维护     -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>账户信息维护</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click = "newName">修改用户名</el-menu-item>
            <el-menu-item index="2-2" @click = "changePwd">修改密码</el-menu-item>
            <el-menu-item index="2-3" @click = "cancelAccount">注销</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!--         账户审核-->
        <el-menu-item index="3" @click = "auditAccount">
          <el-icon><document /></el-icon>
          <span >账户审核</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main class = "context"><router-view></router-view></el-main>
  </el-container>

</template>

<script>
export default {
  name: "index",
  created() {
    this.$data.userName = window.localStorage.getItem('name');
    console.log("hhhh");
  },
  data(){
    return{
      userName : ' '
    }
  },
  methods:{
    quit(){
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('usertype')
      this.$route.push("/")
    },
    newName(){
      this.$router.push("/admin/newName")
    },
    changePwd(){
      this.$router.push("/admin/changePwd")
    },
    cancelAccount(){
      this.$router.push("/admin/cancelAccount")
    },
    auditAccount(){
      this.$router.push("/admin/auditAccount")
    },
  }
}

</script>

<style scoped>
.top{
  height: 109px;
  background-color:#7993a2;
}
.head{
  height: 85px;
  /*background-color: cornflowerblue;*/
}
.head_left{
  width: 200px;
  height: 85px;
  float: left;
  margin: 0 ;
}
.homeTitle{
  font-family: "微软雅黑";
  font-size: x-large;
  font-weight: bold;
  color: white;
}
.head_right{
  width: 200px;
  height: 85px;
  float: right;
}
.name{
  margin-top: 5px;
  color: darkslategrey;
}
.nameTitle{
  font-family: "华文行楷";
  font-size: xx-large;
  font-weight: bold;
  color: white;
}
.contain{
  height: 100%;
  background-color: #cde2e9;
}
.left{

  height: 100%;
  width: 200px;
  margin:0;
  padding:0;
  border:0;
  background-color: #4e606c;

}
.el-menu-vertical-demo{
  margin:0;
  padding:0;
  border:0
}
.context{
  height: 100%;
  min-height: 900px;

  background-size: cover;

}
</style>