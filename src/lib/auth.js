import { SignJWT, jwtVerify } from "jose"

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET )

export async function generateToken(user) {
  return await new SignJWT({
    id: user.id,
    nama: user.username,
    role: user.role
  })
  .setProtectedHeader({alg: 'HS256'})
  .setExpirationTime('8h')
  .sign(SECRET_KEY)
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload
  } catch (err) {
    console.error(err)
    throw new Error('gAGAL')
  }
}