FROM postgres:14

ENV POSTGRES_USER=pulsar_user
ENV POSTGRES_PASSWORD=pulsar_password
ENV POSTGRES_DB=pulsar_db

COPY seed.sql /docker-entrypoint-initdb.d/
