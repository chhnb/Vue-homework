<template>
  <p class = title>宿舍维修安排</p>
  <div>
    <el-table
        :header-cell-style="{'border': 'none','background' : 'white'}"
        :data="tableNewData"
        :border="false"
        :cell-class-name="tableRowClassName">
        <el-table-column prop="id" label="报修者编号" align="center" width="100px"> </el-table-column>
        <el-table-column prop="equipmentId" label="报修设备号" align="center" width="100px"> </el-table-column>
        <el-table-column prop="detail" label="内容描述" align="center" width="300px"> </el-table-column>
        <el-table-column prop="date" label="安排时间" align="center" width="300px">
          <template v-slot="scope1">
          <el-date-picker
              v-model="scope1.row.date"
              type="datetime"
              placeholder="Select date and time"
              :default-time="defaultTime"
          />
          </template>
        </el-table-column>

        <el-table-column prop="distribute" label="" align="center">
          <template v-slot="scope2">
          <!--          宿舍分配按钮-->
          <el-button
              type="text"
              size="medium"
              @click="handleClick(scope2.row)"
          > 安排维修 </el-button>
          </template>
        </el-table-column>


    </el-table>
  </div>
</template>

<script>
import axios from "axios";


axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
export default {

  name: "dorRepair",
  data(){
    return{
      defaultTime : new Date(2000, 1, 1, 12, 0, 0),
      time : '',
      tableNewData: [
      ]
    }
  },
  mounted(){
    axios.post('/showMaintenance').then(
        res=>{
          this.$data.tableNewData = res.data.data;
        }
    )
  },
  methods:{
    handleClick(data){
      console.log(data.time);
      console.log(data.date);
      if (data.date===undefined) data.date = new Date()
      console.log('?'+data.date);
      axios.post('/updateMaintenance',{id:data.id,date:data.date}).then(
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