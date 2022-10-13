import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  private authors: any[] = [
    {
      id: 1,
      firstName: 'mohamed',
      lastName: 'Ahmadian',
    },
    {
      id: 2,
      firstName: 'hamid',
      lastName: 'akbar',
    },
  ];
  findOneById(id) {
    return this.authors.find((author) => author.id == id);
  }
  findAll() {
    return this.authors;
  }
}
