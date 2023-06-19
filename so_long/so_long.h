/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   so_long.h                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/15 09:29:41 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/03 09:03:40 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef SO_LONG_H
# define SO_LONG_H
# include "mlx/mlx.h"
# include "printf/ft_printf.h"
# include <stdio.h>
# include <fcntl.h>
# include "gnlstruc/get_next_line.h"
# include "libft/libft.h"

typedef struct s_data {
	void		*img;
	void		*mlx;
	void		*mlx_win;
	char		*relative_path;
	char		**array;
	int			monster_j;
	int			monster_i;
	int			keycode_value;
	int			player_i;
	int			player_j;
	int			count_p;
	int			count_e;
	int			count_c;
	int			count_m;
	int			count_move;
	int			i;
	int			j;
	int			size_j;
	int			size_i;
	int			fd;
	int			x;
	int			y;
	int			coins;
}				t_data;

void	my_mlx_pixel_put(t_data *data, int x, int y, int color);
void	ft_put_img(t_data *img);
void	ft_move_player_up(t_data *img);
void	ft_move_player_down(t_data *img);
void	ft_move_player_right(t_data *img);
void	ft_move_player_left(t_data *img);
void	ft_change_map_with_img(t_data *img);
void	ft_get_array_with_ber(t_data *img);
void	ft_put_img_wall(t_data *img);
void	ft_put_img_ground(t_data *img);
void	ft_put_img_png(t_data *img);
void	ft_put_tilesets(t_data *img);
void	ft_check_value_array(t_data *img);
void	ft_check_error(char *argv, t_data *img);
void	ft_check_items_in_map(t_data *img);
void	ft_count_items(char c, t_data *img);
void	ft_print_count(t_data *img);
void	ft_put_tiles_coins(t_data *img);
void	ft_put_tiles_exit(t_data *img);
void	ft_put_tiles_exit_two(t_data *img);
void	ft_put_tiles_monster(t_data *img);
void	ft_move_monster_down(t_data *img);
void	ft_move_monster_up(t_data *img);
void	ft_move_monster_right(t_data *img);
void	ft_move_monster_left(t_data *img);
void	ft_put_monster(t_data *img);
int		ft_check_key(int keycode, t_data *img);

#endif
