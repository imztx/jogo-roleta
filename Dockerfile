FROM python:3.12
COPY . /opt/roleta
WORKDIR /opt/roleta
EXPOSE 8080
RUN pip install django==5 dj-database-url psycopg2-binary python-decouple
RUN chmod +x /opt/roleta/entrypoint.sh
ENTRYPOINT ["/opt/roleta/entrypoint.sh"]
CMD ["python","manage.py", "runserver", "0.0.0.0:8080"]