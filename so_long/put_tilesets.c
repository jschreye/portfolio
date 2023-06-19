/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   put_tilesets.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/22 13:27:33 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 15:50:57 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "mlx/mlx.h"
#include "gnlstruc/get_next_line.h"
#include "so_long.h"

void	ft_check_value_array(t_data *img)
{
	if (img->array[img->i][img->j] == 48)
		ft_put_img_ground(img);
	if (img->array[img->i][img->j] == 49)
		ft_put_img_wall(img);
	if (img->array[img->i][img->j] == 80)
		ft_put_img_png(img);
	if (img->array[img->i][img->j] == 67)
		ft_put_tiles_coins(img);
	if (img->array[img->i][img->j] == 77)
		ft_put_monster(img);
	if (img->array[img->i][img->j] == 69)
		ft_put_tiles_exit(img);
	if (img->count_c == 0 && img->array[img->i][img->j] == 69)
		ft_put_tiles_exit_two(img);
}

void	ft_check_coins_player(t_data *img)
{
	if (img->array[img->i][img->j] == 'P')
	{
		img->player_j = img->i;
		img->player_i = img->j;
	}
	if (img->array[img->i][img->j] == 'M')
	{
		img->monster_j = img->i;
		img->monster_i = img->j;
	}
	if (img->array[img->i][img->j] == 67)
		img->coins++;
}

void	ft_put_tilesets(t_data *img)
{
	img->i = 0;
	img->j = 0;
	img->coins = 0;
	while (img->i < img->size_j)
	{
		img->j = 0;
		img->x = 0;
		while (img->array[img->i][img->j] != '\0')
		{
			ft_check_value_array(img);
			ft_check_coins_player(img);
			img->x += 30;
			img->j++;
		}
		img->y += 30;
		img->i++;
	}
}
