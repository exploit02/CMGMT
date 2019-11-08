import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs/canvasjs.react' 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class cdemo extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 
		}
	}
	
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Candidate Count By Status"
			},
			axisX: {
				title: "Status",
				reversed: true,
			},
			axisY: {
				title: "Candidate Count",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  345, label: "Stream identified" },
					{ y:  1800, label: "Training Complete" },
					{ y:  800, label: "Job offer received" },
					{ y:  56, label: "Resume made" },
					{ y:  376, label: "Resume accepted" },
					{ y:  3360, label: "Interested in exploring" },
					{ y:  330, label: "Reddit" }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}

export default cdemo
