

# Installation:
The provided instructions are for installing and using a tool called `create-react-component-cli` to generate React components. Here's a breakdown of the installation and usage instructions:

Global Installation (Recommended): To install the tool globally, run the following command:
```bash
npm install -g @rihan.taher/create-react-component-cli
```
Development Dependency Installation: Alternatively, you can install it as a development dependency by running:
```bash
npm install --save-dev @rihan.taher/create-react-component-cli
```

# Create React Component
Once the tool is installed, you can create a React component by using the `npx component` command followed by the desired component path and name. For example:
```bash
npx component src/components/header
```

By default it will create a jsx component, a css module file

Additional Flags: There are a few flags you can use to customize the generated component:

-   `-jsx` or `-tsx`: Specify the file format for the component (JSX or TypeScript with JSX).
-   `-cssm`: Create a CSS module file for the component.
-   `-test`: Generate a test file for the component.

Changing Default Settings: If you want to change the default settings, you can use the `npx component set` command followed by the desired flag and value. For example:
```bash
 npx component set -cssm=false
 ```
Allowed settings are:

-   `-test=(true/false)`: Toggle test file generation.
-   `-cssm=(true/false)`: Toggle CSS module file generation.
-   `-format=(jsx/tsx)`: Set the default file format for components (JSX or TypeScript with JSX).