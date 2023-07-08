import fs from 'fs/promises';

export const generateComponentCode = (componentName, module) => {
  let css = `import './${componentName}.css'`
  if (module === '.module.css') {
      css = `import style from './${componentName}.module.css'`
  }

  return `
${css}

const ${titleCase(componentName)} = () => {
    return ();
}

export default ${titleCase(componentName)};
`;
};

export const generateTypescriptCode = (componentName, module) => {
  let css = `import './${componentName}.css'`
  if (module === '.module.css') {
      css = `import style from './${componentName}.module.css'`
  }

  return `import { FC } from 'react';

${css}

const ${titleCase(componentName)}:FC = () => {

    return ();
}

export default ${titleCase(componentName)};
`;
};


function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export async function writeComponent (filename, content) {
  await fs.writeFile(filename, content)
  .catch(error => console.log(error))
}

