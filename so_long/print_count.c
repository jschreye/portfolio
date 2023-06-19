/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_count.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/03/01 09:57:36 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 15:33:47 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "so_long.h"

void	ft_print_count(t_data *img)
{
	char	*count;
	char	*str;
	char	*dst;

	str = "move = ";
	count = ft_itoa(img->count_move);
	dst = ft_strjoin(str, count);
	mlx_string_put(img->mlx, img->mlx_win, 10, 15, 0x0000ff, dst);
	free(dst);
	free(count);
}
