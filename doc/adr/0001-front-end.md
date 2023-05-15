# 1. Migração da arquitetura front-end para Clean Architecture utilizando TypeScript

Date: 2023-05-14

## Status

Aceito

## Context

Atualmente, o front-end da aplicação possui dependências dentro dos diversos casos de uso da aplicação (requisições POST/GET etc.) com a ferramenta atual Axios. No caso de uma necessidade futura de troca dessa ferramenta, muitos arquivos teriam de ser modificados, gerando duplicidade de código e, muito provavelmente, bugs. Junto a isso, foi observada a utilização do JavaScript dentro do React, o que torna a modularização muito trabalhosa. Com isso em mente, foi discutida a implementação algum padrão de arquitetura voltado para o front-end utilizando o TypeScript.

## Decision

Para maior padronização da aplicação como um todo, decidimos por implementar a Clean Architecture também no front-end, visto que, inicialmente, foi discutida, e aceita, a migração de arquitetura da aplicação server-side para a mesma.

## Consequences

Positivos:
- Maior modularização: assim como no back-end, a modularização permite dividir melhor as responsabilidades de cada módulo, tornando a dependência entre elas menor.
- Baixo acoplamento: a manutenção do código se torna mais simples, tornando trocas de ferramentas, como o Axios, mais rápida e com menos risco de gerar bugs;
- Tipagem das variáveis: com a modularização, saber o tipo de cada variável e o retorno de cada método torna o desenvolvimento menos propenso a criar erros.

Negativos:
- Maior curva de aprendizado: assim como no back-end, haverá um impacto inicial dos integrantes para com a eficiência do desenvolvimento;
- Desenvolvimento inicial mais complexo: o desenvolvimento acaba se tornando mais lento, visto que é preciso garantir a separação de responsabilidades e modularização do projeto;
