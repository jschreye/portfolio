/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memset.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/11 16:54:31 by jschreye          #+#    #+#             */
/*   Updated: 2021/10/18 09:35:27 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"
//#include <stdio.h>
//#include <string.h>

void	*ft_memset(void *b, int c, size_t len)
{
	size_t			k;
	unsigned char	*str2;

	k = 0;
	str2 = (unsigned char *)b;
	while (k < len)
	{
		str2[k] = c;
		k++;
	}
	return (b);
}
//int main ()
//{
//  char str[50];
// strcpy(str,"This is string.h library function \n");
// printf ("%s", str);
// ft_memset(str + 4,'$',7);
// printf ("%s", str);
//   
// return(0);
//}
