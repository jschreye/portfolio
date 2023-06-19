/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   put_tiles_png.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/22 13:27:33 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/03 09:15:08 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "so_long.h"
#include "mlx/mlx.h"

void	ft_put_img_png_right(t_data *img)
{
	img->relative_path = "img/png_right.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_img_png_left(t_data *img)
{
	img->relative_path = "img/png_left.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_img_png_up(t_data *img)
{
	img->relative_path = "img/png_dos.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_img_png_down(t_data *img)
{
	img->relative_path = "img/png_face.xpm";
	ft_put_img(img);
	mlx_put_image_to_window(img->mlx, img->mlx_win, img->img, img->x, img->y);
}

void	ft_put_img_png(t_data *img)
{
	ft_put_img_png_right(img);
	if (img->keycode_value == 0 || img->keycode_value == 123)
		ft_put_img_png_left(img);
	if (img->keycode_value == 2 || img->keycode_value == 124)
		ft_put_img_png_right(img);
	if (img->keycode_value == 13 || img->keycode_value == 126)
		ft_put_img_png_up(img);
	if (img->keycode_value == 1 || img->keycode_value == 125)
		ft_put_img_png_down(img);
}
