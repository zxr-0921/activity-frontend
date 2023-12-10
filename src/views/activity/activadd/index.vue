<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.activName"></el-input>
    </el-form-item>
    <el-form-item label="活动地址">
      <el-input v-model="form.activAddr"></el-input>
    </el-form-item>
    <el-form-item label="活动时间">
      <!-- <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="选择时间"
          v-model="form.date2"
          style="width: 100%"
        ></el-time-picker>
      </el-col> -->
      <el-date-picker
        v-model="data"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="dateFormat"
        align="right"
      >
      </el-date-picker>
    </el-form-item>
    <!-- 上传图片 -->
    <el-form-item label="上传图片">
      <el-upload
        action="/api/file/aliyun/upload"
        list-type="picture-card"
        name="file"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- 预览弹框区域 -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" /> </el-dialog
    ></el-form-item>

    <!-- 活动详情 -->
    <el-form-item label="活动详情">
      <el-input type="textarea" v-model="form.activDetails"></el-input>
    </el-form-item>
    <!-- 活动流程 -->
    <el-form-item label="活动流程">
      <el-input type="textarea" v-model="form.activProcess"></el-input>
    </el-form-item>
    <!-- 活动类型 -->
    <el-form-item label="活动性质">
      <template> <el-select v-model="form.activityTypeId" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select></template>
     
    </el-form-item>

    <!-- 活动费用 -->
    <el-form-item label="活动费用">
      <el-input v-model="form.activFee"></el-input>
    </el-form-item>
    <!-- 最大人数 -->
    <el-form-item label="最大人数">
      <el-input v-model="form.maxNum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
  <script>
  import { activityAdd } from "@/api/activity";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      allImgUrl: [], // 所有图片上传成功返回的地址集合
      data: [],
      form: {
        activAddr: "",
        activDetails: "",
        activFee: 0,
        activName: "",
        activProcess: "",
        activPvUrl: "",
        activityTypeId:'',
        endTime: "",
        isDeleted: 0,
        maxNum: 0,
        startTime: "",
        updateTime: "",
      },
      // 活动性质
      options: [
        {
          value: "1",
          label: "商务性活动",
        },
        {
          value: "2",
          label: "商业性活动",
        },
        {
          value: "3",
          label: "公益性活动",
        },
        {
          value: "4",
          label: "群众性活动",
        },
        {
          value: "5",
          label: "综合性活动",
        },
        {
          value: "6",
          label: "专业性活动",
        },
        {
          value: "7",
          label: "其他",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    handleSuccess(res) {
      const { code, data } = res;
      if (code == "0" && data) {
        this.allImgUrl.push(data);
      }
      this.dialogImageUrl = data;
      console.log(this.allImgUrl);
      console.log(this.dialogImageUrl);
    },
    //删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }, 
    dateFormat(picker) {
      console.log(picker);
      this.form.startTime = picker[0].toString();
      this.form.endTime = picker[1].toString();
      console.log(this.form.startTime, this.form.endTime);
    },
    onSubmit() {
      console.log("submit!");
      this.form.activPvUrl = this.allImgUrl.join(",");
      console.log(this.form);
      activityAdd(this.form).then((res) => {
        console.log(res);
        if (res.code == "0") {
          this.$message({
            message: "创建成功",
            type: "success",
          });
          this.$router.push("/activity/activitylist");
        } else {
          this.$message({
            message: "创建失败",
            type: "error",
          });
        }
      });
    },
  },
};
</script>