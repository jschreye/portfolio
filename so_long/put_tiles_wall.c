/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   put_tiles_wall.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/03/01 13:43:46 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 15:46:16 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "so_long.h"

void	ft_put_tiles_wall_border(t_data *img)
{
	img->relative_path = "img/mur.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_tiles_wall_interior(t_data *img)
{
	img->relative_path = "img/arbre_herbe.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_img_wall(t_data *img)
{
	if (img->j == img->size_i - 1 || img->j == 0)
		ft_put_tiles_wall_border(img);
	else if (img->i == img->size_j - 1 || img->i == 0)
		ft_put_tiles_wall_border(img);
	else
		ft_put_tiles_wall_interior(img);
}
