const { NextResponse } = require("next/server");
import db from "@/libs/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userFound) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }
    const userNameFound = await db.user.findUnique({
      where: {
        email: data.username,
      },
    });
    if (userNameFound) {
      return NextResponse.json({
        message: "Username already exists",
        status: 400,
      });
    }
    const handlePassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: handlePassword,
      },
    });
    const { password: _, ...rest } = newUser;
    return NextResponse.json(rest);
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
