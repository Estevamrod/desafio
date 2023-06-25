-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/06/2023 às 12:57
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `encurtador`
--
CREATE DATABASE IF NOT EXISTS `encurtador` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `encurtador`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `urls`
--

CREATE TABLE `urls` (
  `id` int(11) NOT NULL,
  `url_origin` text DEFAULT NULL,
  `new_url` text DEFAULT NULL,
  `validade` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `urls`
--

INSERT INTO `urls` (`id`, `url_origin`, `new_url`, `validade`, `createdAt`, `updatedAt`) VALUES
(3, 'www.facebook.com', 'md0Dd', '2023-06-25 10:42:48', '2023-06-25 10:42:48', '2023-06-25 10:42:48');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `urls`
--
ALTER TABLE `urls`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `urls`
--
ALTER TABLE `urls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
