/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_pointeur.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/16 10:14:47 by jschreye          #+#    #+#             */
/*   Updated: 2021/12/01 14:53:23 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

int	ft_putnbrhextwo(unsigned long nb, char *base, int c)
{
	if (nb >= 16)
	{
		c = ft_putnbrhextwo(nb / 16, base, c + 1);
		ft_putchar(base[nb % 16], 0);
	}
	else
		c = ft_putchar(base[nb], c);
	return (c);
}

int	ft_putnbrpointeur(void *str, char *base, int c)
{
	write(1, "0x", 2);
	c += 2;
	c = ft_putnbrhextwo((unsigned long)str, base, c);
	return (c);
}
