const dummyProducts = [];

for (let i = 1; i <= 100; i++) {
  dummyProducts.push({
    id: i,
    name: `Product ${i}`,
    description: `This is the ${i}${getOrdinalSuffix(i)} product`,
    image: `product${i}.jpg`,
    price: getRandomPrice(10, 100),
  });
}

function getOrdinalSuffix(number) {
  const j = number % 10;
  const k = number % 100;

  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
}

function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export default dummyProducts;
