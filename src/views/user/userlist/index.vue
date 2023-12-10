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
            >添加用户<i class="el-icon-upload el-icon--right"></i
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
      border="true"
      right-fixed
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
      <el-table-column
        header-align="center"
        align="center"
        label="ID"
        width="100"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="头像"
        width="100"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.memo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="角色"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.role ? "管理员" : "普通用户"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.status ? "正常" : "禁用"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新日期"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.updateTime | formatDate
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center"
        width="300"
      >
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          > -->
          <!-- 账户状态： -->
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.status"
            @click="updateStatus(scope.row)"
            >禁用</el-button
          >
          <el-button
            size="mini"
            type="success"
            v-else
            @click="updateStatus(scope.row)"
            >启用</el-button
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
    <!-- 弹出添加或者修改 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form
        :model="user"
        :label-position="labelPosition"
        label-width="80px"
        :rules="rules"
        ref="user"
      >
        <el-form-item label="用户名" prop="nickName">
          <el-input v-model="user.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓" prop="firstName">
          <el-input v-model="user.firstName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名" prop="lastName">
          <el-input v-model="user.lastName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input autocomplete="off" v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input autocomplete="off" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select placeholder="请选择性别" v-model="user.sex">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="sex">
          <el-select placeholder="请选择用户角色" v-model="user.role">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="工作人员" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from "@/api/table";
import { deleteById } from "@/api/user";
import { addUser } from "@/api/user";
import { updateStatus } from "@/api/user";
import { Form } from 'element-ui';
export default {
  data() {
    return {
      upStatus: 1,
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      labelPosition: "right",
      title: "",
      imageUrl: "",
      page: {
        current: 1, // 当前页码
        total: 10, // 总条数
        pageSize: 10, // 每页的数据条数
      },
      //注册对象
      user: {
        avatar: "",
        nickName: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        sex: "",
        role: "",
      },
      rules: {
        nickName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        firstName: [
          { required: true, message: "请输入姓", trigger: "blur" },
          {
            min: 1,
            max: 3,
            message: "长度在 1 到 3 个字符",
            trigger: "change",
          },
        ],
        lastName: [
          { required: true, message: "请输入名", trigger: "blur" },
          {
            min: 1,
            max: 5,
            message: "长度在 1 到 5 个字符",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式错误",
            trigger: "change",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  // 拦截器
  filters: {
    // 状态过滤器
    statusFilter(status) {
      const statusMap = {
        0: "danger",
        1: "normal",
      };
      return statusMap[status];
    },
    // 角色过滤器
    roleFilter(role) {
      const roleMap = {
        0: "normal",
        1: "admin",
      };
      return roleMap[role];
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
  created() {
    this.fetchData();
  },
  methods: {
    addOrUpdate() {
      console.log("addOrUpdate");
      // 表单验证
      this.$refs["user"].validate((valid) => {
        if (valid) {
          console.log("valid", valid);
          //发送请求
          addUser(this.user).then((response) => {
            console.log("add", response);

            if (response.code == 0) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.fetchData();
            } else {
              this.$message({
                type: "error",
                message: "添加失败!",
              });
            }
          });
          this.dialogFormVisible = false;
          // 清空表单
          this.user = {};
        } else {
          console.log("表单错误!!");
          return false;
        }
      });
    },
    // 添加用户
    userAdd() {
      this.title = "添加用户";
      this.dialogFormVisible = true;
    },
    // 账户启用禁用
    updateStatus(row) {
      console.log("status是" + row.status);
      this.$confirm(
        "您确定修改id为" + row.id + "用户状态吗？是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        if (row.status) {
          this.upStatus = 0;
        } else {
          this.upStatus = 1;
        }
        console.log("row", row.status);
        console.log("upStatus", this.upStatus);
        updateStatus(this.upStatus, row.id).then((response) => {
          console.log("updateRole", response.code);
          if (response.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.fetchData();
          } else {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          }
        });
      });
    },
    // 编辑用户
    handleEdit(index, row) {
      console.log(index, row);
      this.title = "编辑用户";
      this.dialogFormVisible = true;
      this.user.nickName = row.nickName;
      this.user.email = row.email;
      this.user.firstName = row.firstName;
      this.user.lastName = row.lastName;
      this.user.phone = row.phone;
      this.user.sex = row.sex;
      this.user.role = row.role;
    },
    // 删除用户
    handleDelete(index, row) {
      console.log(index, row.id);
      this.$confirm("您确定删除id为" + row.id + "用户吗？是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteById(row.id).then((response) => {
            console.log("delete", response);
            this.fetchData();
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(index, row);
    },
    //查询列表
    fetchData() {
      this.listLoading = true;
      getUserList(this.page).then((response) => {
        console.log("list1", response);
        this.list = response.data.list;
        this.page.total = Number(response.data.total);
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
<style>
.avatar-uploader .el-upload {

  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>