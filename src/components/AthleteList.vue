<!-- src/components/AthleteList.vue -->
<template>
  <div>
    <el-table class='AthleteList' :data="jsonData" style="width: 500px" max-height="600">
      <el-table-column class='column' prop="编号" label="编号"></el-table-column>
      <el-table-column class='column' prop="姓名" label="姓名"></el-table-column>
      <el-table-column prop="性别" label="性别"></el-table-column>
      <el-table-column prop="国籍" label="国籍"></el-table-column>
    </el-table>
    <div v-if="jsonData.length === 0">No Data</div>
  </div>
</template>

<script>
export default {
  props: ['jsonFile'],
  data() {
    return {
      jsonData: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await fetch(this.jsonFile);
      this.jsonData = await response.json();
    }
  }
};
</script>

<style scoped>
.AthleteList {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>