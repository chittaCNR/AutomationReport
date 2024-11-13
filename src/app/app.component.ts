import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { JobReport } from '../models/report';
import { DropdownItem } from 'primeng/dropdown';
import { DomainStatus } from '../models/domain-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
[x: string]: any;
  title = 'selenium-report';
  selectedJob: any;
  constructor(private jobService: ServicesService) {}
  testSuiteOptions: DropdownItem[] = [];
  environmentOptions: DropdownItem[] = [];
  statusOptions: DropdownItem[] = [];
  executedByOptions: DropdownItem[] = [];
  applicationTypes: DropdownItem[] = [];
  applicationStatus: DropdownItem[] = [];
  jobs:JobReport[]=[];
  domainStatus:DomainStatus[] = [];

  report: JobReport = {
    id: 0,
    testSuite: null,
    environment: null,
    localCompany: '',
    totalTestCaseCount: 0,
    executedTestCaseCount: 0,
    passedTestCaseCount: 0,
    passPercentage: 0,
    status: null,
    executedBy: null,
    comments: '',
    date: null,
    applicationTypes: null,
    applicationStatus: null
  }
  ngOnInit() {
    this.loadOptions();
  }

  loadOptions() {
    const testSuiteUrl = 'assets/test-suite-options.json';
    const environmentUrl = 'assets/environment-options.json';
    const statusUrl = 'assets/status-options.json';
    const executedByUrl = 'assets/executed-by-options.json';
    const applicationStatus = 'assets/application-status.json';
    const applicationType = 'assets/application-type.json';
    const domainStatus = 'assets/domain-status.json';

    this.jobService.getJobs(testSuiteUrl).subscribe((data) => {
      this.testSuiteOptions = data;
    });
    this.jobService.getJobs(environmentUrl).subscribe((data) => {
      this.environmentOptions = data;
    });
    this.jobService.getJobs(statusUrl).subscribe((data) => {
      this.statusOptions = data;
    });
    this.jobService.getJobs(executedByUrl).subscribe((data) => {
      this.executedByOptions = data;
    });
    this.jobService.getJobs(applicationStatus).subscribe((data) => {
      this.applicationStatus = data;
    });
    this.jobService.getJobs(applicationType).subscribe((data) => {
      this.applicationTypes = data;
    });
    this.jobService.getJobs(domainStatus).subscribe((data) => {
      this.domainStatus = data;
    });
    this.jobService.getJobs('service/jobs.json').subscribe((data) => {
      this.jobs = data;
    });
  }
  calculatePassPercentage(totalTestCaseCount: number, passedTestCaseCount: number): number {
    if (totalTestCaseCount === 0) {
      return 0; // Avoid division by zero
    }
    return (passedTestCaseCount / totalTestCaseCount) * 100;
  }

  resetReport() {
    this.report = {
      id: 0,
      testSuite: null,
      environment: null,
      localCompany: '',
      totalTestCaseCount: 0,
      executedTestCaseCount: 0,
      passedTestCaseCount: 0,
      passPercentage:0 ,
      status: null,
      executedBy: null,
      comments: '',
      date: null,
      applicationTypes: null,
      applicationStatus: null
    }
  }

  addReport() {
    const modifiedReport: any = {
      ...this.report,
      id:Math.floor(Math.random() * 10000),
      // testSuite: this.report.testSuite ? this.report.testSuite.name : null,
      // environment: this.report.environment ? this.report.environment.name : null,
      // status: this.report.status ? this.report.status.name : null,
      // executedBy: this.report.executedBy ? this.report.executedBy.name : null
    };
    this.jobService.addJob(modifiedReport).subscribe(data => {
      console.log(data)
    });
    this.resetReport();
  }

  searchReport() {
    console.log('Searching Report...');
  }
}
