# 2. Troca de framework Express para Nest.js

Date: 2023-05-14

## Status

Aceito

## Context

Ao observar o código-fonte original do lado do servidor, foi possível observar a utilização do Express para controle de rotas e execução dos casos de uso. Além disso, a utilização do Domain Driven Design foi aceita, tornando necessária a utilização de um framework com capacidade de lidar com comandos e eventos e que possua compatibilidade com o ORM de nossa escolha.

## Decision

Para o back-end, decidimos por utilizar o Nest.js como framework do servidor. Um dos integrantes do grupo, mais familiarizado com ele, listou os pontos positivos e negativos relacionados a troca e, de maneira unânime, foi acordada a utilização do mesmo.

## Consequences

Positivos:
- Injeção de dependência: o Nest.js, baseado no Angular, respeita os princípios SOLID de desenvolvimento e, para isso, permite a utilização de interfaces para as camadas mais internas da aplicação, aliada a injeção dos métodos por meio de marcadores;
- Middlewares: em caso de necessidade de inserir informações no payload da requisição, a utilização de middlewares é bastante facilitada dentro do Nest.js;
- Eventos: com o Domain Driven Design, utilizamos o conceito de eventos (resultados de comandos executados por um usuário) para armazenar informações em log no banco de dados e execução automática de outros comandos por meio de handlers. 

Negativos:
- Mais verboso: o Nest.js trabalha muito com marcadores para os métodos, o que exige maior cautela e tempo;
- Mais complexo: o trabalho com o Nest.js costuma ser mais complexo, vista as diversas questões como injeção de dependências, middlewares, interceptors, entre outros.
