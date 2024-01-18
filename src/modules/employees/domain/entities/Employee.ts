import crypto from 'node:crypto';

export interface EmployeeEntityProps {
  _id?: string;
  name: string;
  email: string;
  password: string;
  company: string;
  role: string;
  role_gpt_generate: string;
  created_at?: Date;
}

export class EmployeeEntity {
  constructor(private readonly props: EmployeeEntityProps) {
    this.props._id = props._id ?? crypto.randomUUID();
    this.props.created_at = props.created_at ?? new Date();
  }
}
