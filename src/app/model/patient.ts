export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  birthday: Date;
  country: string;
  state: string;
  address: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.country = '';
    this.state = '';
    this.address = '';
  }
}
