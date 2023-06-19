/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_array_with_ber.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/22 13:27:33 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 15:12:00 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "gnlstruc/get_next_line.h"
#include "so_long.h"
#include "mlx/mlx.h"

void	ft_check_size(t_data *img);

void	ft_get_array_with_ber(t_data *img)
{
	char	*tab;
	char	*str_full_ber;
	char	*tmp;

	img->size_j = -1;
	str_full_ber = ft_strdup("");
	while (1)
	{
		tab = get_next_line(img->fd);
		tmp = str_full_ber;
		img->size_j++;
		if (tab != NULL)
			str_full_ber = ft_strjoin(str_full_ber, tab);
		if (tab == NULL)
			break ;
		free(tmp);
		free(tab);
	}
	img->array = ft_split(str_full_ber, '\n');
	free(str_full_ber);
	ft_check_size(img);
}

void	ft_check_size(t_data *img)
{
	int	i;
	int	j;

	i = 0;
	j = 0;
	img->size_i = 0;
	while (j < img->size_j)
	{
		i = 0;
		while (img->array[j][i] != '\0')
			i++;
		j++;
	}
	img->size_i = i;
}
