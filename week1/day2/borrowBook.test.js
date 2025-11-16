const borrowBook = require("./borrowBook");

describe("borrowBook()", () => {
  test("book is available", () => {
    const availableBooks = [
      "A Doll's House",
      "King Richard the Third",
      "Animal Farm",
    ];
    const message = borrowBook("King Richard the Third", availableBooks);

    expect(message).toBe("You have borrowed 'King Richard the Third'.");
    expect(availableBooks).toEqual(["A Doll's House", "Animal Farm"]);
  });

  test("sorry book is not available", () => {
    const availableBooks = ["A Doll's House", "Animal Farm"];
    const message = borrowBook("The Great Gatsby", availableBooks);

    expect(message).toBe("Sorry, 'The Great Gatsby' is not available.");
    expect(availableBooks).toEqual(["A Doll's House", "Animal Farm"]);
  });
});
