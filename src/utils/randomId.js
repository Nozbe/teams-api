// Only numers and letters for human friendliness
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const alphabetLength = alphabet.length;
const idLength = 16;

// Note: for explanation of generating record IDs on the client side, see:
// https://github.com/Nozbe/WatermelonDB/issues/5#issuecomment-442046292
const randomId = () => {
  let id = "";
  for (let i = 0; i < idLength / 2; i += 1) {
    const random = Math.floor(Math.random() * alphabetLength * alphabetLength);
    id += alphabet[Math.floor(random / alphabetLength)];
    id += alphabet[random % alphabetLength];
  }

  return id;
};

exports = module.exports = randomId;
