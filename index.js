let encrypt = text => {
  const crypto = require('crypto'); 
  const GCM_IV_LENGTH = 12;
  const GCM_TAG_LENGTH_BYTES = 16;
  const GIVEN_KEY = "QOahfcdo98NLjYJuhP4-VKigx51NkUETsKlIu9uXZFY";
  const ALGO = "aes-256-gcm";

  // initialization vector
  const iv = Buffer.from(crypto.randomBytes(GCM_IV_LENGTH));

  // key decoding
  let decodedKey = Buffer.from(GIVEN_KEY, 'base64');

  // initializing the cipher 
  const cipher = crypto.createCipheriv(ALGO, decodedKey, iv, { authTagLength: GCM_TAG_LENGTH_BYTES });
  cipher.setAutoPadding(false);

  // running encryption
  const encrypted = Buffer.concat([cipher.update(text, 'utf8')]);
  cipher.final();

  // obtaining auth tag
  tag = cipher.getAuthTag();
  const finalBuffer = Buffer.concat([iv, encrypted, tag]);

  // converting string to base64
  const finalString = finalBuffer.toString('base64');

  // making the url safe
  const urlSafeString = finalString.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  return urlSafeString;
}

let queryParam = 'method=OPT_IN&format=json&password=sUx%23G6k3&phone_number=639052101379&v=1.1&auth_scheme=plain&channel=WHATSAPP';
encryptedValue = encrypt(queryParam);

console.log({ encryptedValue });