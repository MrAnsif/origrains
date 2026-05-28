import * as migration_20260525_132615 from './20260525_132615';
import * as migration_20260527_180559 from './20260527_180559';

export const migrations = [
  {
    up: migration_20260525_132615.up,
    down: migration_20260525_132615.down,
    name: '20260525_132615',
  },
  {
    up: migration_20260527_180559.up,
    down: migration_20260527_180559.down,
    name: '20260527_180559'
  },
];
