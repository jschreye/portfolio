/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_atoi.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/11 12:58:50 by jschreye          #+#    #+#             */
/*   Updated: 2022/02/09 12:02:18 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"

static int	is_white_space(char *c)
{
	if (*c == '\n' || *c == '\t' || *c == '\r'
		|| *c == '\v' || *c == '\f' || *c == ' ')
		return (1);
	return (0);
}

long long int	ft_atoi(const char *str)
{
	long long int		a;
	long long int		b;
	char				*p;

	a = 1;
	b = 0;
	p = (char *)str;
	while (is_white_space(p))
		p++;
	if (*p == '+' || *p == '-')
	{
		if (*p == '-')
			a *= -1;
		p++;
	}
	while (*p >= '0' && *p <= '9')
	{
		b *= 10;
		b += (*p - '0');
		p++;
	}
	return (a * b);
}
/*long long int    ft_atoi(const char *str)
{
    int                i;
    long long int    number;
    int                signe;

    signe = 1;
    i = 0;
    number = 0;
    while (*str > 0 && *str <= 32)
    {
        if (*str == 27)
            return (0);
        str++;
    }
    if (*str == '-')
    {
        signe = -1;
        str++;
    }
    else if (*str == '+')
        str++;
    while (*(str + i) >= 48 && *(str + i) <= 57)
        number = number * 10 + *(str + i++) - '0';
    return (number * signe);
}*/
