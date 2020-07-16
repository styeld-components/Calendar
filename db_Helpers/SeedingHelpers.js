const paymentType = () => {
  const types = ['cash', 'credit card', 'debit card', 'check', 'reward points', 'bitcoin', 'contact-less payment'];
  return types[Math.round((Math.random() * (types.length - 1)))];
}

const creditCardNum = () => {
  let cardNum = '';
  const randNum = () => Math.floor(Math.random() * Math.floor(9));

  while (cardNum.length < 16) {
    let num = randNum();
    cardNum += num;
  }
  return cardNum;
}

const range = (min, max) => Math.floor((Math.random() * (max - min)) + min);


module.exports = { paymentType, creditCardNum, range };