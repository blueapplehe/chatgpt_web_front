<template>
  <div class="container">
    <el-form :model="form" label-width="80px">
      <el-form-item label="问题">
        <el-input v-model="form.question" style="width: 800px;"></el-input>
      </el-form-item>
      <el-form-item label="多样性(0.0到2.0)">
        <el-input v-model="form.temperature"></el-input>
      </el-form-item>
      <el-form-item label="chatgpt">
        <el-input v-model="form.answer" type="textarea" :rows="18"></el-input>
      </el-form-item>
      <el-form-item label="图片" v-if="form.img_url">
        <img :src="form.img_url" alt="无法显示" style="width:800px"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="success" @click="onReSubmit">重答</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import axios from "axios"
const form = reactive({
  question: "",
  answer: "",
  temperature:0.0,
  img_url:"",
})
// 提交
const onSubmit = () => {

  let formData = {}
  formData["question"] = form.question
  formData["temperature"] = form.temperature
  ElMessage.success("正在查询中,请耐心等待")
  axios({
    method: "post",
    url: "/api/gptapi/",
    data: formData,
  })
    .then(function (response) {

      var data = response.data
      console.log(data)
      if (data.error_code === 0) {
        ElMessage.success("成功")
        form.answer=data["data"]
        form.img_url=data["img_url"]
      } else {
        console.log(data["message"])
        ElMessage.error(data["message"])
      }
    })
    .catch(function (error) {
      console.log(error)
      ElMessage.error("失败")
    })
}
const onReSubmit=()=>{
  let formData = {}
  formData["question"] = form.question
  formData["temperature"] = 1.0
  ElMessage.success("正在查询中,请耐心等待")
  axios({
    method: "post",
    url: "/api/gptapi/",
    data: formData,
  })
    .then(function (response) {

      var data = response.data
      console.log(data)
      if (data.error_code === 0) {
        ElMessage.success("成功")
        form.answer=data["data"]
        form.img_url=data["img_url"]
      } else {
        console.log(data["message"])
        ElMessage.error(data["message"])
      }
    })
    .catch(function (error) {
      console.log(error)
      ElMessage.error("失败")
    })
}
</script>