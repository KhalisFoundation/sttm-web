
import { SOURCES } from '@sttm/banidb';

export const getSource = req => SOURCES[req.query.source || 'G'];