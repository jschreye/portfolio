/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   move_player_up.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/25 09:14:43 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 16:45:33 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "so_long.h"

void	ft_player_move_up(t_data *img)
{
	img->x = 0;
	img->y = 0;
	img->array[img->player_j - 1][img->player_i] = 'P';
	img->array[img->player_j][img->player_i] = '0';
	img->count_move++;
	if (img->array[img->monster_j + 1][img->monster_i] == '0')
		ft_move_monster_down(img);
	ft_put_tilesets(img);
	ft_print_count(img);
	ft_printf("conteur de mouvement :%d\n", img->count_move);
}

void	ft_move_player_up(t_data *img)
{
	if (img->array[img->player_j - 1][img->player_i] == '0')
		ft_player_move_up(img);
	else if (img->array[img->player_j - 1][img->player_i] == 'C')
	{
		img->x = 0;
		img->y = 0;
		img->array[img->player_j - 1][img->player_i] = 'P';
		img->array[img->player_j][img->player_i] = '0';
		img->coins--;
		img->count_c--;
		img->count_move++;
		ft_put_tilesets(img);
		ft_print_count(img);
		ft_printf("conteur de mouvement :%d\n", img->count_move);
	}
	else if ((img->array[img->player_j - 1][img->player_i] == 'E'
		&& img->coins == 0)
		|| img->array[img->player_j - 1][img->player_i] == 'M')
		exit(0);
}
