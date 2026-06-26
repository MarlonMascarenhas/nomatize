/**
 * string.js — Utilitários de manipulação de strings.
 */

/**
 * Remove acentos de uma string.
 */
export function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Capitaliza a primeira letra de cada palavra.
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitaliza todas as palavras de uma string.
 */
export function titleCase(str) {
  return str.split(' ').map(capitalize).join(' ');
}

/**
 * Conta sílabas de forma aproximada para português.
 * Cada grupo de vogais consecutivas conta como 1 sílaba.
 */
export function countSyllables(word) {
  const cleaned = removeAccents(word.toLowerCase());
  // Vogais do português + y como vogal
  const vowelGroups = cleaned.match(/[aeiouyáéíóúâêîôûãõàèìòùäëïöü]+/gi);
  return vowelGroups ? vowelGroups.length : 1;
}

/**
 * Verifica se uma string termina com vogal.
 */
export function endsWithVowel(str) {
  return /[aeiouáéíóúâêîôûãõ]$/i.test(removeAccents(str));
}

/**
 * Verifica se uma string começa com vogal.
 */
export function startsWithVowel(str) {
  return /^[aeiouáéíóúâêîôûãõ]/i.test(removeAccents(str));
}

/**
 * Gera um username a partir de um nome completo.
 */
export function generateUsername(fullName) {
  const parts = removeAccents(fullName.toLowerCase()).split(' ');
  const first = parts[0];
  const last = parts[parts.length - 1];
  const num = Math.floor(Math.random() * 9000) + 100;
  const separators = ['.', '_', '', '-'];
  const sep = separators[Math.floor(Math.random() * separators.length)];
  return `${first}${sep}${last}${num}`;
}

/**
 * Gera uma senha aleatória segura.
 */
export function generatePassword(length = 10) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '@#$!&*';
  const all = upper + lower + numbers + special;

  let password = '';
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password.split('').sort(() => Math.random() - 0.5).join('');
}
