# Banco api tests

## Descrição

### Iniciando um novo projeto em JavaScript

- Criar uma nova pasta 'banco-apa-tests', pasta vazia
- Entrar no terminal e executar o comando: npm.cmd init -y
- instalar as dependencias para o projeto comando: npm.cmd install mocha supertest chai \*
  mocha para execução dos testes, supertest é o cliente para execução da API, e o chai é a biblioteca de asserções, como não estou usando o ambiente de desenvolvimento não preciso executar o comando com o -D \*
- escrever o script para executar o teste automatizado, arquivo login.test.js
- após a instalação das dependencias executar o comando: npm.cmd install, para reiniciar o npm
- executar o alterar o script no package.json ==> antes: "scripts": {"test": "echo \"Error: no test specified\" && exit 1"}, alterar para: "test": mocha ./test/login.test.js
- precisa colocar o servidor na porta 3000 no ar
- precisa colocar o BFF na porta 4000 no ar
- executar npm test
