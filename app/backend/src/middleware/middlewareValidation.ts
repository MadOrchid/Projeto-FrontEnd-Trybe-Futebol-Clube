import ErrorHandler from './middleware';

export default class Validation {
  static login(email:string, password: string) {
    if (!email || password) {
      throw new ErrorHandler(400, 'All fields mustbe filled');
    }
    const ragexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(ragexEmail)) {
      throw new ErrorHandler(401, 'Incorrect email or password');
    }
  }
}
