import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  companies = [
    {
      id: 1,
      name: 'Company 1',
    },
    {
      id: 2,
      name: 'Company 2',
    },
    {
      id: 3,
      name: 'Company 3',
    },
  ];
  findAll(): { id: number; name: string }[] {
    return this.companies;
  }
}
