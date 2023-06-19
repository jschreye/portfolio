/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   so_long.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jschreye <jschreye@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/15 09:29:31 by jschreye          #+#    #+#             */
/*   Updated: 2022/03/02 15:53:41 by jschreye         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "mlx/mlx.h"
#include "so_long.h"

int	ft_close(void)
{
	exit(0);
}

int	main(int argc, char **argv)
{
	t_data	img;

	if (argc <= 1)
		exit(0);
	img.fd = open(argv[1], O_RDONLY);
	ft_get_array_with_ber(&img);
	ft_check_error(argv[1], &img);
	ft_check_items_in_map(&img);
	img.mlx = mlx_init();
	img.mlx_win = mlx_new_window(img.mlx, img.size_i * 30, img.size_j * 30,
			"bande de fouf! ");
	ft_put_tilesets(&img);
	ft_print_count(&img);
	mlx_key_hook(img.mlx_win, ft_check_key, &img);
	mlx_hook(img.mlx_win, 17, 1L << 0, ft_close, &img);
	mlx_loop(img.mlx);
}
