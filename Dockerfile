FROM python:3.12
COPY . /opt/roleta
WORKDIR /opt/roleta
EXPOSE 8080
RUN pip install django==5
RUN pip install Pillow
CMD ["python","manage.py", "runserver", "0.0.0.0:8080"]