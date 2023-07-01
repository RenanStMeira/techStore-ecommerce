import jwt from 'jsonwebtoken';

export function generateToken(payload: any): string {
  const token = jwt.sign(payload, process.env.JWT_PASS, { expiresIn: '1h' });
  return token;
  
}

export function verifyToken(token: string): any {
  const decoded = jwt.verify(token, process.env.JWT_PASS);
  return decoded;
}
//jwt
//Gerar o token JWT com base no ID do usuário, chave secreta do JWT definida no ambiente e opções de expiração
// const token = Jwt.sign({ id: users.id }, process.env.JWT_PASS, {expiresIn: '1h'})