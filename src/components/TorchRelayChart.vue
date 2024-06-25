<template>
  <div>
    <el-table
      v-if="jsonData.length"
      class="TorchRelayChart"
      :data="jsonData"
      stripe
      max-height="600"
    >
      <el-table-column prop="stage" label="编号"></el-table-column>
      <el-table-column prop="stage_name" label="阶段"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="via" label="具体传递城市"></el-table-column>
    </el-table>
    <div v-if="!jsonData.length">No Data</div>
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
    jsonFile: {
      immediate: true,
      handler(newVal) {
        this.loadData(newVal);
      }
    }
  },
  methods: {
    async loadData() {
  if (!this.jsonFile) return;
  try {
    const response = await fetch(this.jsonFile);
    const geojsonData = await response.json();
    const featuresProperties = geojsonData.features.map(feature => ({
      stage: feature.properties.stage,
      stage_name: feature.properties.stage_name,
      time: feature.properties.time,
      via: feature.properties.via
    }));

    // 按stage属性升序排序
    featuresProperties.sort((a, b) => a.stage - b.stage);

    this.jsonData = featuresProperties;
  } catch (error) {
    console.error('Error fetching or parsing JSON file:', error);
    this.jsonData = []; // 确保在加载失败时jsonData是空数组
  }
}
  }
};
</script>

<style scoped>
.TorchRelayChart {
  margin: auto;
  width: 80%; /* 根据需要调整表格宽度 */
  max-height: 600px;
  overflow: auto; /* 如果内容超出，允许滚动 */
}


</style>