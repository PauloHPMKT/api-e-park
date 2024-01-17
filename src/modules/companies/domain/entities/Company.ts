import { CompanyProps } from '../../application/namespaces/company-props';

export interface CompanyProps {
  name: string;
  cpnj: string;
  email: string;
  phone: string;
  address: CompanyProps.Address;
  created_at?: Date;
}

export class CompanyEntity {
  constructor(private readonly props: CompanyProps) {
    this.props.created_at = this.props.created_at ?? new Date();
    this.validate(props);
  }

  private validate(props: CompanyProps) {
    const requiredFields = Object.keys(props);
    for (const field of requiredFields) {
      if (!props[field]) {
        throw new Error(`The field ${field} is required`);
      }
    }
  }
}

console.log(
  new CompanyEntity({
    name: 'string',
    cpnj: 'string/0001-01',
    email: 'string@mail.com',
    phone: '85988704658',
    address: {
      street: 'rua string',
      city: 'cidade string',
      state: 'estado string',
      country: 'pais string',
      zipCode: '00000-000',
    },
  }),
);
