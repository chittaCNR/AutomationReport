import { DropdownItem } from './dropdown-item';

export interface JobReport {
  id: number;
  testSuite: DropdownItem | null;
  tool: DropdownItem | null;
  domainName: DropdownItem | null;
  localCompany: string;
  totalTestCaseCount: number;
  executedTestCaseCount: number;
  passedTestCaseCount: number;
  passPercentage: number; // Readonly (shouldn't be updated by user)
  status: DropdownItem | null;
  executedBy: DropdownItem | null;
  applicationMode: DropdownItem | null;
  applicationType: DropdownItem | null;
  comments: string;
  date: Date | null;
}
