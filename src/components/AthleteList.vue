<!-- src/components/AthleteList.vue -->
<template>
  <div>
    <el-table class='AthleteList' :data="jsonData" stripe  max-height="600" v-if="jsonData.length">
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
  watch: {
    jsonFile() {
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      if (this.jsonFile) {
        const response = await fetch(this.jsonFile);
        this.jsonData = await response.json();
      }
    }
  }
};
</script>

<style scoped>
.AthleteList {

  display: flex;
  justify-content: center;
  align-items: center;

}


</style>