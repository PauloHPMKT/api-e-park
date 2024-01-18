export class CreateEmployeeDto {
  _id?: string;
  name: string;
  email: string;
  password: string;
  company: string;
  role: string;
  role_gpt_generate: string;
}
