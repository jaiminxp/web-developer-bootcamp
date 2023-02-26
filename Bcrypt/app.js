const bcrypt = require('bcrypt');

// async function hashPassword(pw) {
//   const salt = await bcrypt.genSalt(12);
//   const hash = await bcrypt.hash(pw, salt);
//   console.log('🚀 salt', salt);
//   console.log('🚀 hash', hash);
// }

async function hashPassword(pw) {
  const hash = await bcrypt.hash(pw, 12);
  console.log('🚀 hash', hash);
}

async function login(pw, hashedPw) {
  const result = bcrypt.compare(pw, hashedPw);

  if (result) {
    console.log('LOGGED IN SUCCESSFULLY!');
  } else {
    console.log('INCORRECT PASSWORD!');
  }
}

hashPassword('monkey');
login('monkey', '$2b$12$6RNrpscBnGgRfwd.nInnNODET2rrd691rfwCWgDyIETDvIlMNoIzO');
