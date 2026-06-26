/**
 * surnames.js — Banco de sobrenomes brasileiros e internacionais.
 * 
 * Organizados por origem para permitir combinações realistas
 * com os nomes gerados.
 */

export const Surnames = {
  /** Sobrenomes portugueses/brasileiros mais comuns */
  brazilian: [
    'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira',
    'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro',
    'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes',
    'Vieira', 'Barbosa', 'Melo', 'Barros', 'Cardoso', 'Rocha',
    'Dias', 'Mendes', 'Nunes', 'Correia', 'Castro', 'Cunha',
    'Moreira', 'Araújo', 'Monteiro', 'Pinto', 'Campos', 'Freitas',
    'Machado', 'Gonçalves', 'Brito', 'Cavalcanti', 'Teixeira', 'Neves',
    'Rezende', 'Borges', 'Leite', 'Magalhães', 'Dantas', 'Moraes',
    'Viana', 'Xavier', 'Braga', 'Chaves', 'Farias', 'Maia',
    'Assis', 'Azevedo', 'Pires', 'Siqueira', 'Câmara', 'Beltrão',
    'Baptista', 'Bueno', 'Couto', 'Damasceno', 'Escobar', 'Fonseca',
    'Guedes', 'Holanda', 'Jardim', 'Lacerda', 'Medeiros', 'Nascimento',
    'Ornelas', 'Padilha', 'Quadros', 'Ramalho', 'Salgado', 'Tavares',
    'Uchôa', 'Valente', 'Wanderley', 'Zanetti', 'Aguiar', 'Bastos',
    'Carneiro', 'Delgado', 'Esteves', 'Figueiredo', 'Guimarães', 'Henriques',
    'Inácio', 'Junqueira', 'Lourenço', 'Macedo', 'Nogueira', 'Oliveira',
    'Peixoto', 'Queiroz', 'Ramos', 'Sá', 'Toledo', 'Urbano',
    'Vasconcelos', 'Ximenes', 'Zambrano', 'Alcântara', 'Bittencourt', 'Cantanhede',
    'Durães', 'Eiró', 'Furtado', 'Galvão', 'Horta', 'Ipanema',
    'Jatobá', 'Lins', 'Moura', 'Noronha', 'Ourique', 'Pamplona',
    'Quaresma', 'Romão', 'Sabóia', 'Tupinambá', 'Ubarana', 'Viveiros',
  ],

  /** Sobrenomes italianos */
  italian: [
    'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano',
    'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo',
    'Conti', 'Costa', 'Mancini', 'Barbieri', 'Fontana', 'Rinaldi',
    'Caruso', 'Moretti', 'Rizzo', 'Lombardi', 'Giordano', 'Vitali',
    'Santoro', 'Leone', 'Marchetti', 'Guerra', 'Ferri', 'Bellini',
    'Martini', 'Palumbo', 'Sartori', 'Galli', 'Villa', 'Longo',
    'Conte', 'Farina', 'Bianco', 'Serra', 'Coppola', 'De Luca',
    'Piazza', 'Sanna', 'Cattaneo', 'Riva', 'De Angelis', 'Piras',
    'Grassi', 'Parisi', 'Vinci', 'Fabbri', 'Neri', 'Gatti',
    'Benedetti', 'Pastore', 'Carbone', 'Poli', 'Testa', 'Valentini',
    'Gentile', 'Monti', 'Orlando', 'Vitale', 'Ruggiero', 'De Santis',
  ],

  /** Sobrenomes alemães */
  german: [
    'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Wagner',
    'Becker', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter',
    'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann',
    'Braun', 'Krüger', 'Hartmann', 'Lange', 'Werner', 'Krause',
    'Lehmann', 'Köhler', 'Maier', 'Huber', 'Kaiser', 'Fuchs',
    'Peters', 'Lang', 'Jung', 'Möller', 'Hahn', 'Schuster',
    'Berger', 'Frank', 'Roth', 'Beck', 'Ziegler', 'Böhm',
    'Baumann', 'Franke', 'Winter', 'Schreiber', 'Vogel', 'Friedrich',
    'Keller', 'Günther', 'Ludwig', 'Steiner', 'Horn', 'Busch',
  ],

  /** Sobrenomes japoneses */
  japanese: [
    'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Ito', 'Watanabe',
    'Yamamoto', 'Nakamura', 'Ogawa', 'Kato', 'Yoshida', 'Yamada',
    'Sasaki', 'Yamaguchi', 'Matsumoto', 'Inoue', 'Kimura', 'Shimizu',
    'Hayashi', 'Abe', 'Morita', 'Ishikawa', 'Nakajima', 'Maeda',
    'Fujita', 'Ogata', 'Okada', 'Hashimoto', 'Sakamoto', 'Shimada',
    'Yamashita', 'Kobayashi', 'Ueda', 'Murakami', 'Kondo', 'Nishimura',
    'Fujii', 'Ishii', 'Yoshimura', 'Chiba', 'Nakagawa', 'Otsuka',
    'Hasegawa', 'Sakai', 'Aoki', 'Imai', 'Fukuda', 'Endo',
    'Maruyama', 'Miyazaki', 'Noguchi', 'Sakurai', 'Yano', 'Eguchi',
  ],

  /** Sobrenomes de origem bíblica/hebraica */
  hebrew: [
    'Levi', 'Cohen', 'Mizrahi', 'Peretz', 'Biton', 'Dahan',
    'Avraham', 'David', 'Shalom', 'Yosef', 'Ben-David', 'Katz',
    'Yaakov', 'Moses', 'Aaron', 'Isaac', 'Solomon', 'Samuel',
    'Elias', 'Baruch', 'Haim', 'Rubenstein', 'Goldberg', 'Silverman',
    'Greenberg', 'Steinberg', 'Rosenberg', 'Finkelstein', 'Horowitz', 'Kaplan',
    'Friedman', 'Cohen', 'Shapiro', 'Ginzburg', 'Abramovich', 'Mendel',
  ],
};

/**
 * Retorna um sobrenome aleatório, opcionalmente filtrando por origem.
 */
export function getRandomSurname(origin = null) {
  const pool = origin && Surnames[origin] ? Surnames[origin] : Surnames.brazilian;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default Surnames;
