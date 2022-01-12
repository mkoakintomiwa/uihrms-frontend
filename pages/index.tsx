import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../lib/components/Main'
import Head from '../lib/system/PageHead'
import { titleSuffix } from '../lib/system/settings'
import Typography from '@mui/material/Typography'
import SideColorWhiteBox from '../lib/components/SideColorWhiteBox'
import AppIcon from '../lib/components/AppIcon'
import Grid from '@mui/material/Grid'
import Flex from '../lib/components/Flex'
import { BorderLinearProgress } from '../lib/components/BorderLinearProgress'
import { linearProgressClasses } from '@mui/material'
import { sbAdminThemeColors } from '../lib/themes/sb-admin/colors'
import ChartBox from '../lib/components/ChartBox'
import { createRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Chart from "../lib/extensions/Chart"
import ColoredBullet from '../lib/components/ColoredBullet'
import Center from '../lib/components/Center'



const Home: NextPage = () => {
	
	const [chartContexts, setChartContexts] = useState({} as Record<string,any>);

	useEffect(function(){

		let charts = {} as Record<string,any>;

		if (chartContexts.lineChart){
			
			charts.lineChart = new Chart(chartContexts.lineChart, {
				type: 'line',
				data: {
					labels: ["Jn", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					datasets: [{
						label: "Earnings",
						tension: 0.3,
						backgroundColor: "rgba(78, 115, 223, 0.05)",
						borderColor: "rgba(78, 115, 223, 1)",
						pointRadius: 3,
						pointBackgroundColor: "rgba(78, 115, 223, 1)",
						fill: true,
						pointBorderColor: "rgba(78, 115, 223, 1)",
						pointHoverRadius: 3,
						pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
						pointHoverBorderColor: "rgba(78, 115, 223, 1)",
						pointHitRadius: 10,
						pointBorderWidth: 2,
						data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
					}],
				},
				options: {
					maintainAspectRatio: false,
					layout: {
						padding: {
							left: 10,
							right: 25,
							top: 25,
							bottom: 0
						}
					},
					scales: {
						x: {
							//time: 'date',
							grid: {
								display: false,
								drawBorder: false
							},
							ticks: {
								maxTicksLimit: 7
							}
						},
						y: {
								ticks: {
								maxTicksLimit: 5,
								padding: 10,
								// Include a dollar sign in the ticks
								callback: function(value, index, values) {
									return '$' + number_format(value);
								}
							},
							grid: {
								color: "rgb(234, 236, 244)",
								//zeroLineColor: "rgb(234, 236, 244)",
								drawBorder: false,
								borderDash: [2],
								//zeroLineBorderDash: [2]
							}
						},
					},
					plugins:{
						legend: {
							display: false
						},
						tooltip: {
							backgroundColor: "rgb(255,255,255)",
							titleMarginBottom: 10,
							borderColor: '#dddfeb',
							borderWidth: 1,
							displayColors: false,
							intersect: false,
							mode: 'index',
							caretPadding: 10
						}
					}
				}
			});

			// return ()=>{
			// 	lineChart.destroy();
			// }
		}



		if (chartContexts.pieChart){
			charts.pieChart = new Chart(chartContexts.pieChart, {
				type: 'doughnut',
				data: {
				  labels: ["Direct", "Referral", "Social"],
				  datasets: [{
					data: [55, 30, 15],
					backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
					hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
					hoverBorderColor: "rgba(234, 236, 244, 1)"
				  }],
				},
				options: {
				  maintainAspectRatio: false,
				  plugins:{
					tooltip: {
						backgroundColor: "rgb(255,255,255)",
						borderColor: '#dddfeb',
						borderWidth: 1,
						displayColors: false,
						caretPadding: 10,
					  },
					  legend: {
						display: false
					  }
				  	},
					cutout: 125
				}
			});
			
		}


		return ()=>{
			for (const [chartId,chart] of Object.entries(charts)){
				if (chartContexts[chartId]){
					chart.destroy();
				}
			}
		}

	},[chartContexts]);


	return (
		<>
			<Head>
				<title>Dashboard | { titleSuffix }</title>
			</Head>

			<Main>
				<div id="main-content" style={{ width: "100%" }}>
					<Typography variant="h5" sx={{ fontSize: "25px", marginBottom: "20px" }}>Dashboard</Typography>

					<Grid container spacing={4}>
						<Grid item lg={3} md={6} flexGrow={1}>
							<SideColorWhiteBox color="primary" title="EARNINGS (MONTHLY)"  icon={{ type: "fas", class: "calendar" }}>
								$40,000
							</SideColorWhiteBox>
						</Grid>

						<Grid item lg={3} md={6} flexGrow={1}>
							<SideColorWhiteBox color="success" title="EARNINGS (ANNUAL)"  icon={{ type: "fas", class: "dollar-sign" }}>
								$215,000
							</SideColorWhiteBox>
						</Grid>

						<Grid item lg={3} md={6} flexGrow={1}>
							<SideColorWhiteBox color="info" title="TASKS" icon={{ type: "fas", class: "clipboard-list" }}>
								<Flex style={{ alignItems: "center" }}>
									<div>50%</div>
									<div style={{ marginLeft: "10px", width: "100%", paddingRight: "20px" }}>
										<BorderLinearProgress variant="determinate" value={50} sx={{ [`& .${linearProgressClasses.bar}`]:{
											backgroundColor: `${sbAdminThemeColors.info}`
										} }} />
									</div>
								</Flex>
							</SideColorWhiteBox>
						</Grid>

						<Grid item lg={3} md={6} flexGrow={1}>
							<SideColorWhiteBox color="warning" title="PENDING REQUESTS"  icon={{ type: "fas", class: "comments" }}>
								19
							</SideColorWhiteBox>
						</Grid>

					</Grid>


					<Grid container spacing={4} sx={{ marginTop: "20px" }}>
						<Grid item lg={8}>
							<ChartBox title='Earnings Overview' chart={
								<canvas ref={ useCallback(function(ctx){
									setChartContexts(prev=>({ ...prev, lineChart: ctx }))
								},[]) } style={{ width: "100%", height: "300px", padding: "15px", paddingBottom: "25px" }}></canvas>
							} />
						</Grid>


						<Grid item lg={4}>
							<ChartBox title='Revenue Sources' chart={
								<canvas ref={ useCallback(function(ctx){
									setChartContexts(prev=>({ ...prev, pieChart: ctx }))
								},[]) } height={200}></canvas>
							} labelBelow={
								<Center>
									<div style={{ fontSize: "13px", color: "gray", marginBottom: "30px", marginTop: "50px" }}>
										
										<ColoredBullet style={{ marginRight: "10px" }} color='primary' label='Direct' />

										<ColoredBullet style={{ marginRight: "10px" }} color='success' label='Social' />

										<ColoredBullet color='info' label='Referral' />
									</div>
								</Center>
							} />
						</Grid>
					</Grid>

				</div>
			</Main>
		</>
	)
}


function number_format(number: any, decimals?: any, dec_point?: any, thousands_sep?: any) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s: any = '',
    toFixedFix = function(n: any, prec: any) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


export default Home
