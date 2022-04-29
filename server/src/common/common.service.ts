import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  public static BYTES_RANGE = 'abcdef0123456789';

  public static getDateWithDayOffset(offset = 0, _ = new Date()): Date {
    return _.setDate(_.getDate() + offset) && _;
  }

  public static generateBytes(length = 10, char = '', text = '') {
    for (let i = 1; i <= length; i++) {
      text += this.BYTES_RANGE.charAt(
        Math.floor(Math.random() * this.BYTES_RANGE.length)
      );
      if (char && !(i % 2) && i !== length) text += char;
    }
    return text;
  }
}
