/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strtrim.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/18 14:02:51 by jschreye          #+#    #+#             */
/*   Updated: 2021/11/23 16:36:58 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"

char	*ft_strtrim(char const *s1, char const *set)
{
	int	deb;
	int	fin;

	deb = 0;
	if (!s1)
		return (NULL);
	fin = ft_strlen(s1);
	while (ft_strchr(set, s1[deb]))
		deb++;
	while (ft_strrchr(set, s1[fin - 1]))
		fin--;
	return (ft_substr(s1, deb, fin - deb));
}
