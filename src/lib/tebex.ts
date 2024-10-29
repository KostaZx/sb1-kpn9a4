import { TebexHeadless } from 'tebex_headless';
import { env } from '../config';

export const tebex = new TebexHeadless(env.TEBEX_WEBSTORE_ID);