import { asCommand } from 'generator-jhipster';

export default asCommand({
  options: {},
  arguments: [
    {
      name: 'ciType',
      required: false,
      description: 'The CI/CD type to generate',
      type: String,
    },
  ],
});
