import type { NextApiRequest, NextApiResponse } from 'next';
import Config from '../../config/appconfig.json';
import type { AppConfig } from '../../types';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppConfig>
) {
    res.status(200).json(Config as AppConfig);
}
