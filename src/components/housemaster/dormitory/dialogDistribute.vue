<template>
  <!--1.首先，弹窗页面中要有el-dialog组件即弹窗组件，我们把弹窗中的内容放在el-dialog组件中-->
  <!--2.设置:visible.sync属性，动态绑定一个布尔值，通过这个属性来控制弹窗是否弹出-->
  <el-dialog class="dialog"   v-model="outerVisible" width=332px >

      <div class = "context">
        <el-table
            :header-cell-style="{'background' : 'white'}"
            :data="tableNewData"
            :cell-class-name="tableRowClassName">
          <el-table-column prop="id" label="宿舍号" align="center" width="70px"> </el-table-column>
          <el-table-column prop="number" label="宿舍人数" align="center" > </el-table-column>
          <el-table-column prop="distribute" label="安排入住" align="center">
            <template v-slot="scope">
              <!--          宿舍分配按钮-->
              <el-button
                  type="text"
                  size="medium"
                  @click="handleClick(scope.row.id)"
              > 安排入住 </el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
      </div>
      <el-dialog
          v-model="innerVisible"
          width="30%"
          title="是否确认安排入住"
          append-to-body
      >
        <div class="dialog-inner">
          <el-button @click="innerVisible = false">取消</el-button>
          <el-button type="primary" @click="setDor()"
          >确认</el-button
          >
        </div>
      </el-dialog>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">取消</el-button>
      </div>

  </el-dialog>

</template>
<script>

import axios from "axios";

axios.defaults.baseURL='/api'
axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
export default {
  name: "dialogComponent",

  data(){
    return{
      outerVisible:false,
      innerVisible:false,
      id:'',
      userName:'',
      tableNewData:[]
    }
  },
  mounted(){
    axios.post('/queryPartDormitory').then(
        res=>{
          console.log(res.data)
          console.log(res.data.data)
          this.$data.tableNewData = res.data.data;
        }
    )
  },
  methods:{
    //3.定义一个init函数，通过设置detailVisible值为true来让弹窗弹出，这个函数会在父组件的方法中被调用
    init(data){
      this.outerVisible=true;
      this.$data.userName = data
      //data是父组件弹窗传递过来的值，我们可以打印看看
    },
    handleClick(data){
      console.log()
      this.innerVisible=true;
      this.$nextTick(()=>{
        //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
        //init调用的是dialog-component组件里面的init方法
        //data是传递给弹窗页面的值
        console.log('???')
        console.log(data)
        this.$data.id = data
      })
    },
    setDor(){
      console.log(this.$data.id + ' ' + this.$data.userName);
      axios.post('/addMember',{dormitoryId:this.$data.id,userName:this.$data.userName})
          .then(()=>{
            this.$message({
              type: 'success',
              message: '成功分配'
            });
              }
          )
      location.reload()
      this.$data.innerVisible = false
    }
  },
}
</script>
<style scoped>

.dialog{
  right: 332px;
  width: 332px !important;
  height: 400px !important;
  bottom: 50px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>