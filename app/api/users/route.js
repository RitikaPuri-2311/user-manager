import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB = path.join(process.cwd(), "data", "users.json");

const getUsers = () => {
  try {
    const content = fs.readFileSync(DB, "utf-8");
    if (!content || content.trim() === "") return [];
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(DB, JSON.stringify(users, null, 2));
};

export async function GET() {
  try {
    const users = getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Could not load users!" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required!" },
        { status: 400 }
      );
    }

    const users = getUsers();

    const exists = users.find(u => u.email === body.email);
    if (exists) {
      return NextResponse.json(
        { error: "Email already exists!" },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Could not create user!" },
      { status: 500 }
    );
  }
}