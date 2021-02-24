import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexResponsive,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis,
  ApexLegend,
  ApexStates,
  ApexTheme,
  ApexTitleSubtitle

} from "ng-apexcharts";
import { Excuse } from "../Data_Types/excuse";
import {LeaveRequest} from '../Data_Types/leave-request'
import { NeedRequest } from "../Data_Types/NeedRequest";
import { EmployeeService } from "../Services/employee.service";
import { ExcuseService } from "../Services/excuse.service";
import { LeaveService } from "../Services/leave.service";
import { NeedRequestService } from "../Services/need-request.service";
import { ProfessionService } from "../Services/profession.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  series2: ApexNonAxisChartSeries;
  chart2: ApexChart;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  states: ApexStates;

};
export type chartoptionsEmployee2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
}
export type chartOptionsExcusesesNumber = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  series2: ApexNonAxisChartSeries;
  chart2: ApexChart;

};
export type chartOptionsLeavesNumber = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  series2: ApexNonAxisChartSeries;
  chart2: ApexChart;

};
export type chartOptionsNeedsRequetsNumber = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  series2: ApexNonAxisChartSeries;
  chart2: ApexChart;

};
export type chartOptionsEmployees = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartOptionsExcusesTypes = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
export type ChartOptionsLeavesTypes = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
export type ChartOptionsNeedsRequetsTypes = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public ChartOptionsExcusesTypes: Partial<ChartOptions>
  public chartOptionsExcusesesNumber: Partial<ChartOptions>;
  public ChartOptionsManagerExcusesTypes: Partial<ChartOptions>
  public chartOptionsManagerExcusesesNumber: Partial<ChartOptions>;

  public ChartOptionsLeavesTypes: Partial<ChartOptions>
  public chartOptionsLeavesNumber: Partial<ChartOptions>;
  public ChartOptionsManagerLeavesTypes: Partial<ChartOptions>
  public chartOptionsManagerLeavesNumber: Partial<ChartOptions>;

  public ChartOptionsNeedsRequetsTypes: Partial<ChartOptions>
  public chartOptionsNeedsRequetsNumber: Partial<ChartOptions>;
  public ChartOptionsManagerNeedsRequetsTypes: Partial<ChartOptions>
  public chartOptionsManagerNeedsRequetsNumber: Partial<ChartOptions>;

  public chartOptionsEmployees: Partial<ChartOptions>;
  public chartoptionsEmployee2: Partial<ChartOptions>;
  employeesLenght: any;
  professionlst: any;
  professionNames: any;
  employeesLenght2: any;
  professionlst2: any;
  professionNames2: any;
  employeelst: any;
  empLength: number
  employeeNumber: any;

  Strdate: string
  Excusedate: Date;
  LabelDate: string;

  ExcusesesNumber: any;
  PendingExcusesesNumber: any;
  ApprovedExcusesesNumber: any;
  DisApprovedExcusesesNumber: any;
  lstOfPendingExcuse: Excuse[]
  lstOfApprovedExcuse: Excuse[]
  lstOfDisApprovedExcuse: Excuse[]
  ManagerExcusesesNumber: any;
  ManagerPendingExcusesesNumber: any;
  ManagerApprovedExcusesesNumber: any;
  ManagerDisApprovedExcusesesNumber: any;
  ManagerlstOfPendingExcuse: Excuse[]
  ManagerlstOfApprovedExcuse: Excuse[]
  ManagerlstOfDisApprovedExcuse: Excuse[]
  
  
  LeavesNumber: any[];
  NeedsRequetsNumber: any[];
  PendingLeavesNumber: any;
  ApprovedLeavesNumber: any;
  DisApprovedLeavesNumber: any;
  lstPendingLeaves: LeaveRequest [];
  lstApprovedLeaves: LeaveRequest [];
  lstDisApprovedLeaves: LeaveRequest [];

  ManagerLeavesNumber: any[];
  ManagerPendingLeavesNumber: any;
  ManagerApprovedLeavesNumber: any;
  ManagerDisApprovedLeavesNumber: any;
  ManagerlstPendingLeaves: LeaveRequest [];
  ManagerlstApprovedLeaves: LeaveRequest [];
  ManagerlstDisApprovedLeaves: LeaveRequest [];

  PendingNeedRequestNumber: any;
  DisApprovedNeedsRequetsNumber: any;
  ApprovedNeedsRequetsNumber: any;
  lstPendingNeedRequest: NeedRequest[];
  lstDisApprovedNeedsRequets:  NeedRequest[];
  lstApprovedNeedsRequets:  NeedRequest[];

  ManagerNeedsRequetsNumber: any[];
  ManagerPendingNeedRequestNumber: any;
  ManagerDisApprovedNeedsRequetsNumber: any;
  ManagerApprovedNeedsRequetsNumber: any;
  ManagerlstPendingNeedRequest: NeedRequest[];
  ManagerlstDisApprovedNeedsRequets:  NeedRequest[];
  ManagerlstApprovedNeedsRequets:  NeedRequest[];
  role: string;
  empId: number;
  constructor(private leaveservice: LeaveService, private needRequestService: NeedRequestService, private datepipe: DatePipe, private EmpService: EmployeeService, private profService: ProfessionService, private excuseService: ExcuseService) {


  }
  ngOnInit(): void {
    //employee chart
    this.role=localStorage.getItem("roles");
    this.empId = Number(localStorage.getItem('id'))

    this.Excusedate = new Date();
    this.LabelDate=this.datepipe.transform(this.Excusedate, "MMM")
    this.Strdate = this.datepipe.transform(this.Excusedate, "MM")
    // this.Strdate = new Date();
    // var month = this.Strdate.getUTCMonth() + 1; //months from 1-12
    // console.log("monthToday",month)
    this.lstOfPendingExcuse = []
    this.lstOfApprovedExcuse=[]
    this.lstOfDisApprovedExcuse=[]
    this.PendingExcusesesNumber = [];
    this.ApprovedExcusesesNumber = [];
    this.DisApprovedExcusesesNumber = [];
    this.ExcusesesNumber = []

    this.ManagerlstOfPendingExcuse = []
    this.ManagerlstOfApprovedExcuse=[]
    this.ManagerlstOfDisApprovedExcuse=[]
    this.ManagerPendingExcusesesNumber = [];
    this.ManagerApprovedExcusesesNumber = [];
    this.ManagerDisApprovedExcusesesNumber = [];
    this.ManagerExcusesesNumber = []

    this.lstPendingNeedRequest=[];
    this.lstDisApprovedNeedsRequets=[];
    this.lstApprovedNeedsRequets=[];
    this.PendingNeedRequestNumber = [];
    this.DisApprovedNeedsRequetsNumber = [];
    this.ApprovedNeedsRequetsNumber = [];
    this.NeedsRequetsNumber = []

    this.ManagerlstPendingNeedRequest=[];
    this.ManagerlstDisApprovedNeedsRequets=[];
    this.ManagerlstApprovedNeedsRequets=[];
    this.ManagerPendingNeedRequestNumber = [];
    this.ManagerDisApprovedNeedsRequetsNumber = [];
    this.ManagerApprovedNeedsRequetsNumber = [];
    this.ManagerNeedsRequetsNumber = []

    this.employeesLenght = []
    this.professionNames = []
    this.professionlst = []
    this.employeesLenght2 = []
    this.professionNames2 = []
    this.professionlst2 = []

    this.LeavesNumber = []
    this.PendingLeavesNumber = [];
    this.ApprovedLeavesNumber = [];
    this.DisApprovedLeavesNumber = [];
    this.lstPendingLeaves= [];
    this.lstApprovedLeaves=[];
    this.lstDisApprovedLeaves= [];
    this.ManagerLeavesNumber = []
    this.ManagerPendingLeavesNumber = [];
    this.ManagerApprovedLeavesNumber = [];
    this.ManagerDisApprovedLeavesNumber = [];
    this.ManagerlstPendingLeaves= [];
    this.ManagerlstApprovedLeaves=[];
    this.ManagerlstDisApprovedLeaves= [];

    console.log("employeesLenght", this.employeesLenght)
    this.EmpService.GetAllEmployees().subscribe(res => { this.employeeNumber = res.length }
    )
    this.profService.getAllProfession().subscribe(data => {
      this.professionlst = data
      console.log("professionlst", data);
      this.professionlst.forEach(element => {
        this.professionNames.push(element.name)
        console.log("professionNames", element.name);
        console.log("professionid", element.id);
        this.EmpService.GetAllEmployeesByProfession(element.id).subscribe(
          res => {
            console.log("employeesLenght in", res);
            this.employeesLenght.push(res.length)
            this.chartOptionsEmployees = {
              series: this.employeesLenght,
              chart: {
                type: "donut"
              },
              labels: this.professionNames,
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200
                    },
                    legend: {
                      position: "bottom"
                    }
                  }
                }
              ]
            };
          })
      });
    });

    this.profService.getAllProfession().subscribe(data => {
      this.professionlst2 = data
      console.log("professionlst2", data);
      this.professionlst2.forEach(element => {
        this.professionNames2.push(element.name)
        console.log("professionNames2", element.name);
        console.log("professionid", element.id);
        this.EmpService.GetAllEmployeesByProfession(element.id).subscribe(
          res => {
            console.log("employeesLenght in", res);
            this.employeesLenght2.push(res.length)
            this.chartoptionsEmployee2 = {
              series: [
                {
                  name: "Employees",
                  data: this.employeesLenght2
                }
              ],
              chart: {
                type: "bar",
                height: 350
              },
              plotOptions: {
                bar: {
                  horizontal: true
                }
              },
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: this.professionNames2
              }
            };
          })
      });
    });
    //number of excuses
    this.excuseService.AllExcuses().subscribe(res => {
      // this.Excusedate=res['employeeName']
      console.log("AllExcuses", res)
      this.ExcusesesNumber.push(res.length)
      this.chartOptionsExcusesesNumber = {
        series: this.ExcusesesNumber,
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px"
              },
              value: {
                formatter: function (val) {
                  return parseInt(val.toString(), 10).toString();
                },
                color: "#111",
                fontSize: "36px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Excuses"]
      };
    })
    this.excuseService.GetExcusesByManager().subscribe(res => {
      this.ManagerExcusesesNumber.push(res.length)
      this.chartOptionsManagerExcusesesNumber = {
        series: this.ManagerExcusesesNumber,
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px"
              },
              value: {
                formatter: function (val) {
                  return parseInt(val.toString(), 10).toString();
                },
                color: "#111",
                fontSize: "36px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Excuses"]
      };
    })

    this.leaveservice.AllLeaves().subscribe(res => {
      // this.Excusedate=res['employeeName']
      console.log("AllLeaves", res)
      this.LeavesNumber.push(res.length)
      this.chartOptionsLeavesNumber = {
        series: this.LeavesNumber,
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px"
              },
              value: {
                formatter: function (val) {
                  return parseInt(val.toString(), 10).toString();
                },
                color: "#111",
                fontSize: "36px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Leaves"]
      };
    })
    this.leaveservice.GetLeaveRequestsByManager().subscribe(res => {
      console.log("ManagerLeavesNumber",res)
      console.log("ManagerLeavesNumber2",res.length)
      this.ManagerLeavesNumber.push(res.length)
      this.chartOptionsManagerLeavesNumber = {
        series: this.ManagerLeavesNumber,
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px"
              },
              value: {
                formatter: function (val) {
                  return parseInt(val.toString(), 10).toString();
                },
                color: "#111",
                fontSize: "36px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Leaves"]
      };
    })
    this.needRequestService.getNeedrequest().subscribe(res => {
      // this.Excusedate=res['employeeName']
      console.log("AllNeedsRequests", res)
      this.NeedsRequetsNumber.push(res.length)
      this.chartOptionsNeedsRequetsNumber = {
        series: this.NeedsRequetsNumber,
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px"
              },
              value: {
                formatter: function (val) {
                  return parseInt(val.toString(), 10).toString();
                },
                color: "#111",
                fontSize: "36px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Needs Requests"]
      };
    })
    this.needRequestService.GetNeedRequestByManager().subscribe(res => {
      this.ManagerNeedsRequetsNumber.push(res.length)
      this.chartOptionsManagerNeedsRequetsNumber = {
        series: this.ManagerNeedsRequetsNumber,
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px"
              },
              value: {
                formatter: function (val) {
                  return parseInt(val.toString(), 10).toString();
                },
                color: "#111",
                fontSize: "36px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Needs Requests"]
      };
    })
    this.excuseService.PendingExcusesByHR().subscribe(res => {
      console.log("pendingEx", res)
      res.forEach(element => {
        let latest_date = this.datepipe.transform(element.date, 'MM');
        if (this.Strdate == latest_date) {
          this.lstOfPendingExcuse.push(element)
        }
      });
      this.PendingExcusesesNumber.push(this.lstOfPendingExcuse.length)
   
    console.log("PendingExcusesesNumber", this.PendingExcusesesNumber)
    this.excuseService.ApprovedExcuses().subscribe(res => {
      console.log("approved",res)
      res.forEach(element => {
        let latest_date2 = this.datepipe.transform(element.date, 'MM');
        if (this.Strdate == latest_date2) {
          this.lstOfApprovedExcuse.push(element)
        }
      });
      this.ApprovedExcusesesNumber.push(this.lstOfApprovedExcuse.length)
      console.log("ApprovedExcusesesNumber", this.lstOfApprovedExcuse.length)


    this.excuseService.DisApprovedExcuses().subscribe(res => {
      res.forEach(element => {
        let latest_date = this.datepipe.transform(element.date, 'MM');
        if (this.Strdate == latest_date) {
          this.lstOfDisApprovedExcuse.push(element)
        }
      });
      this.DisApprovedExcusesesNumber.push(this.lstOfDisApprovedExcuse.length)
   
    this.ChartOptionsExcusesTypes = {
      series: [
        {
          name: "Pending",
          data: this.PendingExcusesesNumber
        },
        {
          name: "Approved",
          data: this.ApprovedExcusesesNumber
        },
        {
          name: "DisApproved",
          data: this.DisApprovedExcusesesNumber
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      xaxis: {
        categories: [
          //sow date there
          this.LabelDate,

        ]
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 50
      }
    };
  })
})
  })
  this.excuseService.PendingExcusesByManager().subscribe(res => {
    res.forEach(element => {
      let latest_date = this.datepipe.transform(element.date, 'MM');
      if (this.Strdate == latest_date) {
        this.ManagerlstOfPendingExcuse.push(element)
      }
    });
    this.ManagerPendingExcusesesNumber.push(this.ManagerlstOfPendingExcuse.length)
 
  console.log("PendingExcusesesNumber", this.ManagerPendingExcusesesNumber)
  this.excuseService.ApprovedExcusesByManager().subscribe(res => {
    console.log("approved",res)
    res.forEach(element => {
      let latest_date2 = this.datepipe.transform(element.date, 'MM');
      if (this.Strdate == latest_date2) {
        this.ManagerlstOfApprovedExcuse.push(element)
      }
    });
    this.ManagerApprovedExcusesesNumber.push(this.ManagerlstOfApprovedExcuse.length)
    console.log("ApprovedExcusesesNumber", this.ManagerlstOfApprovedExcuse.length)


  this.excuseService.DisApprovedExcusesByManager().subscribe(res => {
    res.forEach(element => {
      let latest_date = this.datepipe.transform(element.date, 'MM');
      if (this.Strdate == latest_date) {
        this.ManagerlstOfDisApprovedExcuse.push(element)
      }
    });
    this.ManagerDisApprovedExcusesesNumber.push(this.ManagerlstOfDisApprovedExcuse.length)
 
  this.ChartOptionsManagerExcusesTypes = {
    series: [
      {
        name: "Pending",
        data: this.ManagerPendingExcusesesNumber
      },
      {
        name: "Approved",
        data: this.ManagerApprovedExcusesesNumber
      },
      {
        name: "DisApproved",
        data: this.ManagerDisApprovedExcusesesNumber
      }
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%"
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    xaxis: {
      categories: [
        //sow date there
        this.LabelDate,

      ]
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50
    }
  };
})
})
})
    this.leaveservice.PendingLeaves().subscribe(res => {
      console.log("PendingLeaves",res);
      res.forEach(element => {
        let latest_date = this.datepipe.transform(element.date, 'MM');
        if (this.Strdate == latest_date) {
          this.lstPendingLeaves.push(element)
        }
      });
      this.PendingLeavesNumber.push(this.lstPendingLeaves.length)

      this.leaveservice.ApprovedLeaves().subscribe(res => {
        res.forEach(element => {
          let latest_date = this.datepipe.transform(element.date, 'MM');
          if (this.Strdate == latest_date) {
            this.lstApprovedLeaves.push(element)
          }
        });
        this.ApprovedLeavesNumber.push(this.lstApprovedLeaves.length)

        this.leaveservice.DisApprovedLeaves().subscribe(res => {
          res.forEach(element => {
            let latest_date = this.datepipe.transform(element.date, 'MM');
            if (this.Strdate == latest_date) {
              this.lstDisApprovedLeaves.push(element)
            }
          });
          this.DisApprovedLeavesNumber.push(this.lstDisApprovedLeaves.length)
          this.ChartOptionsLeavesTypes = {
            series: [
              {
                name: "Pending",
                data: this.PendingLeavesNumber
              },
              {
                name: "Approved",
                data: this.ApprovedLeavesNumber
              },
              {
                name: "DisApproved",
                data: this.DisApprovedLeavesNumber
              }
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: true,
              stackType: "100%"
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }
            ],
            xaxis: {
              categories: [
                //sow date there
                this.LabelDate,

              ]
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: "right",
              offsetX: 0,
              offsetY: 50
            }
          };
        })
      })
    })
    this.leaveservice.PendingLeavesByManager().subscribe(res => {
      console.log("PendingLeaves",res);
      res.forEach(element => {
        let latest_date = this.datepipe.transform(element.date, 'MM');
        if (this.Strdate == latest_date) {
          this.ManagerlstPendingLeaves.push(element)
        }
      });
      this.ManagerPendingLeavesNumber.push(this.ManagerlstPendingLeaves.length)

      this.leaveservice.ApprovedLeavesByManager().subscribe(res => {
        res.forEach(element => {
          let latest_date = this.datepipe.transform(element.date, 'MM');
          if (this.Strdate == latest_date) {
            this.ManagerlstApprovedLeaves.push(element)
          }
        });
        this.ManagerApprovedLeavesNumber.push(this.ManagerlstApprovedLeaves.length)

        this.leaveservice.DisApprovedLeavesByManager().subscribe(res => {
          res.forEach(element => {
            let latest_date = this.datepipe.transform(element.date, 'MM');
            if (this.Strdate == latest_date) {
              this.ManagerlstDisApprovedLeaves.push(element)
            }
          });
          this.ManagerDisApprovedLeavesNumber.push(this.ManagerlstDisApprovedLeaves.length)
          this.ChartOptionsManagerLeavesTypes = {
            series: [
              {
                name: "Pending",
                data: this.ManagerPendingLeavesNumber
              },
              {
                name: "Approved",
                data: this.ManagerApprovedLeavesNumber
              },
              {
                name: "DisApproved",
                data: this.ManagerDisApprovedLeavesNumber
              }
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: true,
              stackType: "100%"
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }
            ],
            xaxis: {
              categories: [
                //sow date there
                this.LabelDate,

              ]
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: "right",
              offsetX: 0,
              offsetY: 50
            }
          };
        })
      })
    })
    this.needRequestService.GetPendingNeedRequest().subscribe(res => {
      res.forEach(element => {
        let latest_date = this.datepipe.transform(element.needRequestDate, 'MM');
        if (this.Strdate == latest_date) {
          this.lstPendingNeedRequest.push(element)
        }
      });
      this.PendingNeedRequestNumber.push(this.lstPendingNeedRequest.length)
      this.needRequestService.GetApprovedNeedRequest().subscribe(res => {
        res.forEach(element => {
          let latest_date = this.datepipe.transform(element.needRequestDate, 'MM');
          if (this.Strdate == latest_date) {
            this.lstApprovedNeedsRequets.push(element)
          }
        });
        this.ApprovedNeedsRequetsNumber.push(this.lstApprovedNeedsRequets.length)
        this.needRequestService.GetDisApprovedNeedRequest().subscribe(res => {
          res.forEach(element => {
            let latest_date = this.datepipe.transform(element.needRequestDate, 'MM');
            if (this.Strdate == latest_date) {
              this.lstDisApprovedNeedsRequets.push(element)
            }
          });
          this.DisApprovedNeedsRequetsNumber.push( this.lstDisApprovedNeedsRequets.length)
          this.ChartOptionsNeedsRequetsTypes = {
            series: [
              {
                name: "Pending",
                data: this.PendingNeedRequestNumber
              },
              {
                name: "Approved",
                data: this.ApprovedNeedsRequetsNumber
              },
              {
                name: "DisApproved",
                data: this.DisApprovedNeedsRequetsNumber
              }
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: true,
              stackType: "100%"
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }
            ],
            xaxis: {
              categories: [
                //sow date there
                this.LabelDate,

              ]
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: "right",
              offsetX: 0,
              offsetY: 50
            }
          };
        })
      })
    })
    this.needRequestService.GetPendingNeedRequestByManager().subscribe(res => {
      res.forEach(element => {
        let latest_date = this.datepipe.transform(element.needRequestDate, 'MM');
        if (this.Strdate == latest_date) {
          this.ManagerlstPendingNeedRequest.push(element)
        }
      });
      this.ManagerPendingNeedRequestNumber.push(this.ManagerlstPendingNeedRequest.length)
      this.needRequestService.GetApprovedNeedRequestByManager().subscribe(res => {
        res.forEach(element => {
          let latest_date = this.datepipe.transform(element.needRequestDate, 'MM');
          if (this.Strdate == latest_date) {
            this.ManagerlstApprovedNeedsRequets.push(element)
          }
        });
        this.ManagerApprovedNeedsRequetsNumber.push(this.ManagerlstApprovedNeedsRequets.length)
        this.needRequestService.GetDisApprovedNeedRequestByManager().subscribe(res => {
          res.forEach(element => {
            let latest_date = this.datepipe.transform(element.needRequestDate, 'MM');
            if (this.Strdate == latest_date) {
              this.ManagerlstDisApprovedNeedsRequets.push(element)
            }
          });
          this.ManagerDisApprovedNeedsRequetsNumber.push( this.ManagerlstDisApprovedNeedsRequets.length)
          this.ChartOptionsManagerNeedsRequetsTypes = {
            series: [
              {
                name: "Pending",
                data: this.ManagerPendingNeedRequestNumber
              },
              {
                name: "Approved",
                data: this.ManagerApprovedNeedsRequetsNumber
              },
              {
                name: "DisApproved",
                data: this.ManagerDisApprovedNeedsRequetsNumber
              }
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: true,
              stackType: "100%"
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }
            ],
            xaxis: {
              categories: [
                //sow date there
                this.LabelDate,

              ]
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: "right",
              offsetX: 0,
              offsetY: 50
            }
          };
        })
      })
    })
  }
}
