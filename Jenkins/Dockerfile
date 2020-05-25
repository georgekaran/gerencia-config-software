FROM jenkins/jenkins

USER root

RUN mkdir /var/log/jenkins

RUN mkdir /var/cache/jenkins

RUN chown -R jenkins:jenkins /var/log/jenkins

RUN chown -R jenkins:jenkins /var/cache/jenkins

# INSTALL POSTGRES

RUN apt update

RUN apt install postgresql postgresql-contrib

COPY ./postgres/pg_hba.conf /etc/postgresql/9.6/main/pg_hba.conf

RUN service postgresql restart

USER postgres

RUN psql -Upostgres -c "ALTER USER postgres WITH PASSWORD 'new_password';"

RUN psql -Upostgres -c "CREATE DATABASE IF NOT EXISTS agi_test;"

# END POSTGRES

USER jenkins

ENV JAVA_OPTS="-Xmx8192m"

ENV JENKINS_OPTS="--handlerCountMax=300 --webroot=/var/cache/jenkins/war"

# TO RUN
# docker run -p 8080:8080 --name=jenkins -v /home/george/Jenkins/log:/var/log/jenkins -v /home/george/Jenkins/data:/var/jenkins_home -d gcs_jenkins