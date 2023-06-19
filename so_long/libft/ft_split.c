/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_split.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <marvin@42lausanne.ch>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/19 10:33:21 by jschreye          #+#    #+#             */
/*   Updated: 2022/01/05 14:42:53 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */
#include "libft.h"

char	**ft_split_suite(char **tab, int index);

static size_t	count_strs(char const *s, char c)
{
	size_t	count;

	count = 0;
	while (*s != '\0')
	{
		if (*s != c)
		{
			count++;
			while (*s != '\0' && *s != c)
				s++;
		}
		else
			s++;
	}
	return (count);
}

char	**ft_split(char const *s, char c)
{
	size_t		tab[2];
	const char	*start;
	char		**split;

	if (!s)
		return (NULL);
	split = (char **) malloc(((count_strs(s, c)) + 1) * sizeof(*split));
	if (!split)
		return (NULL);
	tab[1] = 0;
	while (*s != '\0')
	{
		while (*s && *s == c)
			s++;
		start = s;
		tab[0] = 0;
		while (*s && *s != c)
		{
			s++;
			tab[0]++;
		}
		if (*(s - 1) != c)
			split[tab[1]++] = ft_substr(start, 0, tab[0]);
	}
	return (ft_split_suite(split, tab[1]));
}

char	**ft_split_suite(char **tab, int index)
{
	tab[index] = 0;
	return (tab);
}
// len = tab[0]
// index = tab[1]
/*static size_t    count_strs(char const *s, char c)
{
    size_t    count;

    count = 0;
    while (*s != '\0')
    {
        if (*s != c)
        {
            count++;
            while (*s != '\0' && *s != c)
                s++;
        }
        else
            s++;
    }
    return (count);
}

char    **ft_split(char const *s, char c)
{
    size_t			len;
    size_t			index;
    const char		*start;
    char			**split;

    split = (char **) malloc(((count_strs(s, c)) + 1) * sizeof(*split));
    if (!split)
        return (NULL);
    index = 0;
    while (*s != '\0')
    {
        while (*s && *s == c)
            s++;
        start = s;
        len = 0;
        while (*s && *s != c)
        {
            s++;
            len++;
        }
        if ((*s - 1) != c)
            split[index++] = ft_substr(start, 0, len);
    }
    split[index] = 0;
    return (split);
}*/