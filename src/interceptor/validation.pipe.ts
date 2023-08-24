import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class RequiredValidationPipe<T = any> implements PipeTransform {
  constructor(private RequiredFields: string[]) {}
  transform(value: T, metadata: ArgumentMetadata) {
    this.RequiredFields.forEach((item) => {
      if (!value[item]) {
        throw new BadRequestException(`${item}必填`);
      }
    });
    return value;
  }
}
