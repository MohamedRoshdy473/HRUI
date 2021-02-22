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
  
} from "ng-apexcharts";
import { EmployeeService } from "../Services/employee.service";
import { ExcuseService } from "../Services/excuse.service";
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

};
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
export type chartOptionsEmployees = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartOptionsExcusesTypes= {
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
  public ChartOptionsExcusesTypes:Partial<ChartOptions>
  public chartOptionsExcusesesNumber: Partial<ChartOptions>;
  public chartOptionsEmployees: Partial<ChartOptions>;
  employeesLenght: any;
  professionlst: any;
  employeelst:any;
  professionNames: any;
  empLength:number
  employeeNumber: any;
  ExcusesesNumber:any;
  PendingExcusesesNumber:any;
  ApprovedExcusesesNumber:any;
  DisApprovedExcusesesNumber:any;
  Excusedate: Date;
  Strdate:string
  pendingExcuselst: any;
  constructor(private datepipe:DatePipe,private EmpService: EmployeeService, private profService: ProfessionService,private excuseService:ExcuseService) {


  }
  ngOnInit(): void {
    //employee chart
    this.Excusedate=new Date();
    this.Strdate=this.datepipe.transform(this.Excusedate,"yyyy/MM")
    this.employeesLenght=[]
    this.professionNames=[]
    this.professionlst=[]
    this.ExcusesesNumber=[]
    this.PendingExcusesesNumber=[];
    this.ApprovedExcusesesNumber=[];
    this.DisApprovedExcusesesNumber=[];
    console.log("employeesLenght", this.employeesLenght)
    this.EmpService.GetAllEmployees().subscribe(res => { this.employeeNumber = res.length }
    )
    this.profService.getAllProfession().subscribe(data =>{ 
      this.professionlst = data
        console.log("professionlst",data);
        this.professionlst.forEach(element => {
          this.professionNames.push(element.name)
          console.log("professionNames",element.name);
          console.log("professionid",element.id);
          this.EmpService.GetAllEmployeesByProfession(element.id).subscribe(
            res => { console.log("employeesLenght in",res);
              this.employeesLenght.push(res.length)
              this.chartOptionsEmployees = {
                series:this.employeesLenght,
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

//number of excuses
      this.excuseService.AllExcuses().subscribe(res=>
        {
          // this.Excusedate=res['employeeName']
           console.log("AllExcuses",res)
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
      
      this.excuseService.PendingExcusesByHR().subscribe(res=>{
       this.PendingExcusesesNumber.push(res.length)
       this.excuseService.ApprovedExcuses().subscribe(res=>{
       this.ApprovedExcusesesNumber.push(res.length)
       this.excuseService.DisApprovedExcuses().subscribe(res=>{
       this.DisApprovedExcusesesNumber.push(res.length)
       this.pendingExcuselst=res
      console.log("PendingExcuseses",this.pendingExcuselst)
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
            this.Strdate,
   
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
