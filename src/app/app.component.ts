import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { JobReport } from '../models/report';
import { DomainStatus } from '../models/domain-status';
import { DropdownItem } from '../models/dropdown-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'selenium-report';
  selectedJob: any;
  constructor(private jobService: ServicesService) {}

  testSuiteOptions: DropdownItem[] = [];
  environmentOptions: DropdownItem[] = [];
  statusOptions: DropdownItem[] = [];
  executedByOptions: DropdownItem[] = [];
  applicationModes: DropdownItem[] = [];
  applicationType: DropdownItem[] = [];
  jobs: JobReport[] = [];
  jobsData: JobReport[] = [];
  domainStatus: DomainStatus[] = [];
  lastUpdateDate: string = '';

  jobFilter: JobReport = {
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
    applicationMode: null,
    applicationType: null,
    comments: '',
    date: null,
  };

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
    applicationMode: null,
    applicationType: null,
  };
  ngOnInit() {
    this.loadOptions();
    this.addOtherData();
  }
  addOtherData() {
    this.jobService
      .addOtherData({ lastUpdateDate: new Date().toLocaleDateString() })
      .subscribe((data) => {
        console.log(data);
      });
  }
  updatePassPercentage() {
    this.report.passPercentage = this.calculatePassPercentage(
      this.report.executedTestCaseCount,
      this.report.passedTestCaseCount
    );
  }

  loadOptions() {
    const testSuiteUrl = 'assets/test-suite-options.json';
    const environmentUrl = 'assets/environment-options.json';
    const statusUrl = 'assets/type-options.json';
    const executedByUrl = 'assets/executed-by-options.json';
    const applicationType = 'assets/application-type.json';
    const applicationMode = 'assets/application-mode.json';
    const domainStatus = 'assets/domain-status.json';

    this.jobService.getJobs(testSuiteUrl).subscribe((data) => {
      this.testSuiteOptions = data;
      this.testSuiteOptions.sort((a: DropdownItem, b: DropdownItem) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
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
    this.jobService.getJobs(applicationType).subscribe((data) => {
      this.applicationType = data;
    });
    this.jobService.getJobs(applicationMode).subscribe((data) => {
      this.applicationModes = data;
    });
    this.jobService.getJobs(domainStatus).subscribe((data) => {
      this.domainStatus = data;
    });
    this.jobService.getJobs('service/jobs.json').subscribe((data) => {
      this.jobs = data;
      this.jobsData = data;
    });
    this.jobService.getJobs('service/otherData.json').subscribe((data) => {
      this.lastUpdateDate = data as unknown as string;
    });
  }
  calculatePassPercentage(
    totalTestCaseCount: number,
    passedTestCaseCount: number
  ): number {
    if (totalTestCaseCount === 0) {
      return 0; // Avoid division by zero
    }
    return parseFloat(
      ((passedTestCaseCount / totalTestCaseCount) * 100).toFixed(2)
    );
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
      passPercentage: 0,
      status: null,
      executedBy: null,
      comments: '',
      date: null,
      applicationMode: null,
      applicationType: null,
    };
  }

  addReport() {
    this.updatePassPercentage();
    if(!this.report.passPercentage){
      this.report.passPercentage = 0;
    }
    const modifiedReport: any = {
      ...this.report,
      id: Math.floor(Math.random() * 10000),
      // testSuite: this.report.testSuite ? this.report.testSuite.name : null,
      // environment: this.report.environment ? this.report.environment.name : null,
      // status: this.report.status ? this.report.status.name : null,
      // executedBy: this.report.executedBy ? this.report.executedBy.name : null
    };
    console.log(modifiedReport);
    this.jobService.addJob(modifiedReport).subscribe((data) => {
      console.log(data);
    });
    this.resetReport();
  }

  searchReport() {
    console.log('Searching Report...');
  }
  filter() {
    this.jobsData = this.jobs.filter((job) => {
      let match = true;

      // Filter by Date (if date is selected)
      if (this.jobFilter.date) {
        const selectedDate = new Date(this.jobFilter.date);
        let jobDate;
        if (job.date) jobDate = new Date(job?.date);
        if (jobDate) {
          // Compare only the date (not the time)
          if (
            jobDate.toLocaleDateString() !== selectedDate.toLocaleDateString()
          ) {
            match = false;
          }
        } else {
          match = false;
        }
      }

      // Filter by Test Suite (if test suite is selected)
      if (this.jobFilter.testSuite && this.jobFilter.testSuite.name) {
        if (
          !job.testSuite ||
          job.testSuite.name !== this.jobFilter.testSuite.name
        ) {
          match = false;
        }
      }

      // Filter by Environment (if environment is selected)
      if (this.jobFilter.environment && this.jobFilter.environment.name) {
        if (
          !job.environment ||
          job.environment.name !== this.jobFilter.environment.name
        ) {
          match = false;
        }
      }

      // Filter by Status (if status is selected)
      if (this.jobFilter.status && this.jobFilter.status.name) {
        if (!job.status || job.status.name !== this.jobFilter.status.name) {
          match = false;
        }
      }

      // Filter by Executed By (if executedBy is selected)
      if (this.jobFilter.executedBy && this.jobFilter.executedBy.name) {
        if (
          !job.executedBy ||
          job.executedBy.name !== this.jobFilter.executedBy.name
        ) {
          match = false;
        }
      }

      // Filter by Application Mode (if applicationMode is selected)
      if (
        this.jobFilter.applicationMode &&
        this.jobFilter.applicationMode.name
      ) {
        if (
          !job.applicationMode ||
          job.applicationMode.name !== this.jobFilter.applicationMode.name
        ) {
          match = false;
        }
      }

      // Filter by Application Type (if applicationType is selected)
      if (
        this.jobFilter.applicationType &&
        this.jobFilter.applicationType.name
      ) {
        if (
          !job.applicationType ||
          job.applicationType.name !== this.jobFilter.applicationType.name
        ) {
          match = false;
        }
      }

      // Filter by Local Company (if localCompany is provided)
      if (this.jobFilter.localCompany) {
        if (
          !job.localCompany ||
          !job.localCompany
            .toLowerCase()
            .includes(this.jobFilter.localCompany.toLowerCase())
        ) {
          match = false;
        }
      }

      // Filter by Total Test Cases (if totalTestCaseCount is provided)
      if (
        this.jobFilter.totalTestCaseCount != null &&
        this.jobFilter.totalTestCaseCount !== 0
      ) {
        if (job.totalTestCaseCount !== this.jobFilter.totalTestCaseCount) {
          match = false;
        }
      }

      // Filter by Executed Test Cases (if executedTestCaseCount is provided)
      if (
        this.jobFilter.executedTestCaseCount != null &&
        this.jobFilter.executedTestCaseCount !== 0
      ) {
        if (
          job.executedTestCaseCount !== this.jobFilter.executedTestCaseCount
        ) {
          match = false;
        }
      }

      // Filter by Passed Test Cases (if passedTestCaseCount is provided)
      if (
        this.jobFilter.passedTestCaseCount != null &&
        this.jobFilter.passedTestCaseCount !== 0
      ) {
        if (job.passedTestCaseCount !== this.jobFilter.passedTestCaseCount) {
          match = false;
        }
      }

      // Filter by Pass Percentage (if passPercentage is provided)
      if (
        this.jobFilter.passPercentage != null &&
        this.jobFilter.passPercentage !== 0
      ) {
        if (job.passPercentage !== this.jobFilter.passPercentage) {
          match = false;
        }
      }

      return match;
    });
  }

  resetFilter(event: any) {
    console.log(event);
    this.filter();
  }
}
