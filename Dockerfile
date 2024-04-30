FROM python:3.12
COPY . /opt/roleta
WORKDIR /opt/roleta
EXPOSE 8080
ENV POETRY_VIRTUALENVS_PATH=.venv
RUN pip install poetry && poetry install
RUN chmod +x /opt/roleta/entrypoint.sh
ENTRYPOINT ["/opt/roleta/entrypoint.sh"]
CMD ["python","manage.py", "runserver", "0.0.0.0:8080"]