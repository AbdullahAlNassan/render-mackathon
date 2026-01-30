import { AuthPayload, LoginDto, RegisterDto } from "./auth.types";
import { MESSAGES } from "../../../config/constants";
import { AuthRepository } from "./auth.repository";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import bcrypt from "bcryptjs";

export const AuthService = {
  async register(dto: RegisterDto) {
    const existing = await AuthRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error(MESSAGES.USER.USER_ALREADY_EXISTS);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const safeUser = await AuthRepository.createUser({
      email: dto.email,
      passwordHash,
    });
    return safeUser;
  },

  async login(dto: LoginDto) {
    const user = await AuthRepository.findByEmail(dto.email);

    if (!user) {
      throw new Error(MESSAGES.USER.USER_NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(
      dto.password,
      user.passwordHash
    );

    if (!isPasswordMatch) {
      throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const payload: AuthPayload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: "40m" });

    await AuthRepository.saveToken({ userId: user.id, token: accessToken });

    // never return password hash
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return { accessToken, user: safeUser };
  },

  async findUserbyEmail(email: string) {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new Error(MESSAGES.USER.USER_NOT_FOUND);

    // never return password hash
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return safeUser;
  },

  async Logout(token: string) {
    await AuthRepository.deleteToken(token);
    return true;
  },
};
