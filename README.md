Para rodar a aplicação, precisaremos ter os 3 servidores rodando: o backend com as apis, o servidor de autenticação e a aplicação em reactJS.

Para rodar os servidores, primeiro precisamos abrir 3 terminais: um dentro da pasta app-api, um dentro da pasta auth e outro dentro de app-front.

Para os terminais em app-api e auth, basta apenas um 'npm install' e um 'npm start' para funcionarem. Lembrando que, para que o backend consiga funcionar, é necessário rodar o script em sql chamado 'bdd.sql' e configurar o arquivo variaveis.env dentro de app-api.

Para o terminal em app-front, antes de mais nada, é necessário adicionar o comando '$env:PORT=3001' para que o servidor de front-end rode na porta 3001 e não haja problemas com o servidor de back-end. Após isso, basta rodar 'npm install --force' e 'npm start' para que a aplicação em reactJS possa rodar.

Tendo os 3 servidores rodando, juntamente com o bdd em mysql, a aplicação deve funcionar perfeitamente.
