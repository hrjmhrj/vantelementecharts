<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="所属期">
                <el-date-picker
                        size="mini"
                        v-model="queryForm.ssq"
                        align="right"
                        type="year"
                        format="yyyy"
                        value-format="yyyy"
                        placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="名称">
                <el-input placeholder="请输入名称" v-model="queryForm.nsrmc" clearable size="small">
                </el-input>
            </el-form-item>
            <el-form-item label="识别号">
                <el-input placeholder="请输入识别号" v-model="queryForm.nsrsbh" clearable size="small">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" @click="reset" >重置</el-button>
                <el-button type="primary" size="mini" @click="getSearchList" >搜索</el-button>
            </el-form-item>
            <el-col>
                <el-form-item>
                    <!--<el-button type="warning" size="mini" @click="imPortData">导入数据</el-button>-->
                    <el-button type="primary" size="mini" :disabled="multiple" @click="sendOrder" >项目组派单</el-button>
                </el-form-item>
            </el-col>
        </el-form>
        <!--数据表格-->
        <el-table :data="tableList" highlight-current-row border v-loading="tableLoad"
                  style="min-width: 100%" size="mini"
                  ref="tableList" @selection-change="handleSelectionChange" id="exportTab">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column type="index" :index="indexMethod" label="序号" width="90" align="center"/>
            <el-table-column prop="nsrsbh" label="识别号" width="230" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="nsrmc" label="名称" width="240" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="ncyeZc" label="年初余额" width="160" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="qmyeZc" label="期末余额" width="160" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="ssq" label="所属期(年)" width="160" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="fromTableName" label="数据来源" width="240" :show-overflow-tooltip="true" align="center"/>
        </el-table>
        <!--  分页  -->
        <el-pagination class="paginbox" style="display: flex;flex-direction: row-reverse;margin-top: 10px;"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :page-sizes="[10,15,20]"
                       :current-page="queryForm.page"
                       :page-size="queryForm.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total"/>
        <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="70%" :before-close="handleDialogClose">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="项目名称">
                    <el-input size="small" placeholder="请输入" v-model="dialog.projectName"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" size="mini" @click="resetDialog">重置</el-button>
                    <el-button type="primary" size="mini" @click="getDialogList">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="dialogTable" highlight-current-row :data="dialogTableData" tooltip-effect="dark"
                      style="width: 100%" @selection-change="handleDialogSelectionChange">
                <el-table-column type="selection" width="55"/>
                <el-table-column type="index" :index="indexMethod" label="序号" width="60" align="center"/>
                <el-table-column prop="projectName" label="项目名称" :show-overflow-tooltip="true" align="center"/>
                <el-table-column prop="projectUserNum" width="100" label="项目人数" :show-overflow-tooltip="true" align="center"/>
                <el-table-column prop="startTime" label="开始时间" :show-overflow-tooltip="true" align="center"/>
                <el-table-column prop="endTime" label="结束时间" :show-overflow-tooltip="true" align="center"/>
                <el-table-column width="80" prop="updateBy" label="添加人" :show-overflow-tooltip="true" align="center"/>
                <el-table-column prop="projectStatus" label="当前状态" :formatter="statusFormatter" :show-overflow-tooltip="true"
                                 align="center"/>
                <el-table-column prop="marks" label="备注" :show-overflow-tooltip="true" align="center"/>
            </el-table>
            <div class="dialog-footer" style="text-align: center;margin-top: 2vh">
                <el-button size="small" type="primary" @click="dialogSubmit">保 存</el-button>
                <el-button size="small" @click="dialog.visible = false" style="margin-left: 3vw">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "FinancialStatement",
    data() {
      return {
        queryForm: {
          ssq: undefined,
          nsrmc: '',
          nsrsbh: '',
          limit: 10,
          page: 1
        },
        tableList: [
          {
            nsrsbh:123,
            nsrmc:"李四",
            ncyeZc:10,
            qmyeZc:1,
            ssq:1993,
            fromTableName:"哈库拉玛塔塔",
          },
          {
            nsrsbh:121212,
            nsrmc:"张三",
            ncyeZc:100,
            qmyeZc:1,
            ssq:1991,
            fromTableName:"刚果",
          },
        ],
        tableLoad: false,
        total: 0,
        multipleSelection: [],
        dialogTableData: [
          {
            projectName:"阿里巴巴",
            projectUserNum:8,
            startTime:"2020-06-01",
            endTime:"2020-06-11",
            updateBy:"基德",
            projectStatus:"有效",
            marks:"备注",
          },
        ],
        dialog: {
          title: '',
          visible: false,
          projectName: '',
          projectStatus: '0'
        },
        dialogMultipleSelection: [],
        // 非多个禁用
        multiple: true,
      }
    },
    methods: {
      //重置
      reset() {
        this.queryForm = {
          ssq: '',
          nsrmc: '',
          nsrsbh: '',
          limit: 10,
          page: 1
        }
        //this.getList()
        this.multipleSelection = []
      },
      //搜索
      getSearchList(){
        this.queryForm.limit = 10;
        this.queryForm.page = 1;
        //this.getList();
      },
      //查询列表
      getList() {
        //this.tableLoad = true;
        /*this.axios({
          url: '/stockRight/finance/list',
          method: 'get',
          params: this.queryForm
        }).then(res => {
          if (res.data.code == 200) {
            this.tableList = res.data.obj;
            this.total = res.data.total;
            this.tableLoad = false;
          } else {
            this.failedTip('提示', res.data.msg, 1500)
            this.tableLoad = false;
          }
        })*/
      },
      //导入数据
      imPortData() {

      },
      //项目组派单
      sendOrder() {
        this.dialog.title = '项目组派单'
        //this.getDialogList()
        this.dialog.visible = true
      },
      handleSizeChange(val) {
        this.queryForm.limit = val
        //this.getList()
      },
      handleCurrentChange(val) {
        this.queryForm.page = val
        //this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.multiple = !val.length
      },
      indexMethod(index) {
        return index + 1;
      },
      tzblFommate(row, column) {
        return (parseFloat(row.tzbl) * 100) + '%'
      },
      resetDialog() {
        this.dialog.projectName = ''
        //this.getDialogList()
        this.dialogMultipleSelection = []
      },
      getDialogList() {
        /*this.axios({
          url: 'project/project/all/list',
          method: 'get',
          params: this.dialog
        }).then(res => {
          //console.log(res.data.obj)res.data.obj.projectId
          this.dialogTableData = res.data.obj
        })*/
      },
      handleDialogSelectionChange(val) {
        this.dialogMultipleSelection = val
        if(this.dialogMultipleSelection.length > 1 ){
          this.warningTip("提示", "只能选择一条数据")
          return
        }
        //console.log(val)dialogMultipleSelection[0].projectId
      },
      //保存
      dialogSubmit() {
        if(this.dialogMultipleSelection.length == 0 ){
          this.warningTip("提示", "请选择一条数据")
          return
        }
        if(this.dialogMultipleSelection.length > 1 ){
          this.warningTip("提示", "只能选择一条数据")
          return
        }
        let multipleSelection = [];
        for (let i = 0; i <this.multipleSelection.length ; i++) {
          let a = {};
          a["nsrsbh"]=this.multipleSelection[i]["nsrsbh"]
          a["nsrmc"]=this.multipleSelection[i]["nsrmc"]
          a["ssq"]=this.multipleSelection[i]["ssq"]
          a["qmye"]=this.multipleSelection[i]["qmyeZc"]
          a["ncye"] = this.multipleSelection[i]["ncyeZc"]
          a["lx"] = this.multipleSelection[i]["lx"]
          multipleSelection[i] = a
        }

        let ls = []
        ls.push(JSON.stringify(multipleSelection))
        ls.push(JSON.stringify(this.dialogMultipleSelection))
        let data = {
          stockRightTrans:this.multipleSelection,
          project:this.dialogMultipleSelection
        }
        /*this.axios({
          url: 'stockRight/finance/save',
          method: 'post',
          data: ls
        }).then(res => {
          //console.log(res.data.obj)res.data.obj.projectId
          this.dialogTableData = res.data.obj
          if (res.data.code == 200) {
            this.successTip('成功', res.data.msg);
            this.multipleSelection = []
            this.$refs.tableList.clearSelection();
            this.dialogMultipleSelection = []
            this.$refs.dialogTable.clearSelection();
          }else {
            this.failedTip('提示', res.data.msg, 1500)
          }
          this.dialog.visible = false
        })*/
      },
      handleDialogClose() {
        this.dialog.visible = false
      },
      statusFormatter(row, column) {
        if (row.projectStatus) {
          let status = row.projectStatus
          return status == '0' ? '正在进行' : '完结'
        } else {
          return '未知';
        }
      }
    },
    created() {
      //延迟加载
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        //this.getList();
        loading.close();
      }, 1000);
    },
    mounted() {

    }
  }
</script>

<style scoped>
</style>
