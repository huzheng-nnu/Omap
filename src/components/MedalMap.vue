<template>
    <div id="container" ref="container" style="height: 100%"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import $ from 'jquery';
  
  export default {
  name: 'MedalMap',
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.chart.resize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.chart.resize);
  },
  methods: {
    initChart() {
      const container = this.$refs.container;
      this.chart = echarts.init(container, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      this.chart.showLoading();
  
      const worldJsonUrl = '/world.zh.json'; // 从 public 文件夹中加载 world.zh.json
      $.get(worldJsonUrl, (worldJson) => {
        this.chart.hideLoading();
        echarts.registerMap('world', worldJson, {});
  
        const medalsJsonUrl = '/Archive/medals.json';
        $.get(medalsJsonUrl, (medalsJson) => {
          const data = medalsJson.map(item => ({
            name: item.name,
            value: item.Gold, // 这里以 Gold 数据作为示例进行可视化
          }));
  
          // 根据 value 对 data 进行降序排序
          data.sort((a, b) => a.value - b.value);
  
          // 更新地图数据
          const mapOption = {
            visualMap: {
              left: 'right',
              min: 0,
              max: 400, // 根据实际数据范围设置
              inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
                        '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
              },
              text: ['High', 'Low'],
              calculable: true
            },
            series: [
              {
                id: 'medals',
                type: 'map',
                roam: true,
                map: 'world',
                animationDurationUpdate: 1000,
                universalTransition: true,
                data: data
              }
            ]
          };
  
          // 更新柱状图数据
          const barOption = {
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                rotate: 30
              },
              data: data.slice(-10).map(item => item.name) // 只保留前15名的名称
            },
            animationDurationUpdate: 1000,
            series: {
              type: 'bar',
              id: 'medals',
              data: data.slice(-10).map(item => item.value), // 只保留前15名的数据
              universalTransition: true,
              barWidth: 20,
  
            }
          };
  
          let currentOption = mapOption;
          this.chart.setOption(mapOption);
          setInterval(() => {
            currentOption = currentOption === mapOption ? barOption : mapOption;
            this.chart.setOption(currentOption, true);
          }, 4000);
        });
      });
    }
  }
  };
  
  </script>
  
  <style>
  #container {
    height: 100%;
    width: 100%;
  }
  </style>
  