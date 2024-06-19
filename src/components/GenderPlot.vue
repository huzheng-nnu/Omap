<template>
    <div ref="chart" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'GenderPlot',
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
          try {
            const response = await fetch(this.jsonFile);
            if (response.ok) {
              this.jsonData = await response.json();
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
  
        // 处理数据，提取年份、男性比例和女性比例
        const years = this.jsonData.map(item => item.Year);
        const maleRatios = this.jsonData.map(item => item.Male_Ratio);
        const femaleRatios = this.jsonData.map(item => item.Female_Ratio);
  
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '1896-2016年历届奥运会性别比例',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Male Ratio', 'Female Ratio'],
            bottom: 10 // 图例位置设置在底部
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: { show: true }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: years
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            right: 140
          },
          series: [
            {
              name: 'Male Ratio',
              type: 'line',
              data: maleRatios.map((value, index) => ({ value, year: years[index] })),
              animationDuration: 10000, // 动画时长
              showSymbol: false,
              endLabel: {
                show: true,
                formatter: function () {
                  return '男性比例';
                }
              },
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              encode: {
                x: 'year',
                y: 'value',
                label: ['year', 'value'],
                itemName: 'year',
                tooltip: ['value']
              }
            },
            {
              name: 'Female Ratio',
              type: 'line',
              data: femaleRatios.map((value, index) => ({ value, year: years[index] })),
              animationDuration: 10000, // 动画时长
              showSymbol: false,
              endLabel: {
                show: true,
                formatter: function () {
                  return '女性比例';
                }
              },
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              encode: {
                x: 'year',
                y: 'value',
                label: ['year', 'value'],
                itemName: 'year',
                tooltip: ['value']
              }
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
  