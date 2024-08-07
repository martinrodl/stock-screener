import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    uniqueItems: true,
    example: 'john.doe@example.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2023-07-01T00:00:00Z',
  })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'The portfolio list of the user',
    type: [String],
    example: ['60c72b2f9b1d8c1a4f4e3b1d'],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Stock' }], default: [] })
  portfolioList: Types.ObjectId[];

  @ApiProperty({
    description: 'The consider list of the user',
    type: [String],
    example: ['60c72b2f9b1d8c1a4f4e3b1e'],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Stock' }], default: [] })
  considerList: Types.ObjectId[];

  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
