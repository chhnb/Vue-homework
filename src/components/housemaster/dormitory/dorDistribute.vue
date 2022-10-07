<template>
  <p class = title>宿舍分配</p>
  <div>
    <el-table
              :header-cell-style="{'border': 'none','background' : 'white'}"
              :data="tableNewData"
              :border="false"
              :cell-class-name="tableRowClassName">
      <el-table-column prop="userName" label="用户名" align="center" width="150px"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="150px"> </el-table-column>
      <el-table-column prop="id" label="身份证号" align="center" width="300px"> </el-table-column>
      <el-table-column prop="distribute" label="分配宿舍" align="center">
        <template v-slot="scope2">
          <!--          宿舍分配按钮-->
          <el-button
              type="text"
              size="medium"
              @click="handleClick(scope2.row.userName)"
          > 查看空闲宿舍 </el-button>
<!--          <el-button
              type="text"
              size="medium"
              @click="handleClick(scope2.row.userName)"
          > 查看空闲宿舍 </el-button>-->
          <dialogDistribute v-if="Visiable" ref="dialog"></dialogDistribute>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
import { ref } from 'vue'
import dialogDistribute from "./dialogDistribute"
import axios from "axios";

axios.defaults.baseURL='/api'
axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

export default {
  components:{
    dialogDistribute
  },
  data(){
    return{
      value : ref(''),
      Visiable:false,
      /*****列表数据******/
      tableNewData:[
      ],
    }
  },
  mounted(){
    axios.post('/queryHomeless').then(
        res=>{
          console.log(res.data)
          console.log(res.data.data)
          this.$data.tableNewData = res.data.data;
        }
    )
  },
  methods:{
    handleClick(data){
      console.log("")
      this.Visiable=true;
      this.$nextTick(()=>{
        //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
        //init调用的是dialog-component组件里面的init方法
        //data是传递给弹窗页面的值
        this.$refs.dialog.init(data);
      })
    },
    /*handleClick(data){
      this.$parent('distribute',data)
    }*/
  },
}
</script>

<style scoped>
.title{
  font-family: "微软雅黑";
  font-size: large;
  font-weight: bold;
  color: #4e606c;
}
/*.table >>> .el-table__row>td{*/
/*  !* 去除表格线 *!*/
/*  border: none;*/
/*}*/

</style>