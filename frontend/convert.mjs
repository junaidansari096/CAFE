import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
  
  // Extract main
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.log(`Could not find main element in ${file}`);
    return;
  }
  
  let mainContent = mainMatch[1];
  
  // Replace class= with className=
  mainContent = mainContent.replace(/class=/g, 'className=');
  // Replace for= with htmlFor=
  mainContent = mainContent.replace(/for=/g, 'htmlFor=');
  // Replace tabindex= with tabIndex=
  mainContent = mainContent.replace(/tabindex=/g, 'tabIndex=');
  // Replace style="..." with anything, preferably just drop or handle if exists, but probably no inline styles besides simple ones
  // In the generated files, there shouldn't be much inline styles, except maybe clip-path. We'll ignore for now unless an error occurs.
  
  // Self closing tags
  mainContent = mainContent.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
  mainContent = mainContent.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');
  mainContent = mainContent.replace(/<br>/g, '<br />');
  mainContent = mainContent.replace(/<hr>/g, '<hr />');

  // Some empty lines or comments
  mainContent = mainContent.replace(/<!--[\s\S]*?-->/g, '');

  const componentName = file.replace('.html', '');
  
  const jsxContent = `import React from 'react';

export default function ${componentName}() {
  return (
    <div className="relative fade-in">
      ${mainContent}
    </div>
  );
}
`;

  fs.writeFileSync(path.join(pagesDir, `${componentName}.jsx`), jsxContent);
  console.log(`Created ${componentName}.jsx`);
});
