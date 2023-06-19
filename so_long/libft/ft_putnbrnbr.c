/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbrnbr.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/12/22 09:56:03 by jschreye          #+#    #+#             */
/*   Updated: 2022/01/03 14:13:10 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

static char	ft_putchar(char c)
{
	write(1, &c, 1);
	return (c);
}

void	ft_putnbrnbr(int nb)
{
	if (nb == -2147483648)
		write(1, "-2147483648", 11);
	if (nb < 0)
	{	
		nb = -nb;
		ft_putchar('-');
	}
	if (nb >= 10)
	{
		ft_putnbrnbr(nb / 10);
		ft_putnbrnbr(nb % 10);
	}
	else
		ft_putchar(nb + '0');
}
