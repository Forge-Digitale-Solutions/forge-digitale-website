import * as migration_20260928_204014_posts_seo from './20260928_204014_posts_seo';
import * as migration_20261013_120000_media_credit from './20261013_120000_media_credit';
import * as migration_20261013_160000_newsletter_issues from './20261013_160000_newsletter_issues';

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
  {
    up: migration_20261013_160000_newsletter_issues.up,
    down: migration_20261013_160000_newsletter_issues.down,
    name: '20261013_160000_newsletter_issues',
  },
];
