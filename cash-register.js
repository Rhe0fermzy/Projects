function checkCashRegister(price, cash, cid) {
  // Convert the currency units to a simpler form (in cents)
  const currencyUnits = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  // Calculate change due
  let changeDue = cash - price;
  let totalCid = 0;
  let change = [];

  // Calculate the total cash-in-drawer
  for (let i = 0; i < cid.length; i++) {
    totalCid += cid[i][1];
  }

  totalCid = totalCid.toFixed(2); // Convert to fixed-point notation

  // Check if the cash-in-drawer is less than the change due
  if (parseFloat(totalCid) < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // Check if the cash-in-drawer is exactly equal to the change due
  if (parseFloat(totalCid) === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  // Calculate the change to be returned
  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    let coinName = currencyUnits[i][0];
    let coinValue = currencyUnits[i][1];
    let coinAvailable = cid[i][1];
    let coinChange = 0;

    while (changeDue >= coinValue && coinAvailable > 0) {
      changeDue -= coinValue;
      coinAvailable -= coinValue;
      changeDue = changeDue.toFixed(2);
      coinChange += coinValue;
    }

    if (coinChange > 0) {
      change.push([coinName, coinChange]);
    }
  }

  // Check if the changeDue is zero after calculating the change
  if (parseFloat(changeDue) > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: change };
}

// Example tests
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
