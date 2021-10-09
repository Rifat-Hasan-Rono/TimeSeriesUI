import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  search = {
    buildingId: 0,
    objectId: 0,
    dataFieldId: 0
  };
  constructor(private dataService: DataService) { }
  public buildings=[];
  public objects = [];
  public dataFields = [];
  public chartData = [];
  title = 'app';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  ngOnInit() {
    this.dataService.getParamList().subscribe((data: any[]) => {
      this.buildings.push({ id: 0, label: 'Select Any' })
      for (var i = 0; i < data[0].length; i++) {
        this.buildings.push({ id: data[0][i]['Id'], label: data[0][i]['Name'] })
      }
      this.objects.push({ id: 0, label: 'Select Any' })
      for (var i = 0; i < data[1].length; i++) {
        this.objects.push({ id: data[1][i]['Id'], label: data[1][i]['Name'] })
      }
      this.dataFields.push({ id: 0, label: 'Select Any' })
      for (var i = 0; i < data[2].length; i++) {
        this.dataFields.push({ id: data[2][i]['Id'], label: data[2][i]['Name'] })
      }
    })

    this.dataService.getReadingList(0, 0, 0, '10/22/2022 2:10:00 PM', '10/22/2022 2:15:00 PM').subscribe((data: any[]) => {
      this.chartOptions ={
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Timeseries Data'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Value'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: 'Value',
          data: data
        }]
      };
    })
  }

  onInitChart() {
    this.dataService.getReadingList(this.search.buildingId, this.search.objectId, this.search.dataFieldId, '2022-10-22 14:10:00.000', '2022-10-23 04:10:00.000').subscribe((data: any[]) => {
      this.chartOptions = {
        series: [{
          type: 'area',
          name: 'Value',
          data: data
        }]
      };
    });
  }

  
}
