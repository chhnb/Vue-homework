<template>
  <p class = title>账户审核</p>
  <div>
    <el-table :data="tableNewData"
              border style="width: 100%; margin-top: 20px"
              :cell-class-name="tableRowClassName">
      <el-table-column prop="userName" label="用户名" align="center" width="140px"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="80px"> </el-table-column>
      <el-table-column prop="id" label="身份证号" align="center" width="170px"> </el-table-column>
      <el-table-column prop="userType" label="用户类别" align="center" width="140px"></el-table-column>
      <el-table-column prop="result" label="审核结果" align="center">
        <template v-slot="scope2">
<!--          审核通过按钮-->
          <el-button
              type="text"
              size="medium"
              @click="passBtn(scope2.row)"
          > 审核通过 </el-button>
          &ensp;
          <el-divider direction="vertical" />
          &ensp;
          &ensp;
<!--          审核不通过原因选择器-->
          <el-select v-model="scope2.row.reason" class="m-2" placeholder="请选择原因">
            <el-option
                v-for="item in reason"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
<!--          退回按钮-->
          <el-button
              type="text"
              size="medium"
              @click="backBtn(scope2.row)"
          > &ensp; 审核不通过 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
import axios from "axios";

axios.defaults.baseURL='/api'
axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
import { ref } from 'vue'
export default {
  data(){
     return{
       value : ref(''),
       /*****列表数据******/
       tableNewData:[
       ],
       setUp : [
         {
           value : '宿舍居住者',
           label : '宿舍居住者'
         },
         {
           value : '宿舍管理员',
           label : '宿舍管理员'
         },
         {
           value : '系统管理员',
           label : '系统管理员'
         }
       ],

       reason : [
         {
           value : 2,
           label :'姓名不属实'
         },
         {
           value : 3,
           label :'身份证号不符'
         },
         {
           value : 4,
           label :'用户类型不符'
         }
       ]
     }
  },

  methods:{
    passBtn(row){
       console.log(row)
       axios.post('/passRegister',{userName:row.userName}).then(
           ()=>{
          this.$message({
            type:'success',
            message:'success'
          })
             location.reload()
        }
       )
    },
    backBtn(row){
      if (row.reason === undefined){
        this.$message({
          type: 'error',
          message: '请选择原因'
        });
        return
      }
      else{
        axios.post('/refuseRegister',{errorCode:row.reason,userName:row.userName}).then(//todo
            ()=>{
              this.$message({
                type:'success',
                message:'success'
              })
              location.reload()
            }
        )
        console.log(row)
      }
    }
  },
  mounted() {
    axios.post('/showRegister')
        .then(res=>{
          this.$data.tableNewData = res.data.data
          this.$data.tableNewData.map(function (val){
            if (val.userType === 1){
              val.userType = '宿舍居住者'
            }
            else if (val.userType === 2){
              val.userType = '宿舍管理员'
            }
            else if (val.userType === 3){
              val.userType = '系统管理员'
            }
          })
        })
  }
}
</script>

<style scoped>
.title{
  font-family: "微软雅黑";
  font-size: large;
  font-weight: bold;
  color: #4e606c;
}
</style>