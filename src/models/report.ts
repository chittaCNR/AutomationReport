import { DropdownItem } from './dropdown-item';

export interface JobReport {
  id: number;
  testSuite: DropdownItem | null;
  environment: DropdownItem | null;
  localCompany: string;
  totalTestCaseCount: number;
  executedTestCaseCount: number;
  passedTestCaseCount: number;
  passPercentage: number; // Readonly (shouldn't be updated by user)
  status: DropdownItem | null;
  executedBy: DropdownItem | null;
  applicationTypes: DropdownItem[] | null;
  applicationStatus: DropdownItem[] | null;
  comments: string;
  date: Date | null;
}
