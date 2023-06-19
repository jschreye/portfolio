/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putstr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/12/22 10:12:26 by jschreye          #+#    #+#             */
/*   Updated: 2022/01/03 14:36:39 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

static char	ft_putchar(char c)
{
	write(1, &c, 1);
	return (c);
}

void	ft_putstr(char *str)
{
	int	i;

	i = 0;
	if (!str)
		write (1, "(null)", 6);
	while (str[i])
	{
		ft_putchar(str[i]);
		i++;
	}
}
