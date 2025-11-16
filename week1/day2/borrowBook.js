// function borrowBook(bookTitle, availableBooks) {
//   const index = availableBooks.indexOf(bookTitle);

//   if (index !== -1) {
//     availableBooks.splice(index, 1); 
//     return `You have borrowed '${bookTitle}'.`;
//   } else {
//     return `Sorry, '${bookTitle}' is not available.`;
//   }
// }

// module.exports = borrowBook;

function borrowBook(bookTitle, availableBooks) {
  if (!availableBooks.includes(bookTitle)) {
    return `Sorry, '${bookTitle}' is not available.`;
  }

  availableBooks.splice(availableBooks.indexOf(bookTitle), 1);
  return `You have borrowed '${bookTitle}'.`;
}

module.exports = borrowBook;
