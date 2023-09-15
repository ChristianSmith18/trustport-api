import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = process.env.JWT_SECRET;

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secret, {
      algorithm: 'HS512',
      expiresIn: '60s',
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (e) {
      return null;
    }
  }
}
