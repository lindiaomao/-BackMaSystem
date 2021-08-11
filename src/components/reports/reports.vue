<template>
  <div class="reports">
	  <el-card>
		  <div ref="chart" id="myChart" style="width:100%;height:376px"></div>
	  </el-card>
  </div>
</template>

<script>
import {reqReports} from '../../network/api'
export default {
	data () {
    return {
      msg: 'Welcome to Your Vue.js App',
	  option:{},
	  legend:[],
    }
  },
  mounted(){
	  this.getReportsList()
  },
  methods: {
	//   获取数据
	async getReportsList(){
		const repVal = await reqReports()
		console.log(repVal);
		this.option = repVal.data


		this.drawLine()
	},
	//   echart图
    drawLine(){
		var echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例
        var chartDom = document.getElementById('myChart');
		var myChart = echarts.init(chartDom);
		var option;

		option =this.option

		option && myChart.setOption(option);
    }
  }
}
</script>

<style>

</style>