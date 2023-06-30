import jwt from 'jsonwebtoken';

function generateToken(payload: any) {
  // Gerar o token JWT com base no payload fornecido e na chave secreta definida no ambiente
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

export { generateToken };
