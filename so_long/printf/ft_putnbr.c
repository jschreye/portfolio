/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/15 09:54:35 by jschreye          #+#    #+#             */
/*   Updated: 2021/12/13 15:38:50 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

int	ft_putnbr(int nb, int c)
{
	if (nb == -2147483648)
	{
		write(1, "-2147483648", 11);
		return (c + 11);
	}
	if (nb < 0)
	{
		nb = -nb;
		c = ft_putchar('-', c);
	}
	if (nb >= 10)
	{
		c = ft_putnbr(nb / 10, c + 1);
		ft_putnbr(nb % 10, 0);
	}
	else
		c = ft_putchar(nb + '0', c);
	return (c);
}
