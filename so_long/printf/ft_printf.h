/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_printf.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/11/15 09:02:43 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/01 09:08:30 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_PRINTF_H
# define FT_PRINTF_H

# include <stdio.h>
# include <unistd.h>
# include <stdarg.h>

int				ft_putnbr(int nb, int c);
int				ft_putchar(char c, int i);
int				ft_put_str(char *str, int c);
int				ft_putnbrhex(unsigned int nb, char *base, int c);
int				ft_printf(const char *str, ...);
int				flags(char *str, va_list ptr, int i);
unsigned int	ft_putnbr_nbr(unsigned int nb, int c);
int				ft_putnbrhextwo(unsigned long nb, char *base, int c);
int				ft_putnbrpointeur(void *str, char *base, int c);

#endif
