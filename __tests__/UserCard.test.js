import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../components/Usercard";


const mockUser = {
  id: 1,
  name: "Ritika",
  email: "ritika@gmail.com",
  createdAt: new Date().toISOString(),
};


const mockDelete = jest.fn();
const mockEdit = jest.fn();

test("renders user name", () => {
  render(
    <UserCard
      user={mockUser}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.getByText("Ritika")).toBeInTheDocument();
});


test("renders user email", () => {
  render(
    <UserCard
      user={mockUser}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  expect(screen.getByText("ritika@gmail.com")).toBeInTheDocument();
});


test("shows confirmation when delete clicked", () => {
  render(
    <UserCard
      user={mockUser}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
  fireEvent.click(screen.getByText("🗑️ Delete"));
  expect(screen.getByText("Yes, Delete")).toBeInTheDocument();
});