import { Omit } from '@prisma/client/runtime/library';

export class UserData implements Omit<UserData, 'password'> {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
