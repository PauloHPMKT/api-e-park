import * as bcrypt from 'bcrypt';

export class Encript {
  public static async encriptPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public static async comparePassword(
    enterPassword: string,
    validPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(enterPassword, validPassword);
  }
}
