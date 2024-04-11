FROM python:3.12
COPY . /opt/roleta
WORKDIR /opt/roleta
EXPOSE 8080
RUN pip install django==5 dj-database-url psycopg2-binary python-decouple
CMD ["python","manage.py", "runserver", "0.0.0.0:8080"]