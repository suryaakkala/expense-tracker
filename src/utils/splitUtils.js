exports.calculateSplits = (amount, splitType, participants, splits) => {
  let result = {};

  if (splitType === 'EQUAL') {
    const share = amount / participants.length;
    participants.forEach(u => result[u] = share);
  }

  if (splitType === 'EXACT') {
    result = splits;
  }

  if (splitType === 'PERCENT') {
    for (let user in splits) {
      result[user] = (splits[user] / 100) * amount;
    }
  }

  return result;
};
