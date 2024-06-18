<template>
    <div ref="chart" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'EventPlot',
    props: {
      jsonFile: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        eventsData: []
      };
    },
    mounted() {
      this.loadData();
    },
    watch: {
      jsonFile: {
        handler() {
          this.loadData();
        },
        immediate: true
      }
    },
    methods: {
      async loadData() {
        if (this.jsonFile) {
          try {
            const response = await fetch(this.jsonFile);
            if (response.ok) {
              this.eventsData = await response.json();
              this.initChart();
            } else {
              console.error('Failed to load JSON data');
            }
          } catch (error) {
            console.error('Error loading JSON data:', error);
          }
        }
      },
      initChart() {
        const chart = echarts.init(this.$refs.chart);
  
        // 处理数据，提取年份、夏季和冬季比赛项目数量
        const years = [...new Set(this.eventsData.map(item => item.Year))]; // 获取所有年份
        const summerEvents = [];
        const winterEvents = [];
  
        years.forEach(year => {
          const summerEvent = this.eventsData.find(item => item.Year === year && item.Season === 'Summer');
          const winterEvent = this.eventsData.find(item => item.Year === year && item.Season === 'Winter');
          summerEvents.push(summerEvent ? summerEvent.Events : 0);
          winterEvents.push(winterEvent ? winterEvent.Events : 0);
        });
  
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '1896-2016年历届奥运会比赛项目数',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Summer Events', 'Winter Events'],
            top: 30
          },
          xAxis: {
            type: 'category',
            data: years,
            axisLabel: {
              interval: 0,
              rotate: -45
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Summer Events',
              type: 'bar',
              data: summerEvents
            },
            {
              name: 'Winter Events',
              type: 'bar',
              data: winterEvents
            }
          ],
          // 添加滑块组件
          dataZoom: [
            {
              type: 'slider',
              start: 0,
              end: 50,
              showDataShadow: false,
              bottom: 10,
              handleSize: '100%'
            }
          ]
        };
  
        // 使用刚指定的配置项和数据显示图表
        chart.setOption(option);
      }
    }
  };
  </script>
  
  <style scoped>
  /* 你可以在这里添加一些样式 */
  </style>
  