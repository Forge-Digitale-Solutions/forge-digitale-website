import * as migration_20260928_204014_posts_seo from './20260928_204014_posts_seo';

export const migrations = [
  {
    up: migration_20260928_204014_posts_seo.up,
    down: migration_20260928_204014_posts_seo.down,
    name: '20260928_204014_posts_seo',
  },
];
