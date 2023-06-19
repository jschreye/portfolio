/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strlcat.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/13 13:16:13 by jschreye          #+#    #+#             */
/*   Updated: 2021/11/03 08:59:31 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"

size_t	ft_strlcat(char *dst, const char *src, size_t size)
{
	size_t	i;
	size_t	t_dst;
	size_t	t_src;

	i = 0;
	t_dst = ft_strlen(dst);
	t_src = ft_strlen(src);
	if (size == 0)
	{
		return (t_src);
	}
	while ((src[i] != '\0') && ((t_dst + i) < (size - 1)))
	{
		dst[t_dst + i] = src[i];
		i++;
	}
	dst[t_dst + i] = '\0';
	if (size > t_dst)
	{
		return (t_dst + t_src);
	}
	return (size + t_src);
}
