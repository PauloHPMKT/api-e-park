import { CompanyProps } from '../../application/namespaces/company-props';

export interface CompanyProps {
  name: string;
  cpnj: string;
  email: string;
  phone: string;
  address: CompanyProps.Address;
  created_at?: Date;
  updated_at?: Date;
}

export class CompanyEntity {
  constructor(private readonly props: CompanyProps) {
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
  }
}
