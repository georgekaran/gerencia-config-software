# AGI - gerencia-config-software
Repositório criado para aula de Gerência de configuração de software.

## Como levantar a aplicação?
### Executando o backend

<p style="color: orangered; font-weight: bold">Atenção</p>

**Criar as databases: "agi" e "agi_dev"**

Entrar na pasta do backend no terminal:
```
cd backend/
```
E depois executar (LINUX):
```
./mvnw spring-boot:run -P prod
OU
./mvnw spring-boot:run -P dev
```
Ou (WINDOWS):
```
“C:\CAMINHO_ATE_A_PASTA\mvnw.cmd spring-boot:run -P prod” 
OU
“C:\CAMINHO_ATE_A_PASTA\mvnw.cmd spring-boot:run -P dev” 
```

### Executando o Front (App)
Instalar depencias Front:
```
cd app/ && npm i
```
Executar Front:
```
cd app/ && npm run start
