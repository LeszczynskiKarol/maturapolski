// backend/src/services/authService.ts
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  private readonly JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "refresh-secret";

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    // Sprawdź czy użytkownik już istnieje
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash hasła
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Utwórz użytkownika
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "STUDENT", // Domyślna rola
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    // Generuj tokeny
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      user,
      token,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    // Znajdź użytkownika
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Sprawdź hasło
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    // Generuj tokeny
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Zapisz refresh token w bazie
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // WAŻNE: Zwróć dane w tym samym formacie
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token, // To jest access token
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Weryfikuj refresh token
      const decoded = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as any;

      // Znajdź użytkownika
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      // Generuj nowe tokeny
      const newToken = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // Zaktualizuj refresh token
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  private generateToken(user: any) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      this.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }

  private generateRefreshToken(user: any) {
    return jwt.sign(
      {
        userId: user.id,
        type: "refresh",
      },
      this.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
  }
}
