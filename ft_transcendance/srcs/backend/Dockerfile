FROM node:18-alpine3.16

RUN apk update && apk upgrade \
    && apk add --no-cache --quiet --update \
    	  vim curl bash zsh git

COPY start.sh /

WORKDIR /app

COPY ./package.json ./package-lock.json ./ 

RUN npm install

COPY  . ./

CMD ["sh", "/start.sh"]

