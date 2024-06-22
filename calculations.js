const buyers = [
  { id: 1, name: 'Juanca', total: 0 },
  { id: 2, name: 'Lili', total: 0 },
  { id: 3, name: 'Miguel', total: 0 },
];

const expenses = [
  {
    id: 1,
    buyer: buyers[0].id,
    amount: 300,
    participants: [
      {
        id: buyers[0].id,
        amount: 100,
      },
      {
        id: buyers[1].id,
        amount: 100,
      },
      {
        id: buyers[2].id,
        amount: 100,
      },
    ],
  },
  {
    id: 2,
    buyer: buyers[1].id,
    amount: 600,
    participants: [
      {
        id: buyers[1].id,
        amount: 200,
      },
      {
        id: buyers[0].id,
        amount: 200,
      },
      {
        id: buyers[2].id,
        amount: 200,
      },
    ],
  },
  {
    id: 3,
    buyer: buyers[1].id,
    amount: 900,
    participants: [
      {
        id: buyers[0].id,
        amount: 300,
      },
      {
        id: buyers[1].id,
        amount: 300,
      },
      {
        id: buyers[2].id,
        amount: 300,
      },
    ],
  },
  {
    id: 4,
    buyer: buyers[2].id,
    amount: 1200,
    participants: [
      {
        id: buyers[1].id,
        amount: 400,
      },
      {
        id: buyers[0].id,
        amount: 400,
      },
      {
        id: buyers[2].id,
        amount: 400,
      },
    ],
  },
];

// calculate net value
buyers.forEach((person) => {
  expenses.forEach((expense) => {
    if (expense.buyer === person.id) {
      person.total += expense.amount;
    }
    const data = expense.participants.find((e) => e.id === person.id);
    if (data) {
      person.total -= data.amount;
    }
  });
});

const simplify = () => {
  let debt = { id: 0, amount: 0, name: '' };
  let acre = { id: 0, amount: 0, name: '' };
  while (buyers.some((e) => e.total !== 0)) {
    buyers.forEach((person) => {
      if (person.total) {
        if (person.total < 0 && person.total < debt.amount) {
          debt.id = person.id;
          debt.amount = person.total;
          debt.name = person.name;
        }
        if (person.total > acre.amount) {
          acre.id = person.id;
          acre.amount = person.total;
          acre.name = person.name;
        }
      }
    });
    console.log(`${debt.name} debe ${acre.amount} a ${acre.name}`);
    buyers[debt.id - 1].total += acre.amount;
    buyers[acre.id - 1].total = 0;
    debt = { id: 0, amount: 0, name: '' };
    acre = { id: 0, amount: 0, name: '' };
  }
};

console.log(buyers);
simplify();
