/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_itoa.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/20 14:10:28 by jschreye          #+#    #+#             */
/*   Updated: 2021/11/15 13:01:53 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"

static char	*ft_putnbr(long n, int len, char *ptr)
{
	size_t	mod;

	mod = 0;
	ptr[len] = 0;
	if (n < 0)
	{
		ptr[0] = 45;
		n *= -1;
	}
	while (n)
	{
		mod = n % 10;
		ptr[--len] = mod + 48;
		n = n / 10;
	}
	return (ptr);
}

char	*ft_itoa(int n)
{
	char	*ptr;
	int		len;
	long	nbr;

	nbr = n;
	len = 0;
	if (n <= 0)
		len++;
	while (n)
	{
		n = n / 10;
		len++;
	}
	ptr = malloc((len + 1) * sizeof(char));
	if (!ptr)
		return (NULL);
	ft_putnbr(nbr, len, ptr);
	if (nbr == 0)
		ptr[0] = '0';
	return (ptr);
}
