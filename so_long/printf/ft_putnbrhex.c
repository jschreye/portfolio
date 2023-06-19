/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbrhex.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/15 10:57:13 by jschreye          #+#    #+#             */
/*   Updated: 2021/12/06 16:51:24 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

int	ft_putnbrhex(unsigned int nb, char *base, int c)
{
	if (nb >= 16)
	{
		c = ft_putnbrhex(nb / 16, base, c + 1);
		ft_putchar(base[nb % 16], 0);
	}
	else
		c = ft_putchar(base[nb], c);
	return (c);
}
