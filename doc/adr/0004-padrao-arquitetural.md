# 1. Troca de padrão arquitetural de MVC para Clean Architecture e DDD

Date: 2023-05-14

## Status

Aceito

## Context

Diante dos desafios de garantir uma maior manutenibilidade do projeto, nossa equipe tomou a decisão estratégica de migrar do padrão arquitetural MVC para outro de menor nível de acoplamento. A ideia de troca de arquitetura veio após uma análise mais aprofundada do código, observando a implementação dos comandos realizados pelo usuário e a grande interdependência que a atual estrutura da aplicação possui entre os frameworks/as ferramentas utilizadas, gerando alto impacto na manutenção do mesmo.

## Decision

Com essas observações e a experiência de um dos integrantes do grupo com Clean Architecture, aliado ao Domain Driven Design, foi decidido que esse será o padrão futuro de arquitetura para os atuais e futuros componentes da aplicação.

## Consequences

Positivos:
- Maior manutenibilidade: visto que o Clean Architecture requer uma aplicação bem modularizada e, consequentemente, com responsabilidades separadas;
- Baixo acoplamento: respeitando os princípios SOLID e tornando modificações de implementações mais fáceis.

Negativos:
- Maior curva de aprendizado: a equipe só possui um integrande familiarizado com o novo padrão, podendo tornar, inicialmente, o desenvolvimento mais lento e aumentando a carga de responsabilidade para o mesmo;
- Desenvolvimento mais complexo: mesmo com a equipe adquirindo maior familiaridade com o novo padrão, o desenvolvimento em Clean Architecture costuma ser mais lento, visto sua divisão de módulos e separação de responsabilidades.