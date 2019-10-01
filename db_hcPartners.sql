DROP DATABASE IF EXISTS db_hcPartners

CREATE DATABASE db_hcPartners

USE db_hcPartners

--
-- Base de datos: `db_hcPartners`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `requested_ticket` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_users`
--

CREATE TABLE `type_users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1

--
-- Volcado de datos para la tabla `type_users`
--

INSERT INTO `type_users` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2019-09-30 03:26:33', '2019-09-30 03:26:33'),
(2, 'user', '2019-09-30 03:26:37', '2019-09-30 03:26:37')

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`, `typeUserId`) VALUES
(1, 'HC Admin', 'admin@example.com', '$2a$10$R6HcbbjGbyd6wqtnFvHK3e1GfEOffmyADVgmrQ1TlmkaUKl8aDeNK', '2019-09-30 03:26:43', '2019-09-30 03:26:43', 1)

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`)

--
-- Indices de la tabla `type_users`
--
ALTER TABLE `type_users`
  ADD PRIMARY KEY (`id`)

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typeUserId` (`typeUserId`)

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT
--
-- AUTO_INCREMENT de la tabla `type_users`
--
ALTER TABLE `type_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`typeUserId`) REFERENCES `type_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
