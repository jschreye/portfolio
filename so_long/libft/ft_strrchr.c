/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strrchr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/14 09:38:19 by jschreye          #+#    #+#             */
/*   Updated: 2021/10/29 15:05:31 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"

char	*ft_strrchr(const char *s, int c)
{
	const char	*debut;

	debut = s;
	while (*s != '\0')
	{	
		s++;
	}	
	while (s != debut - 1)
	{
		if ((char)c == *s)
		{
			return ((char *)s);
		}
		s--;
	}
	if ((char)c == '\0')
	{
		return ((char *)s);
	}
	return (0);
}
