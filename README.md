# Projeto Roleta com Django
## Visão Geral
Este projeto foi desenvolvido como parte da disciplina de Engenharia de Software no curso de Ciência da Computação. O objetivo é criar um jogo de roleta com páginas de login, cadastro, tela inicial e a página do jogo. Na página do jogo, os jogadores têm acesso à roleta, tabela, fichas e saldo. As movimentações são realizadas no backend, garantindo maior segurança mesmo que o jogo utilize dinheiro fictício. Cada novo usuário registrado inicia com um saldo de 1000 na carteira (wallet).

Além disso, incluímos uma brincadeira com nosso coordenador: gifs dele são exibidos quando o jogador vence ou perde, tornando o jogo mais divertido e personalizado.

*********
## Sumário
1. [Requisitos do Sistema](#requisitos-do-sistema)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Uso](#uso)
5. [Estrutura de Diretórios](#estrutura-de-diretórios)
6. [Licença](#licença)
7. [Contribuição](#contribuição)

********

## Requisitos do Sistema
*  Python 3.x
*  Django 5.0
*  Outros pacotes listados no arquivo .gitlab-ci.yml e requirements.txt

## Instalação
Clone o repositório do projeto:

`git clone <URL_DO_REPOSITORIO>`
`cd <NOME_DO_REPOSITORIO>` <br>
Crie um ambiente virtual e ative-o:
`python -m venv venv`
`source venv/bin/activate`

No Windows use `venv\Scripts\activate`

Instale as dependências:

`pip install -r requirements.txt`


## Configuração
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
```
SECRET_KEY='sua-chave-secreta-aqui'
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CSRF_TRUSTED_ORIGINS=http://localhost,http://127.0.0.1
```
Configure o banco de dados no arquivo settings.py se necessário.

## Uso
Execute as migrações:

`python manage.py makemigrations`<br>
`python manage.py migrate`<br>
Crie um superusuário para acessar a interface de administração:

`python manage.py createsuperuser`<br>
Inicie o servidor de desenvolvimento:

`python manage.py runserver`<br>
Abra o navegador e vá para a URL exibida no terminal (geralmente http://127.0.0.1:8000/).

## Estrutura de Diretórios
- ROLETA/<br>
	- __pycache__/<br>
	- .pytest_cache/<br>
	- .vscode/<br>
  -	core/<br>
    - __pycache__/<br>
	 - __init__.py<br>
	 - asgi.py<br>
	 - forms.py<br>
	 - settings.py<br>
	 - urls.py<br>
	 - wsgi.py<br>
	- htmlcov/<br>
	- lasvegas/<br>
		- __pycache__/<br>
		- migrations/<br>
		- static/<br>
		- templates/<br>
		- tests/<br>
		 - __init__.py<br>
		 - admin.py<br>
		 - apps.py<br>
		 - models.py<br>
		 - urls.py<br>
		 - views.py<br>
	- .coverage<br>
	- .env<br>
	- .gitgnore<br>
	- db.sqlite3<br>
	- Dockerfile<br>
	- entrypoint.sh<br>
	- manage.py<br>
	- README.md<br>
	- roleta.py<br>
	teste.py<br>


## Tecnologias Utilizadas
* Linguagem de Programação: Python 3.x
* Framework Web: Django 5.0
* Banco de Dados: SQLite (padrão)
* Controle de Versão: Git
* Integração Contínua: GitLab CI
* Containerização: Docker
* Testes: Coverage e unittest
* Outras Bibliotecas:
   * dj-database-url
   * python-decouple
   * Django humanize

## Licença
Este projeto não possui uma licença definida.

## Contribuição
Este projeto foi desenvolvido por um grupo de estudantes do segundo ano e pode não seguir as melhores práticas de código e organização. Contribuições são bem-vindas para melhorar o projeto.