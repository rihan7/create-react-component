
# Create React Component

command: npx component path(with component name)

example: npx component src/components/header

By default it will create a jsx component, a css module file

allow flag: 

    -jsx/-tsx: create react/typescript-react component
    -cssm: css file will be module
    -test: for create with test file

To change default setting:
    npx component set -flag=value

example: npx component set -cssm=false

    -test=(true/false)
    -cssm=(true/false)
    -format=(jsx/tsx)






