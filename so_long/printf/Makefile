CC = gcc
CFLAGS = -Wall -Werror -Wextra
NAME = libftprintf.a
SRC = ft_printf.c ft_putnbr.c ft_putnbrhex.c ft_putstr.c ft_putnbrnbr.c ft_pointeur.c
OBJ = $(SRC:.c=.o)

all: $(NAME)

%.o : %.c
	$(CC) $(CFLAGS) -o $@ -c $<

$(NAME) : $(OBJ)
	ar rsc $(NAME) $(OBJ)

clean:
	rm -f $(OBJ)

fclean: clean
	rm -f $(NAME)

re: fclean all

.PHONY: all clean fclean re
