function rot13(str) {
  return str.replace(/[A-Z]/g, function(char) {
    const code = char.charCodeAt(0);
    // Apply ROT13 shift
    return String.fromCharCode(((code - 65 + 13) % 26) + 65);
  });
}

// Test cases
console.log(rot13("SERR PBQR PNZC")); // "FREE CODE CAMP"
console.log(rot13("SERR CVMMN!"));    // "FREE PIZZA!"
console.log(rot13("SERR YBIR?"));     // "FREE LOVE?"
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")); // "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
