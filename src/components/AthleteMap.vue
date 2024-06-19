<template>
  <div class="echart" id="chart1" ref="chart1" :style="{ width: '100%', backgroundColor: '#fff' }"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'AthleteMap',
  props: ['maleJsonFile', 'femaleJsonFile'],
  data() {
    return {
      option: {
        title: {
          text: '' // 标题
        },
        visualMap: {
          min: 0,
          max: 50, // This will be updated dynamically
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'orangered']
          },
          left: 'right',  // visualMap 图例的位置
          top: 'center',  // visualMap 图例的位置
          orient: 'vertical' // 图例方向：'horizontal' 或 'vertical'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} 人'
        },
        series: [
          {
            name: 'world.zh',
            type: 'map',
            map: 'world.zh',
            label: {
              show: false
            },
            data: [],
            emphasis: {
              label: {
                show: false,
                color: '#fff'
              },
              itemStyle: {
                areaColor: 'rgba(255, 87, 87, 0.5)',
                borderColor: '#570047', // 设置边框高亮颜色
                borderWidth: 3          // 设置边框宽度
              },
              // zoom: 1.4,  // 初始缩放级别
              // roam: false  // 允许缩放和平移
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.loadMapData();
    this.loadAthleteData();
  },
  watch: {
    maleJsonFile: 'loadAthleteData',
    femaleJsonFile: 'loadAthleteData'
  },
  methods: {
    loadMapData() {
      fetch('/worldNA.json')
        .then(response => response.json())
        .then(data => {
          echarts.registerMap('world.zh', data);
          this.initChart();
        })
        .catch(error => {
          console.error('加载地图数据时出错:', error);
        });
    },
    loadAthleteData() {
      if (!this.maleJsonFile) {
        return;
      }

      const fetchMaleData = fetch(this.maleJsonFile).then(res => res.json());
      const fetchFemaleData = this.femaleJsonFile ? fetch(this.femaleJsonFile).then(res => res.json()) : Promise.resolve([]);

      Promise.all([fetchMaleData, fetchFemaleData])
        .then(([maleData, femaleData]) => {
          const countryCounts = this.countAthletesByCountry(maleData, femaleData);
          const maxCount = Math.max(...Object.values(countryCounts));
          this.option.visualMap.max = maxCount; // Update visualMap max dynamically
          this.option.series[0].data = Object.entries(countryCounts).map(([name, value]) => ({ name, value }));
          this.initChart();
        })
        .catch(error => {
          console.error('加载运动员数据时出错:', error);
        });
    },
    countAthletesByCountry(maleData, femaleData) {
      const countryCounts = {};

      [maleData, femaleData].forEach(dataArray => {
        dataArray.forEach(athlete => {
          if (athlete.国籍) {
            countryCounts[athlete.国籍] = (countryCounts[athlete.国籍] || 0) + 1;
          }
        });
      });

      return countryCounts;
    },
    initChart() {
      const chartDom = this.$refs.chart1;
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        myChart.setOption(this.option);
      }
    }
  }
};
</script>

<style scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
