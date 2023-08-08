import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';

const TEMPLATES_DIR = './templates';

export default new TwingEnvironment(
  new TwingLoaderFilesystem(TEMPLATES_DIR)
);
