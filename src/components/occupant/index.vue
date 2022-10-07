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
        <p class = "nameTitle" align="center">宿舍居住者</p>
      </div>
    </el-header>
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
          <el-menu-item-group >
<!--            <el-menu-item index="2-1" @click = "newName">修改用户名</el-menu-item>-->
            <el-menu-item index="2-2" @click = "changePwd">修改密码</el-menu-item>
            <el-menu-item index="2-3" @click = "cancelAccount">注销</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!--         宿舍信息查询-->
        <el-menu-item index="3" @click = "searchDor">
          <el-icon><document /></el-icon>
          <span >宿舍信息查询</span>
        </el-menu-item>

        <!--         宿舍调整-->
        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
            <span>宿舍调整</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click = "changDor">调换</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!--         水电费查询-->
        <el-sub-menu index="5">
          <template #title>
            <el-icon><location /></el-icon>
            <span>水电费查询</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click = "searchWater">水费查询</el-menu-item>
            <el-menu-item index="5-2" @click = "searchElec">电费查询</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!--         水电费充值-->
        <el-sub-menu index="6">
          <template #title>
            <el-icon><location /></el-icon>
            <span>水电费充值</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click = "payWater">水费充值</el-menu-item>
            <el-menu-item index="6-2" @click = "payElec">电费充值</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!--    宿舍报修-->
        <el-menu-item index="7" @click = "equRepair">
          <el-icon><document /></el-icon>
          <span>宿舍报修</span>
        </el-menu-item>


      </el-menu>
    </el-aside>

    <el-main class = "context" back>
      <router-view></router-view></el-main>
  </el-container>

</template>

<script>
export default {

  /*********************************交互用户名******************************/
  data(){
    return{
      userName:''
    }
  },
  name: "index",
  created() {
    this.$data.userName = window.localStorage.getItem('name');
  },
  methods:{
    quit(){
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userName')
      window.localStorage.removeItem('userType')
      this.$route.push("/")
    },
    changDor(){
      this.$router.push("/index/changDor")
    },
    searchDor(){
      this.$router.push("/index/searchDor")
    },
    searchElec(){
      this.$router.push("/index/searchElec")
    },
    searchWater(){
      this.$router.push("/index/searchWater")
    },
    payElec(){
      this.$router.push("/index/payElec")
    },
    payWater(){
      this.$router.push("/index/payWater")
    },
    newName(){
      this.$router.push("/index/newName")
    },
    changePwd(){
      this.$router.push("/index/changePwd")
    },
    cancelAccount(){
      this.$router.push("/index/cancelAccount")
    },
    equRepair(){
      this.$router.push("/index/equRepair")
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
  /*background-color: burlywood;*/
}
</style>