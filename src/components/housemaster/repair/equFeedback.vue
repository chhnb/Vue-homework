<template>
  <p class = title>维修反馈</p>
  <div>
    <el-table
        :header-cell-style="{'border': 'none','background' : 'white'}"
        :data="tableNewData"
        :border="false"
        :cell-class-name="tableRowClassName">
      <el-table-column prop="id" label="报修者编号" align="center" width="100px"> </el-table-column>
      <el-table-column prop="equipmentId" label="报修设备号" align="center" width="100px"> </el-table-column>
      <el-table-column prop="detail" label="内容描述" align="center" width="300px"> </el-table-column>
      <el-table-column prop="time" label="维修时间" align="center" width="300px" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="finish" label="" align="center">
        <template v-slot="scope2">
          <!--          宿舍分配按钮-->
          <el-button
              type="text"
              size="medium"
              @click="handleClick(scope2.row)"
          > 完成维修 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'

axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
export default {
  name: "equFeedback",
  data(){
    return{
      tableNewData : [

      ]
    }
  },
  mounted(){

    axios.post('/showPartMaintenance').then(
        res=>{
          this.$data.tableNewData = res.data.data;
        }
    )
  },
  methods:{
    dateFormat:function(date){
      return moment(date.time).format("YYYY-MM-DD HH:mm:ss")
    },
    handleClick(data){
    console.log(data)
      axios.post('/finishMaintenance',{id:data.id,date:data.date}).then(
          res=>{
            console.log(res);
            console.log(res.data)
            console.log(res.data.data)
            location.reload()//todo

          }
      )
    },
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