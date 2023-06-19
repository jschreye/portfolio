/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putstr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/15 08:58:39 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/01 09:08:14 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

int	ft_putchar(char c, int i)
{
	write (1, &c, 1);
	i++;
	return (i);
}

int	ft_put_str(char *str, int c)
{
	int	i;

	i = 0;
	if (!str)
	{
		write (1, "(null)", 6);
		return (c + 6);
	}
	while (str[i])
	{	
		ft_putchar(str[i], 0);
		i++;
	}
	return (c + i);
}
