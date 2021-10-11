import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import * as Highcharts from 'highcharts';
import moment from 'moment';
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
  selected: any = { startDate: null, endDate: null };
  constructor(private dataService: DataService) {
    this.selected.startDate = moment('10/22/2022 2:10:00 PM', 'MM-DD-YYYY HH:mm A');
    this.selected.endDate = moment('10/22/2022 2:20:00 PM', 'MM-DD-YYYY HH:mm A');;
  }
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

    var startDateTime = this.selected.startDate.format('MM/DD/YYYY HH:mm:ss A');
    var endDateTime = this.selected.endDate.format('MM/DD/YYYY HH:mm:ss A');
    this.dataService.getReadingList(0, 0, 0, startDateTime, endDateTime).subscribe((data: any[]) => {
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
          type: 'datetime',
          labels: {
            enabled: false
          }
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
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba').toString()]
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
    var startDateTime = this.selected.startDate.format('MM/DD/YYYY HH:mm:ss A');
    var endDateTime = this.selected.endDate.format('MM/DD/YYYY HH:mm:ss A');
    this.dataService.getReadingList(this.search.buildingId, this.search.objectId, this.search.dataFieldId, startDateTime, endDateTime).subscribe((data: any[]) => {
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
