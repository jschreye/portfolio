/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   put_tiles_monster.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/03/02 11:58:38 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 15:43:11 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "so_long.h"

void	ft_put_monster_down(t_data *img)
{
	img->relative_path = "img/monstre_face.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_monster_up(t_data *img)
{
	img->relative_path = "img/monstre_dos.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_monster(t_data *img)
{
	ft_put_monster_down(img);
	if (img->keycode_value == 13 || img->keycode_value == 126)
		ft_put_monster_down(img);
	if (img->keycode_value == 1 || img->keycode_value == 125)
		ft_put_monster_up(img);
}
