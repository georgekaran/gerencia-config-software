FROM jenkins/jenkins:slim

USER root

RUN mkdir /var/log/jenkins

RUN mkdir /var/cache/jenkins

RUN chown -R jenkins:jenkins /var/log/jenkins

RUN chown -R jenkins:jenkins /var/cache/jenkins

RUN apt update -y && \
    apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates software-properties-common gnupg-agent iptables  && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt -y install nodejs

RUN curl https://download.docker.com/linux/debian/dists/buster/pool/stable/amd64/containerd.io_1.2.6-3_amd64.deb --output containerd.io_1.2.6-3_amd64.deb && \
    curl https://download.docker.com/linux/debian/dists/buster/pool/stable/amd64/docker-ce-cli_19.03.9~3-0~debian-buster_amd64.deb --output docker-ce-cli_19.03.9~3-0~debian-buster_amd64.deb && \
    curl https://download.docker.com/linux/debian/dists/buster/pool/stable/amd64/docker-ce_19.03.9~3-0~debian-buster_amd64.deb --output docker-ce_19.03.9~3-0~debian-buster_amd64.deb && \
    dpkg -i containerd.io_1.2.6-3_amd64.deb && \
    dpkg -i docker-ce-cli_19.03.9~3-0~debian-buster_amd64.deb && \
    dpkg -i docker-ce_19.03.9~3-0~debian-buster_amd64.deb

RUN usermod -aG docker jenkins

RUN service docker start

USER jenkins

ENV JAVA_OPTS="-Xmx8192m"

ENV JENKINS_OPTS="--handlerCountMax=300 --webroot=/var/cache/jenkins/war"

# TO RUN
# docker run -p 8080:8080 --name=jenkins -v /home/george/Jenkins/log:/var/log/jenkins -v /home/george/Jenkins/data:/var/jenkins_home -d gcs_jenkins