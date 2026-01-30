import { prisma } from "../../../config/prisma";

export const AuthRepository = {
  async createUser(data: { email: string; passwordHash: string }) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
  },

  // User zoeken op e-mail
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async saveToken(data: { userId: string; token: string }) {
    return await prisma.userToken.create({ data });
  },

  async findToken(token: string) {
    return await prisma.userToken.findUnique({
      where: { token },
    });
  },

  async deleteToken(token: string) {
    return await prisma.userToken.delete({
      where: { token },
    });
  },
};
