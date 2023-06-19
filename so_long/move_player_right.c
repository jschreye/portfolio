/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   move_player_right.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/25 09:14:41 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 16:45:37 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "so_long.h"

void	ft_player_move_right(t_data *img)
{
	img->x = 0;
	img->y = 0;
	img->array[img->player_j][img->player_i + 1] = 'P';
	img->array[img->player_j][img->player_i] = '0';
	img->count_move++;
	if (img->array[img->monster_j][img->monster_i - 1] == '0')
		ft_move_monster_left(img);
	ft_put_tilesets(img);
	ft_print_count(img);
	ft_printf("conteur de mouvement :%d\n", img->count_move);
}

void	ft_move_player_right(t_data *img)
{
	if (img->array[img->player_j][img->player_i + 1] == '0')
		ft_player_move_right(img);
	else if (img->array[img->player_j][img->player_i + 1] == 'C')
	{
		img->x = 0;
		img->y = 0;
		img->array[img->player_j][img->player_i + 1] = 'P';
		img->array[img->player_j][img->player_i] = '0';
		img->coins--;
		img->count_c--;
		img->count_move++;
		ft_put_tilesets(img);
		ft_print_count(img);
		ft_printf("conteur de mouvement :%d\n", img->count_move);
	}
	else if ((img->array[img->player_j][img->player_i + 1] == 'E'
		&& img->coins == 0)
		|| img->array[img->player_j][img->player_i + 1] == 'M')
		exit(0);
}
