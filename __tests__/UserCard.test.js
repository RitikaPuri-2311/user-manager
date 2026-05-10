import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../components/Usercard";

// Fake user data for testing
const mockUser = {
  id: 1,
  name: "Ritika",
  email: "ritika@gmail.com",
  createdAt: new Date().toISOString(),
};

// Fake functions
const mockDelete = jest.fn();
const mockEdit = jest.fn();

// -----------------------------------------------
// TEST 1 — Does it show the user's name?
// -----------------------------------------------
test("renders user name", () => {
  render(
    <UserCard
      user={mockUser}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );

  // Look for "Ritika" on screen
  expect(screen.getByText("Ritika")).toBeInTheDocument();
});

// -----------------------------------------------
// TEST 2 — Does it show the user's email?
// -----------------------------------------------
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

// -----------------------------------------------
// TEST 3 — Does delete button show confirmation?
// -----------------------------------------------
test("shows confirmation when delete clicked", () => {
  render(
    <UserCard
      user={mockUser}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );

  // Click delete button
  fireEvent.click(screen.getByText("🗑️ Delete"));

  // Confirmation text should appear!
  expect(screen.getByText("Yes, Delete")).toBeInTheDocument();
});