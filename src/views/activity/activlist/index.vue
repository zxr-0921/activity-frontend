<template>
  <div>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入名字"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="userAdd"
            >添加活动<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      @sort-change="handleSortChange"
      element-loading-text="拼命加载中..."
      height="800"
    >
      <el-table-column
        fixed="left"
        header-align="center"
        align="center"
        label="序号"
        width="100"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activId }}</span>
        </template>
      </el-table-column>
      <el-row>
        <el-col :span="12">
          <div class="sub-title">circle</div>
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="block" v-for="size in sizeList" :key="size">
              <el-avatar :size="size" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-table-column label="活动名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动地址" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activAddr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大人数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.maxNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动开始时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.startTime | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动结束时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.endTime | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.updateTime | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布状态" width="180">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.activStatus }}</span> -->
          <!-- 发布按钮 -->
          <el-switch
            v-model="scope.row.activStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            active-text="发布"
            inactive-text="未发布"
            @change="handleStatuschange($event, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleAddSession(scope.$index, scope.row)"
            >添加场次</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页标签 -->
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="acitvEvent"
      >
        <el-form-item label="活动时间">
          <div class="block">
            <el-date-picker
              v-model="data"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="dateFormat"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      
        <el-form-item label="最大人数">
          <el-input v-model="activEvent.maxNum"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSession">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
import { getActiveList } from "@/api/table";
import { changepulStatus, addSession } from "@/api/activity";
export default {
  data() {
    return {
      labelPosition: "right",
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      page: {
        current: 1, // 当前页码
        total: 10, // 总条数
        pageSize: 10, // 每页的数据条数
      },
      // 场次
      activEvent: {
        activId: "",
        checkStartTime: "",
        checkEndTime: "",
        startTime: "",
        endTime: "",
        maxNum: "",
      },
      data: [],
    };
  },
  created() {
    this.fetchData();
  },
  filters: {
    // 状态过滤器
    statusFilter(status) {
      const statusMap = {
        0: "danger",
        1: "normal",
      };
      return statusMap[status];
    },
    //时间格式化过滤器
    formatDate(val) {
      if (val == null || val == "") {
        return "";
      } else {
        let d = new Date(val); // val 为表格内取到的后台时间
        let month =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        let times =
          d.getFullYear() +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          min +
          ":" +
          sec;
        return times;
      }
    },
  },
  methods: {
    handleAddSession(index, row) {
      this.title = "添加场次";
      this.dialogFormVisible = true;
      this.activEvent.activId = row.activId;
      console.log("添加场次", row.activId);
    },
    addSession() {
      console.log("添加场次", this.activEvent);
      addSession(this.activEvent).then((response) => {
        if (response.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.activEvent= {};
          this.data = [];
        } else {
          this.$message({
            message: "添加失败",
            type: "error",
          });
        }
        console.log("返回的数据", response);
        this.dialogFormVisible = false;
      });
    },
    //时间分开
    dateFormat(picker) {
      console.log(picker);
      this.activEvent.startTime = picker[0].toString();
      this.activEvent.endTime = picker[1].toString();
      console.log(this.activEvent.startTime, this.activEvent.endTime);
    },
    //修改发布状态
    async handleStatuschange(data, row) {
      console.log(data, row.activId);
      await changepulStatus(row.activId).then((response) => {
        console.log("返回的数据", response);
        // this.fetchData();
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //获取数据
    fetchData() {
      this.listLoading = true;
      getActiveList(this.page).then((response) => {
        console.log("list1", response);
        this.list = response.data.list;
        this.page.total = Number(response.data.total);
        console.log("list2", this.page.total);
        this.listLoading = false;
      });
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // this.page.currentPage = 1;
      this.page.pageSize = val;
      this.fetchData();
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.current = val;
      this.fetchData();
    },
  },
};
</script>
  