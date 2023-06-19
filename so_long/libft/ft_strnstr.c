/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strnstr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/15 10:55:23 by jschreye          #+#    #+#             */
/*   Updated: 2021/10/19 14:57:20 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"

char	*ft_strnstr(const char *s1, const char *s2, size_t n)
{
	size_t	i;
	size_t	i_mem;
	size_t	i_tofind;

	i_mem = 0;
	if (s2[0] == '\0')
		return ((char *)s1);
	while (s1[i_mem] != '\0' && i_mem < n)
	{
		i_tofind = 0;
		while (s1[i_mem] != s2[i_tofind] && s1[i_mem] != '\0')
			i_mem++;
		if (s1[i_mem] == '\0')
			return (NULL);
		i = i_mem;
		while ((s1[i] == s2[i_tofind] || s2[i_tofind] == '\0') && i++ <= n)
			if (s2[i_tofind++] == '\0')
				return ((char *)&s1[i_mem]);
		if (i > n)
			return (NULL);
		i_mem++;
	}
	return (NULL);
}
