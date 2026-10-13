import * as migration_20260928_204014_posts_seo from './20260928_204014_posts_seo';
import * as migration_20261013_120000_media_credit from './20261013_120000_media_credit';

export const migrations = [
  {
    up: migration_20260928_204014_posts_seo.up,
    down: migration_20260928_204014_posts_seo.down,
    name: '20260928_204014_posts_seo',
  },
  {
    up: migration_20261013_120000_media_credit.up,
    down: migration_20261013_120000_media_credit.down,
    name: '20261013_120000_media_credit',
  },
];
