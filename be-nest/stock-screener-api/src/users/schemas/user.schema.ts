import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Stock' }], default: [] })
  portfolioList: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Stock' }], default: [] })
  considerList: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
