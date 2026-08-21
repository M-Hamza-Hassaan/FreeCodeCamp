let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const priceDisplay = document.getElementById("price-display");

// Currency values in cents.
// Highest to lowest order.
const currencyUnits = [
  ["ONE HUNDRED", 10000],
  ["TWENTY", 2000],
  ["TEN", 1000],
  ["FIVE", 500],
  ["ONE", 100],
  ["QUARTER", 25],
  ["DIME", 10],
  ["NICKEL", 5],
  ["PENNY", 1]
];

function formatMoney(cents) {
  return Number((cents / 100).toFixed(2));
}

purchaseBtn.addEventListener("click", () => {
  const cash = Number(cashInput.value);

  // Update display so it reflects the current test price.
  priceDisplay.textContent = `$${price.toFixed(2)}`;

  // Convert everything to cents.
  const priceInCents = Math.round(price * 100);
  const cashInCents = Math.round(cash * 100);

  // Customer has insufficient money.
  if (cashInCents < priceInCents) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  // Exact payment.
  if (cashInCents === priceInCents) {
    changeDue.textContent =
      "No change due - customer paid with exact cash";
    return;
  }

  // Calculate change required.
  let remainingChange = cashInCents - priceInCents;

  // Convert cid values to cents.
  const drawer = cid.map(([name, amount]) => [
    name,
    Math.round(amount * 100)
  ]);

  // Calculate total cash in drawer.
  let totalCashInDrawer = 0;

  for (const [, amount] of drawer) {
    totalCashInDrawer += amount;
  }

  // Not enough money in total.
  if (totalCashInDrawer < remainingChange) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const change = [];

  // Work from largest denomination to smallest.
  for (const [unitName, unitValue] of currencyUnits) {
    let availableAmount = 0;

    // Find this denomination in cid.
    for (const [name, amount] of drawer) {
      if (name === unitName) {
        availableAmount = amount;
        break;
      }
    }

    let amountUsed = 0;

    // Use as much of this denomination as possible.
    while (
      remainingChange >= unitValue &&
      availableAmount >= unitValue
    ) {
      remainingChange -= unitValue;
      availableAmount -= unitValue;
      amountUsed += unitValue;
    }

    // Add denomination only if it was used.
    if (amountUsed > 0) {
      change.push([unitName, amountUsed]);
    }
  }

  // Exact change could not be created.
  if (remainingChange > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Build the change string.
  const formattedChange = change
    .map(([name, amount]) => {
      return `${name}: $${formatMoney(amount)}`;
    })
    .join(" ");

  // If all money in the drawer was used.
  if (totalCashInDrawer === cashInCents - priceInCents) {
    changeDue.textContent = `Status: CLOSED ${formattedChange}`;
  } else {
    changeDue.textContent = `Status: OPEN ${formattedChange}`;
  }
});