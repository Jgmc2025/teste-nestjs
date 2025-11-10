**Pré-requisitos para subir aplicação no docker compose:**

* O **Docker** deve estar instalado e em execução no seu dispositivo;  
* Você deve ter um arquivo chamado **docker-compose.yml** no diretório do seu projeto, definindo os serviços que deseja executar. Este é o "mapa" da sua aplicação.

**Passo a passo para subir a aplicação:**

1. Abra seu **Terminal**;  
2. Navegue até o **diretório do projeto**: entre na pasta onde o seu arquivo docker-compose.yml está localizado;  
3. Execute o comando **docker-compose up**. O que ele faz?  
* **Lê** o arquivo docker-compose.yml;  
* **Verifica** se as imagens Docker para serviços **postgres** já existem localmente;  
* **Baixa** as imagens que faltarem do Docker Hub;  
* **Constrói** imagens personalizadas;  
* **Cria** os containers, redes e volumes necessários para todos os serviços;  
* **Inicia** os containers na ordem correta, geralmente esperando que os bancos de dados iniciem antes das aplicações web.

**Rodando em background:**

Para impedir que o terminal fique preso exibindo logs, é possível rodar a aplicação em "modo destacado", utilizando a flag **\-d** e executando o comando **docker-compose up \-d**.

**Verificando o status da aplicação:**

Para certificar que o docker está rodando corretamente, use o comando **docker-compose ps** no mesmo diretório. Isso mostrará uma tabela com todos os serviços definidos no seu arquivo, o estado deles e as portas que estão usando.

**Parar e remover os containers:**

Quando terminar de usar a aplicação, você pode encerrá-la e remover tudo o que o Docker Compose criou. Para isso, é necessário digitar o comando **docker-compose down** e apertar enter para confirmar.

**Crie uma conta de parceiro:**

* Acesse **shopify.com/partners** e crie uma conta gratuita. Nesse ambiente você gerencia todos os seus apps, temas e lojas de desenvolvimento;  
* No seu **painel de parceiros**, crie uma **Loja de Desenvolvimento**. É nela que você irá testar seu app.

**Instale a Shopify CLI:**

A Shopify CLI é uma ferramenta que automatiza boa parte do processo de configuração. Para isso, é necessário ter instalado o **Node.js** e seguir as instruções oficiais para baixar a CLI no sistema, como o **npm install \-g @shopify/cli**.

**Crie a estrutura do seu App:**

Navegue até a raiz do projeto e execute o comando **npm init @shopify/app@latest.** Crie o nome do App e escolha o template (nesse caso, utilizar o **Node.js**). Por fim, execute o comando **npm run dev**, que pode:

* **Registrar o App:** Ele pergunta qual conta de parceiro e loja de desenvolvimento você quer conectar;  
* **Definir Chaves de API:** Ele cria o app automaticamente no seu Painel de Parceiro e insere a **Chave de API** e a **Chave Secreta de API** no seu projeto;  
* **Criar um Túnel:** Como seu app está rodando localmente (**localhost**), a Shopify não pode vê-lo. A CLI usa o **cloudflare** para criar um túnel público (**https**) temporário para o seu localhost;  
* **Definir URLs:** Ele informa automaticamente à Shopify qual é a URL do seu app e a URL de redirecionamento (para o processo de autenticação OAuth);  
* **Iniciar o Servidor:** Ele inicia seu servidor web local;  
* **Gerar Link de Instalação:** Ele fornece um link no terminal. Ao clicar nesse link, você inicia o processo de instalação do app na loja de desenvolvimento.

### 

### **Passo a passo para gerar e testar um pedido:**

* ### **Simular um pedido de cliente:**

#### Ativar o **"Bógus Gateway"** para simular uma transação sem usar dinheiro real:

1. No seu painel Shopify, vá para **Configurações** (no canto inferior esquerdo);  
2. Clique em **Pagamentos**;  
3. Na seção "Provedores de pagamento", clique em "**Escolher um provedor"**;  
4. Role a lista até o fim e selecione **Bogus Gateway**;  
5. Clique em **Ativar**.

#### **Fazer a compra na sua loja:**

1. Abra sua loja em outra janela para não estar logado como admin;  
2. Encontre um produto, adicione-o ao carrinho e vá para o checkout;  
3. Preencha as informações de envio e contato;  
4. Prossiga para a etapa de pagamento.

#### **Verificar o pedido:**

1. Finalize a compra na loja;  
2. Volte ao seu painel de administração da Shopify;  
3. Clique em **Pedidos** no menu esquerdo;  
4. Seu pedido de teste aparecerá no topo da lista, "pago" e pronto para ser "processado".

* ### **Criar um pedido manual:**

    
1. No seu painel Shopify, vá para **Pedidos**;  
2. Clique em **Rascunhos** (no menu da esquerda);  
3. Clique no botão **Criar pedido**;  
4. **Adicione produtos:** Procure por produtos da sua loja;  
5. **Encontre ou crie um cliente:** Adicione um cliente existente ou crie um novo;  
6. **Configure o pagamento:** Role para baixo até "Pagamento";  
7. Clique em **Salvar** para criar o rascunho. Se marcado como pago, ele se tornará um pedido completo.

**Execução da API:**

Para receber um pedido, é necessário executar o docker compose up no terminal da raiz do seu projeto. Assim, o seu Nestjs estará executando uma aplicação e se comunicando com as informações da loja na Shopify. O Ngrok foi escolhido como endpoint público para destino do webhook, então deve estar rodando simultaneamente no terminal. Aqui estão algumas imagens do projeto em funcionamento:

* Para acessar o site, é necessário entrar no link que foi criado para loja, que no meu caso foi https://joao-teste-6240.myshopify.com/

![][image1]

* Após entrar com a senha, que no meu caso foi apenas um “.” (um ponto) como teste, você poderá ver os produtos da loja e começar uma compra.

![][image2]

* Após a sessão de compra, você será direcionado para registro de dados para o pedido;


![][image3]

* Depois do preenchimento, uma mensagem de confirmação será enviada na tela e no email registrado;


![][image4]

* Assim, nesse processo, seu primeiro pedido será salvo no link [https://noncogently-noncircular-ian.ngrok-free.dev/](https://noncogently-noncircular-ian.ngrok-free.dev/) gerado pelo Ngrok;

![][image5]

* Também será possível visualizar as informações do pedido no terminal da raiz do seu projeto;

![][image6]

* Para acessar as webhooks, entre no Ngrok  após rodá-lo no terminal;

![][image7]  
![][image8]

* Por fim, você pode instalar um visualizador de banco de dados. No caso em questão, o banco indicado foi o Postgres e escolhi o DBeaver para ver os dados nas minhas tabelas de pedidos e vendas;

![][image9]  
![][image10]

Observação: podem ser criados quantos pedidos forem necessários, cada um terá um ID para diferenciá-los.
