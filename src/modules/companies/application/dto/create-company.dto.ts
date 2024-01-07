import { CompanyProps } from '../namespaces/company-props';

export class CreateCompanyDto {
  name: string;
  cpnj: string;
  email: string;
  phone: string;
  address: CompanyProps.Address;
  created_at?: Date;
  updated_at?: Date;
}
