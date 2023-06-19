/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbrnbr.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/16 08:59:50 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/01 09:08:56 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

unsigned int	ft_putnbr_nbr(unsigned int nb, int c)
{
	if (nb >= 10)
	{
		c = ft_putnbr_nbr(nb / 10, c + 1);
		ft_putnbr_nbr(nb % 10, 0);
	}
	else
		c = ft_putchar(nb + '0', c);
	return (c);
}
