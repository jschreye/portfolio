FROM node:18-alpine

# Install dependencies
RUN apk update && apk upgrade \
    && apk add --no-cache --quiet --update \
    	   vim curl bash zsh git

# Set the working directory to /app
WORKDIR /app

# install dependencies
COPY ./package.json ./package-lock.json ./


RUN npm install --no-cache


# Expose the port the application will be running on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "build"]	
