/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memmove.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/12 12:49:45 by jschreye          #+#    #+#             */
/*   Updated: 2021/10/22 12:04:27 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"
//#include <stdio.h>

void	*ft_memmove(void *dst, const void *src, size_t n)
{
	char		*d;
	const char	*s;
	char		*d2;
	char		*s2;

	d = (char *)dst;
	s = (const char *)src;
	if (!(dst) && !(src))
		return (dst);
	if (d < s)
	{
		while (n--)
			*d++ = *s++;
	}
	else
	{
		d2 = (char *)d + (n - 1);
		s2 = (char *)s + (n - 1);
		while (n--)
			*d2-- = *s2--;
	}
	return (dst);
}
/*int main()
{
   char dest[] = "hdasdldnflfd";
  const char src[]  = "hellolespote";

   printf("Before memmove dest = %s, src = %s\n", dest, src);
   ft_memmove(dest, src, 9);
   printf("After memmove dest = %s, src = %s\n", dest, src);

   return(0);
}*/
