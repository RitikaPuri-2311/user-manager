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

// GET one user
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const users = getUsers();
    const user = users.find(u => String(u.id) === String(id));

    if (!user) {
      return NextResponse.json(
        { error: "User not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json(
      { error: "Could not get user!" },
      { status: 500 }
    );
  }
}

// PUT — update user
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const users = getUsers();
    const index = users.findIndex(u => String(u.id) === String(id));

    if (index === -1) {
      return NextResponse.json(
        { error: "User not found!" },
        { status: 404 }
      );
    }

    users[index] = {
      ...users[index],
      name: body.name,
      email: body.email,
      updatedAt: new Date().toISOString(),
    };

    saveUsers(users);
    return NextResponse.json(users[index]);

  } catch (error) {
    return NextResponse.json(
      { error: "Could not update user!" },
      { status: 500 }
    );
  }
}

// DELETE — remove user
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const users = getUsers();
    const filtered = users.filter(u => String(u.id) !== String(id));

    if (filtered.length === users.length) {
      return NextResponse.json(
        { error: "User not found!" },
        { status: 404 }
      );
    }

    saveUsers(filtered);
    return NextResponse.json(
      { message: "User deleted successfully!" }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete user!" },
      { status: 500 }
    );
  }
}