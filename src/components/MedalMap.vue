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
    this.bindChartEvents(); // 绑定图表事件
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.chart.resize);
    this.unbindChartEvents(); // 解绑图表事件
  },
  methods: {
    initChart() {
      const container = this.$refs.container;
      this.chart = echarts.init(container, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      this.chart.showLoading();

      const worldJsonUrl = '/worldNA.json'; // 从 public 文件夹中加载 world.zh.json
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
          this.mapOption = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>Gold: {c}'
            },
            visualMap: {
              left: 'right',
              min: 0,
              max: 500, // 根据实际数据范围设置
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
                roam: false,
                map: 'world',
                animationDurationUpdate: 1000,
                universalTransition: true,
                data: data,
                emphasis: {
                  label: {
                    show: false,
                    color: '#fff'
                  },
                  itemStyle: {
                    areaColor: 'rgba(255, 87, 87, 0.5)',
                    borderColor: '#570047', // 设置边框高亮颜色
                    borderWidth: 3          // 设置边框宽度
                  }
                }
              }
            ]
          };

          // 更新柱状图数据
          this.barOption = {
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                rotate: 30
              },
              data: data.slice(-10).map(item => item.name) // 只保留前10名的名称
            },
            animationDurationUpdate: 1000,
            series: {
              type: 'bar',
              id: 'medals',
              data: data.slice(-10).map(item => item.value), // 只保留前10名的数据
              universalTransition: true,
              barWidth: 20,
            }
          };

          this.chart.setOption(this.mapOption);
          this.startAutoSwitch(); // 开始自动切换
        });
      });
    },
    startAutoSwitch() {
      this.switchInterval = setInterval(() => {
        if (!this.chartHovered) { // 只有当图表没有获得焦点时才切换
          this.currentOption = this.currentOption === 'map' ? 'bar' : 'map';
          const option = this.currentOption === 'map' ? this.mapOption : this.barOption;
          this.chart.setOption(option, true);
        }
      }, 4000);
    },
    bindChartEvents() {
      this.chart.getZr().on('mousemove', () => {
        this.chartHovered = true; // 当鼠标在图表上移动时标记为已获得焦点
      });
      this.chart.getZr().on('mouseout', () => {
        this.chartHovered = false; // 当鼠标移出图表时标记为未获得焦点
      });
    },
    unbindChartEvents() {
      this.chart.getZr().off('mousemove');
      this.chart.getZr().off('mouseout');
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
