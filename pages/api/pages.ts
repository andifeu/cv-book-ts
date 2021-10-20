// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Config from '../../config/appconfig.json';
import type { BookPageConfig } from '../../types';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<BookPageConfig[]>
) {
    res.status(200).json(Config.pages);
}
