/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   move_monster.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/03/02 11:57:09 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 15:20:07 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "so_long.h"

void	ft_move_monster_down(t_data *img)
{
	img->x = 0;
	img->y = 0;
	img->array[img->monster_j + 1][img->monster_i] = 'M';
	img->array[img->monster_j][img->monster_i] = '0';
}

void	ft_move_monster_up(t_data *img)
{
	img->x = 0;
	img->y = 0;
	img->array[img->monster_j - 1][img->monster_i] = 'M';
	img->array[img->monster_j][img->monster_i] = '0';
}

void	ft_move_monster_right(t_data *img)
{
	img->x = 0;
	img->y = 0;
	img->array[img->monster_j][img->monster_i + 1] = 'M';
	img->array[img->monster_j][img->monster_i] = '0';
}

void	ft_move_monster_left(t_data *img)
{
	img->x = 0;
	img->y = 0;
	img->array[img->monster_j][img->monster_i - 1] = 'M';
	img->array[img->monster_j][img->monster_i] = '0';
}
