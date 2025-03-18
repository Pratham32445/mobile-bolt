FROM codercom/code-server:4.96.4

USER root

RUN apt-get update \
    && apt-get install curl -y \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8080
  
RUN mkdir /project


CMD [ "code-server","--auth","none","--bind-addr","0.0.0.0:8080","/project"]

