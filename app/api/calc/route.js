import { NextResponse } from "next/server";

export async function POST(req) {
  const { a, b, operator } = await req.json();

  if (typeof a !== "number" || typeof b !== "number") {
    return NextResponse.json({ message: "a and b must be numbers" }, { status: 400 });
  }

  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        return NextResponse.json({ message: "Division by zero is not allowed" }, { status: 400 });
      }
      result = a / b;
      break;
    default:
      return NextResponse.json({ message: "Invalid operator. Use +, -, *, /" }, { status: 400 });
  }

  return NextResponse.json({ result });
}