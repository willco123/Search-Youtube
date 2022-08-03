-- MySQL Workbench Forward Engineering


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;
-- -----------------------------------------------------
-- Table `mydb`.`channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`channels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `channel_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`videos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`videos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 
  `date` DATETIME NOT NULL,
  `channel_id` INT,
  CONSTRAINT FK_channel_id FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;





SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

