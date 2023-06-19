# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/02/15 09:25:41 by jschreye          #+#    #+#              #
#    Updated: 2022/03/02 13:18:30 by jschreye         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

CC = gcc

CFLAGS = -Wall -Werror -Wextra -g -fsanitize=address 

NAME = so_long

SRC = move_monster.c put_tiles_monster.c print_count.c check_items_in_map.c check_error.c move_player_left.c move_player_right.c move_player_down.c move_player_up.c check_key.c put_tiles_png.c put_tiles_exit.c put_tiles_ground.c put_tiles_coins.c put_tiles_wall.c put_tilesets.c get_array_with_ber.c put_img.c so_long.c gnlstruc/get_next_line_utils.c gnlstruc/get_next_line.c

OBJ = $(SRC:.c=.o)

all: $(NAME)

$(NAME): $(OBJ)
		make -C printf
		make -C libft
		make -C mlx
		$(CC) $(FLAGS) $(SRC) printf/libftprintf.a libft/libft.a mlx/libmlx.a -Lmlx -lmlx -framework OpenGL -framework Appkit -o $(NAME)

clean:
		make clean -C printf
		make clean -C mlx
		make clean -C libft
		rm -rf $(OBJ)

fclean: clean
		make fclean -C libft
		make fclean -C printf
		rm -rf $(NAME)

re: fclean all

.PHONY: all clean fclean re