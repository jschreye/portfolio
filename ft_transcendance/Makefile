# COLORS
GREEN		= \033[1;32m
RED 		= \033[1;31m
ORANGE		= \033[1;33m
CYAN		= \033[1;36m
RESET		= \033[0m

# FOLDER
SRCS_DIR	= ./srcs/
DOCKER_DIR	= ${SRCS_DIR}docker-compose.yml
NAME		= ft_jgmtrans


# COMMANDS
DOCKER		=  docker compose -f ${DOCKER_DIR} -p ${NAME}

%:
	@:

all: up

up:
	@echo "${GREEN}Building containers...${RESET}"
	@${DOCKER} up -d

build:
	@echo "${GREEN}Building containers...${RESET}"
	@${DOCKER} up -d --build

down:
	@echo "${GREEN}Stopping containers...${RESET}"
	@${DOCKER} down

stop:
	@echo "${GREEN}Stopping containers...${RESET}"
	@${DOCKER} stop

start:
	@echo "${GREEN}Starting containers...${RESET}"
	@${DOCKER} start

restart:
	@echo "${GREEN}Restarting containers...${RESET}"
	@${DOCKER} restart

logs:
	@echo "${GREEN}Displaying logs...${RESET}"
	@${DOCKER} logs -f

rebuild: down delete
	@echo "${GREEN}Rebuilding containers...${RESET}"
	@${DOCKER} up -d --build --force-recreate

delete:
	@echo "${GREEN}Deleting containers...${RESET}"
	@${DOCKER} down --volumes --remove-orphans
	docker system prune --volumes --force --all

.PHONY: all up build down stop start restart logs rebuild delete