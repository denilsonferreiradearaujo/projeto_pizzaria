import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cep } = req.query;

  if (!cep || typeof cep !== 'string') {
    return res.status(400).json({ error: 'CEP inválido' });
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();

  if (response.status === 404 || data.erro) {
    return res.status(404).json({ error: 'CEP não encontrado' });
  }

  res.status(200).json(data);
}
