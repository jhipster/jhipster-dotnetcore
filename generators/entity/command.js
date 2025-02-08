import { asCommand } from 'generator-jhipster';
import { command as entityCommand } from 'generator-jhipster/generators/entity';

export default asCommand({
  ...entityCommand,
});
