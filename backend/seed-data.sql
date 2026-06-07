BEGIN;

CREATE TEMP TABLE seed_categories (
    name TEXT PRIMARY KEY,
    description TEXT NOT NULL
) ON COMMIT DROP;

INSERT INTO seed_categories (name, description) VALUES
                                                    ('Players', 'Questions about current and former FC Barcelona players.'),
                                                    ('Club History', 'Questions about FC Barcelona history, identity, and major moments.'),
                                                    ('Managers', 'Questions about FC Barcelona managers and coaching history.'),
                                                    ('Stadiums', 'Questions about Camp Nou and other stadium-related facts.'),
                                                    ('La Masia', 'Questions about Barcelona academy players and youth development.'),
                                                    ('El Clasico', 'Questions about FC Barcelona matches against Real Madrid.');

INSERT INTO categories (name, description)
SELECT sc.name, sc.description
FROM seed_categories sc
WHERE NOT EXISTS (
    SELECT 1 FROM categories c WHERE c.name = sc.name
);

CREATE TEMP TABLE seed_questions (
    category_name TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    question_text TEXT PRIMARY KEY,
    explanation TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    wrong1 TEXT NOT NULL,
    wrong2 TEXT NOT NULL,
    wrong3 TEXT NOT NULL
) ON COMMIT DROP;

INSERT INTO seed_questions (
    category_name,
    difficulty,
    question_text,
    explanation,
    correct_answer,
    wrong1,
    wrong2,
    wrong3
) VALUES

-- ============================================================
-- PLAYERS - EASY
-- ============================================================
('Players', 'EASY', 'Who is FC Barcelona''s all-time top goalscorer?', 'Lionel Messi is Barcelona''s all-time top goalscorer.', 'Lionel Messi', 'Ronaldinho', 'Xavi', 'Luis Suarez'),
('Players', 'EASY', 'Which Barcelona player was famous for wearing number 10 before Lionel Messi?', 'Ronaldinho wore the number 10 shirt before Messi became Barcelona''s main number 10.', 'Ronaldinho', 'Gerard Pique', 'Sergio Busquets', 'Jordi Alba'),
('Players', 'EASY', 'Which midfielder is famous for the phrase tiki-taka together with Xavi and Busquets?', 'Andres Iniesta was a key part of Barcelona''s midfield style.', 'Andres Iniesta', 'Neymar', 'Rivaldo', 'Dani Alves'),
('Players', 'EASY', 'Which Uruguayan striker formed part of the MSN attacking trio?', 'Luis Suarez formed the MSN trio with Messi and Neymar.', 'Luis Suarez', 'Edinson Cavani', 'Diego Forlan', 'Darwin Nunez'),
('Players', 'EASY', 'Which Barcelona player is famously nicknamed La Pulga?', 'Lionel Messi is famously nicknamed La Pulga.', 'Lionel Messi', 'Ronaldinho', 'Xavi', 'Andres Iniesta'),

-- ============================================================
-- PLAYERS - MEDIUM
-- ============================================================
('Players', 'MEDIUM', 'Which Brazilian full-back became known for his attacking partnership with Messi?', 'Dani Alves was one of Barcelona''s most important attacking full-backs.', 'Dani Alves', 'Marcelo', 'Cafu', 'Roberto Carlos'),
('Players', 'MEDIUM', 'Which striker joined Barcelona from Liverpool in 2014?', 'Luis Suarez joined Barcelona from Liverpool in 2014.', 'Luis Suarez', 'David Villa', 'Samuel Eto''o', 'Thierry Henry'),
('Players', 'MEDIUM', 'Which goalkeeper was Barcelona''s main keeper during the 2014-15 treble season?', 'Marc-Andre ter Stegen was a key goalkeeper during that period.', 'Marc-Andre ter Stegen', 'Victor Valdes', 'Claudio Bravo', 'Jose Pinto'),
('Players', 'MEDIUM', 'Which Brazilian attacker joined Barcelona from Santos in 2013?', 'Neymar joined Barcelona from Santos in 2013.', 'Neymar', 'Raphinha', 'Ronaldinho', 'Malcom'),
('Players', 'MEDIUM', 'Which Croatian midfielder joined Barcelona in 2014 and scored in the 2015 Champions League final?', 'Ivan Rakitic joined Barcelona in 2014 and scored in the 2015 Champions League final.', 'Ivan Rakitic', 'Luka Modric', 'Mateo Kovacic', 'Marcelo Brozovic'),

-- ============================================================
-- PLAYERS - HARD
-- ============================================================
('Players', 'HARD', 'Which Bulgarian forward won the Ballon d''Or while being strongly associated with Barcelona in the 1990s?', 'Hristo Stoichkov won the Ballon d''Or in 1994.', 'Hristo Stoichkov', 'Dimitar Berbatov', 'Lubo Penev', 'Emil Kostadinov'),
('Players', 'HARD', 'Which Dutch player was known for playing as both defender and midfielder for Barcelona and later became a manager?', 'Frank Rijkaard played for Barcelona and later managed the club.', 'Frank Rijkaard', 'Dennis Bergkamp', 'Clarence Seedorf', 'Edgar Davids'),
('Players', 'HARD', 'Which Cameroonian striker scored for Barcelona in the 2006 Champions League final?', 'Samuel Eto''o scored against Arsenal in the 2006 final.', 'Samuel Eto''o', 'Patrick Kluivert', 'Yaya Toure', 'Alex Song'),
('Players', 'HARD', 'Which French forward scored in the 2009 Champions League final against Manchester United?', 'Lionel Messi scored in the 2009 Champions League final against Manchester United.', 'Lionel Messi', 'Thierry Henry', 'David Villa', 'Pedro'),
('Players', 'HARD', 'Which Danish forward joined Barcelona in 2020 as an emergency signing?', 'Martin Braithwaite joined Barcelona in 2020 as an emergency signing.', 'Martin Braithwaite', 'Antoine Griezmann', 'Kevin-Prince Boateng', 'Luuk de Jong'),

-- ============================================================
-- PLAYERS - EXPERT
-- ============================================================
('Players', 'EXPERT', 'Which Barcelona player scored against Arsenal in the 2006 Champions League final?', 'Samuel Eto''o scored Barcelona''s equaliser in the 2006 Champions League final.', 'Samuel Eto''o', 'Ronaldinho', 'Deco', 'Ludovic Giuly'),
('Players', 'EXPERT', 'Which Barcelona player scored the decisive goal in the 1992 European Cup final?', 'Ronald Koeman scored the winning free kick against Sampdoria at Wembley.', 'Ronald Koeman', 'Hristo Stoichkov', 'Romario', 'Michael Laudrup'),
('Players', 'EXPERT', 'Which Barcelona player won the Ballon d''Or in 1994?', 'Hristo Stoichkov won the Ballon d''Or in 1994.', 'Hristo Stoichkov', 'Romario', 'Ronaldo Nazario', 'Luis Figo'),
('Players', 'EXPERT', 'Which Barcelona defender was known for captaining the club during the Guardiola era?', 'Carles Puyol was Barcelona captain during much of the Guardiola era.', 'Carles Puyol', 'Gerard Pique', 'Rafael Marquez', 'Eric Abidal'),
('Players', 'EXPERT', 'Which Brazilian Barcelona player won the Ballon dOr in 1999?', 'Rivaldo won the Ballon d''Or in 1999 while playing for Barcelona.', 'Rivaldo', 'Ronaldinho', 'Romario', 'Ronaldo Nazario'),

-- ============================================================
-- CLUB HISTORY - EASY
-- ============================================================
('Club History', 'EASY', 'In which year was FC Barcelona founded?', 'FC Barcelona was founded in 1899.', '1899', '1902', '1910', '1921'),
('Club History', 'EASY', 'What are Barcelona''s traditional home colours?', 'Barcelona are known for blue and red colours.', 'Blue and red', 'White and blue', 'Black and red', 'Green and white'),
('Club History', 'EASY', 'What is FC Barcelona''s nickname?', 'Barcelona are commonly known as Barca.', 'Barca', 'Los Blancos', 'The Citizens', 'The Blues'),
('Club History', 'EASY', 'Which region is FC Barcelona strongly associated with?', 'FC Barcelona is strongly associated with Catalonia.', 'Catalonia', 'Andalusia', 'Basque Country', 'Galicia'),
('Club History', 'EASY', 'In which country does FC Barcelona play?', 'FC Barcelona plays in Spain.', 'Spain', 'France', 'Portugal', 'Italy'),

-- ============================================================
-- CLUB HISTORY - MEDIUM
-- ============================================================
('Club History', 'MEDIUM', 'Who founded FC Barcelona?', 'Joan Gamper was the founder of FC Barcelona.', 'Joan Gamper', 'Josep Nunez', 'Johan Cruyff', 'Pep Guardiola'),
('Club History', 'MEDIUM', 'Which phrase is strongly associated with FC Barcelona''s identity?', 'Mes que un club means more than a club.', 'Mes que un club', 'You''ll Never Walk Alone', 'Hala Madrid', 'Forza Barca'),
('Club History', 'MEDIUM', 'Which era is Johan Cruyff strongly connected with as Barcelona manager?', 'Cruyff created the famous Dream Team era.', 'Dream Team era', 'Galacticos era', 'Invincibles era', 'Busby Babes era'),
('Club History', 'MEDIUM', 'In which year did Barcelona win the Champions League at Wembley under Guardiola?', 'Barcelona won the Champions League at Wembley under Guardiola in 2011.', '2011', '2009', '2006', '2015'),
('Club History', 'MEDIUM', 'Which charity appeared on Barcelona shirts in 2006?', 'UNICEF appeared on Barcelona shirts from 2006.', 'UNICEF', 'Qatar Foundation', 'Rakuten', 'Spotify'),

-- ============================================================
-- CLUB HISTORY - HARD
-- ============================================================
('Club History', 'HARD', 'Which Barcelona president was strongly associated with the modernisation of the club in the late 20th century?', 'Josep Lluis Nunez was an important long-serving president.', 'Josep Lluis Nunez', 'Florentino Perez', 'Sandro Rosell', 'Joan Laporta'),
('Club History', 'HARD', 'Which year did Barcelona win their first European Cup?', 'Barcelona won their first European Cup in 1992.', '1992', '1986', '1999', '2006'),
('Club History', 'HARD', 'Where did Barcelona win their first European Cup final?', 'Barcelona won the 1992 European Cup at Wembley.', 'Wembley', 'Camp Nou', 'San Siro', 'Stade de France'),
('Club History', 'HARD', 'Who scored Barcelona''s winning goal in the 1992 European Cup final?', 'Ronald Koeman scored the winning goal from a free kick.', 'Ronald Koeman', 'Romario', 'Michael Laudrup', 'Hristo Stoichkov'),
('Club History', 'HARD', 'Which club beat Barcelona in the 1986 European Cup final?', 'Steaua Bucharest beat Barcelona in the 1986 European Cup final.', 'Steaua Bucharest', 'AC Milan', 'Benfica', 'Porto'),

-- ============================================================
-- CLUB HISTORY - EXPERT
-- ============================================================
('Club History', 'EXPERT', 'Which club did Barcelona beat in the 1992 European Cup final?', 'Barcelona beat Sampdoria in the 1992 European Cup final.', 'Sampdoria', 'AC Milan', 'Benfica', 'Ajax'),
('Club History', 'EXPERT', 'Which Barcelona team is famously known as the Dream Team?', 'Johan Cruyff''s Barcelona side of the early 1990s became known as the Dream Team.', 'Johan Cruyff''s early 1990s team', 'Pep Guardiola''s 2009 team', 'Luis Enrique''s 2015 team', 'Frank Rijkaard''s 2006 team'),
('Club History', 'EXPERT', 'Which year did Barcelona complete the sextuple under Pep Guardiola?', 'Barcelona won six major trophies in 2009.', '2009', '2006', '2011', '2015'),
('Club History', 'EXPERT', 'Which team did Barcelona defeat in the 2009 Champions League final?', 'Barcelona defeated Manchester United in the 2009 Champions League final.', 'Manchester United', 'Chelsea', 'Arsenal', 'Bayern Munich'),
('Club History', 'EXPERT', 'Which trophy completed Barcelonas 2009 sextuple?', 'Barcelona completed the 2009 sextuple by winning the FIFA Club World Cup.', 'FIFA Club World Cup', 'Champions League', 'Copa del Rey', 'Spanish Super Cup'),

-- ============================================================
-- MANAGERS - EASY
-- ============================================================
('Managers', 'EASY', 'Who managed Barcelona during the 2008-09 treble season?', 'Pep Guardiola managed Barcelona during the 2008-09 treble season.', 'Pep Guardiola', 'Luis Enrique', 'Frank Rijkaard', 'Ronald Koeman'),
('Managers', 'EASY', 'Which Barcelona manager won the treble in 2014-15?', 'Luis Enrique managed Barcelona during the 2014-15 treble season.', 'Luis Enrique', 'Pep Guardiola', 'Tito Vilanova', 'Xavi'),
('Managers', 'EASY', 'Which Dutch legend managed Barcelona''s Dream Team?', 'Johan Cruyff managed Barcelona''s Dream Team.', 'Johan Cruyff', 'Louis van Gaal', 'Frank Rijkaard', 'Ronald Koeman'),
('Managers', 'EASY', 'Which former Barcelona midfielder later became the clubs manager?', 'Xavi later became Barcelona manager after his playing career.', 'Xavi', 'Carles Puyol', 'Andres Iniesta', 'Sergio Busquets'),
('Managers', 'EASY', 'Which manager is most associated with Barcelonas tiki-taka era?', 'Pep Guardiola is strongly associated with Barcelona''s tiki-taka era.', 'Pep Guardiola', 'Luis Enrique', 'Frank Rijkaard', 'Ronald Koeman'),

-- ============================================================
-- MANAGERS - MEDIUM
-- ============================================================
('Managers', 'MEDIUM', 'Which manager led Barcelona to the 2006 Champions League title?', 'Frank Rijkaard managed Barcelona when they won the 2006 Champions League.', 'Frank Rijkaard', 'Pep Guardiola', 'Luis Enrique', 'Ernesto Valverde'),
('Managers', 'MEDIUM', 'Which manager succeeded Pep Guardiola in 2012?', 'Tito Vilanova succeeded Guardiola as Barcelona manager.', 'Tito Vilanova', 'Luis Enrique', 'Gerardo Martino', 'Ronald Koeman'),
('Managers', 'MEDIUM', 'Which Argentine coach managed Barcelona during the 2013-14 season?', 'Gerardo Martino managed Barcelona in the 2013-14 season.', 'Gerardo Martino', 'Marcelo Bielsa', 'Diego Simeone', 'Mauricio Pochettino'),
('Managers', 'MEDIUM', 'Which manager coached Barcelona immediately before Pep Guardiola?', 'Frank Rijkaard coached Barcelona immediately before Guardiola.', 'Frank Rijkaard', 'Luis Enrique', 'Tito Vilanova', 'Ronald Koeman'),
('Managers', 'MEDIUM', 'Which Dutch manager had two spells as Barcelona manager before the 2010s?', 'Louis van Gaal had two spells as Barcelona manager.', 'Louis van Gaal', 'Frank Rijkaard', 'Ronald Koeman', 'Johan Neeskens'),

-- ============================================================
-- MANAGERS - HARD
-- ============================================================
('Managers', 'HARD', 'Which manager won La Liga with Barcelona in the 2017-18 season?', 'Ernesto Valverde won La Liga with Barcelona in 2017-18.', 'Ernesto Valverde', 'Luis Enrique', 'Ronald Koeman', 'Quique Setien'),
('Managers', 'HARD', 'Which Barcelona manager was also a legendary club captain and midfielder?', 'Xavi was a legendary midfielder and later became Barcelona manager.', 'Xavi', 'Frank Rijkaard', 'Luis Enrique', 'Gerardo Martino'),
('Managers', 'HARD', 'Which manager was in charge of Barcelona during the 2020 Lisbon defeat against Bayern Munich?', 'Quique Setien was Barcelona manager during that match.', 'Quique Setien', 'Ronald Koeman', 'Ernesto Valverde', 'Luis Enrique'),
('Managers', 'HARD', 'Which Dutch manager returned to coach Barcelona in 2020?', 'Ronald Koeman returned as Barcelona manager in 2020.', 'Ronald Koeman', 'Frank de Boer', 'Louis van Gaal', 'Frank Rijkaard'),
('Managers', 'HARD', 'Which manager led Barcelona to La Liga titles in 1998 and 1999?', 'Louis van Gaal led Barcelona to La Liga titles in 1998 and 1999.', 'Louis van Gaal', 'Frank Rijkaard', 'Johan Cruyff', 'Bobby Robson'),

-- ============================================================
-- MANAGERS - EXPERT
-- ============================================================
('Managers', 'EXPERT', 'Which Barcelona manager introduced the Dream Team style in the early 1990s?', 'Johan Cruyff built the Dream Team and deeply influenced Barcelona''s football identity.', 'Johan Cruyff', 'Louis van Gaal', 'Frank Rijkaard', 'Terry Venables'),
('Managers', 'EXPERT', 'Which Barcelona manager won the Champions League in both 2009 and 2011?', 'Pep Guardiola won the Champions League with Barcelona in 2009 and 2011.', 'Pep Guardiola', 'Luis Enrique', 'Frank Rijkaard', 'Johan Cruyff'),
('Managers', 'EXPERT', 'Which manager was in charge when Barcelona won the 2015 Champions League final against Juventus?', 'Luis Enrique managed Barcelona during the 2014-15 treble season.', 'Luis Enrique', 'Pep Guardiola', 'Ernesto Valverde', 'Tito Vilanova'),
('Managers', 'EXPERT', 'Which Barcelona manager was also part of the club as a player in the 1990s and later won the 2006 Champions League as coach?', 'Frank Rijkaard played for Barcelona and later managed the club to the 2006 Champions League title.', 'Frank Rijkaard', 'Ronald Koeman', 'Luis Enrique', 'Johan Cruyff'),
('Managers', 'EXPERT', 'Which English manager coached Barcelona during the mid-1980s?', 'Terry Venables coached Barcelona during the mid-1980s.', 'Terry Venables', 'Bobby Robson', 'Howard Kendall', 'Kevin Keegan'),

-- ============================================================
-- STADIUMS - EASY
-- ============================================================
('Stadiums', 'EASY', 'What is Barcelona''s famous home stadium called?', 'Camp Nou is Barcelona''s famous home stadium.', 'Camp Nou', 'Santiago Bernabeu', 'Anfield', 'San Siro'),
('Stadiums', 'EASY', 'In which city is Camp Nou located?', 'Camp Nou is located in Barcelona.', 'Barcelona', 'Madrid', 'Valencia', 'Seville'),
('Stadiums', 'EASY', 'Which Spanish club plays at Camp Nou?', 'FC Barcelona plays at Camp Nou.', 'FC Barcelona', 'Real Madrid', 'Atletico Madrid', 'Sevilla'),
('Stadiums', 'EASY', 'Which stadium did Barcelona use for many European nights before renovation?', 'Camp Nou was Barcelona''s main stadium before renovation works.', 'Camp Nou', 'Wembley', 'San Siro', 'Old Trafford'),
('Stadiums', 'EASY', 'Which stadium is also known as Spotify Camp Nou?', 'Spotify Camp Nou is the sponsored name of Camp Nou.', 'Camp Nou', 'Les Corts', 'Mini Estadi', 'Estadi Olimpic'),

-- ============================================================
-- STADIUMS - MEDIUM
-- ============================================================
('Stadiums', 'MEDIUM', 'Which stadium hosted Barcelona''s 1992 European Cup victory?', 'Wembley hosted the 1992 European Cup final.', 'Wembley', 'Camp Nou', 'Old Trafford', 'Stade de France'),
('Stadiums', 'MEDIUM', 'Which temporary stadium has Barcelona used during Camp Nou renovation works?', 'Estadi Olimpic Lluis Companys has been used during renovation works.', 'Estadi Olimpic Lluis Companys', 'Cornella-El Prat', 'Mestalla', 'Anoeta'),
('Stadiums', 'MEDIUM', 'Which major event was the Estadi Olimpic Lluis Companys originally linked with?', 'The stadium is strongly linked with the 1992 Barcelona Olympics.', '1992 Olympic Games', '1982 World Cup final', '2006 Champions League final', '2010 World Cup'),
('Stadiums', 'MEDIUM', 'Which city hosted Barcelonas 1992 European Cup final victory?', 'Barcelona won the 1992 European Cup final in London.', 'London', 'Barcelona', 'Paris', 'Rome'),
('Stadiums', 'MEDIUM', 'Which smaller stadium was historically linked with Barcelona B?', 'Mini Estadi was historically linked with Barcelona B.', 'Mini Estadi', 'Les Corts', 'Camp Nou', 'Montjuic'),

-- ============================================================
-- STADIUMS - HARD
-- ============================================================
('Stadiums', 'HARD', 'What was Barcelona''s main stadium before Camp Nou?', 'Les Corts was Barcelona''s main stadium before Camp Nou.', 'Les Corts', 'Montjuic', 'Mini Estadi', 'La Romareda'),
('Stadiums', 'HARD', 'In which year was Camp Nou officially opened?', 'Camp Nou opened in 1957.', '1957', '1949', '1965', '1973'),
('Stadiums', 'HARD', 'Which stadium hosted the 1999 Champions League final, not involving Barcelona?', 'Camp Nou hosted the famous 1999 final between Manchester United and Bayern Munich.', 'Camp Nou', 'Wembley', 'San Siro', 'Old Trafford'),
('Stadiums', 'HARD', 'What does Camp Nou mean in English?', 'Camp Nou means new field.', 'New field', 'Great stadium', 'Blue field', 'Home ground'),
('Stadiums', 'HARD', 'Which stadium hosted Barcelonas 2006 Champions League final win?', 'Barcelona won the 2006 Champions League final at Stade de France.', 'Stade de France', 'Wembley Stadium', 'Camp Nou', 'San Siro'),

-- ============================================================
-- STADIUMS - EXPERT
-- ============================================================
('Stadiums', 'EXPERT', 'Which stadium hosted Barcelona''s first European Cup victory in 1992?', 'Wembley Stadium hosted Barcelona''s 1992 European Cup win.', 'Wembley Stadium', 'Camp Nou', 'San Siro', 'Old Trafford'),
('Stadiums', 'EXPERT', 'In which year did Camp Nou officially open?', 'Camp Nou officially opened in 1957.', '1957', '1954', '1960', '1963'),
('Stadiums', 'EXPERT', 'Which Barcelona stadium is strongly linked with the 1992 Olympic Games?', 'Estadi Olimpic Lluis Companys is strongly associated with the 1992 Barcelona Olympics.', 'Estadi Olimpic Lluis Companys', 'Camp Nou', 'Les Corts', 'Mini Estadi'),
('Stadiums', 'EXPERT', 'What was Barcelona''s home stadium before Camp Nou?', 'Les Corts was Barcelona''s home before Camp Nou opened.', 'Les Corts', 'Mini Estadi', 'Montjuic', 'Estadi Olimpic'),
('Stadiums', 'EXPERT', 'Which stadium hosted Barcelonas 2015 Champions League final win?', 'Barcelona won the 2015 Champions League final at the Olympiastadion in Berlin.', 'Olympiastadion Berlin', 'Wembley Stadium', 'Camp Nou', 'Stade de France'),

-- ============================================================
-- LA MASIA - EASY
-- ============================================================
('La Masia', 'EASY', 'What is La Masia?', 'La Masia is Barcelona''s famous youth academy.', 'Barcelona''s youth academy', 'Barcelona''s stadium', 'Barcelona''s fan group', 'Barcelona''s museum'),
('La Masia', 'EASY', 'Which famous Argentine player developed at La Masia?', 'Lionel Messi developed at La Masia.', 'Lionel Messi', 'Cristiano Ronaldo', 'Kylian Mbappe', 'Zlatan Ibrahimovic'),
('La Masia', 'EASY', 'Which Barcelona midfielder came through La Masia and became known for his passing?', 'Xavi came through La Masia and became famous for his passing.', 'Xavi', 'Luka Modric', 'Toni Kroos', 'Andrea Pirlo'),
('La Masia', 'EASY', 'Which La Masia graduate captained Barcelona as a defender?', 'Carles Puyol captained Barcelona and came through La Masia.', 'Carles Puyol', 'Gerard Pique', 'Jordi Alba', 'Sergi Roberto'),
('La Masia', 'EASY', 'Which La Masia graduate is famous for wearing number 6 for Barcelona?', 'Xavi is strongly associated with Barcelona''s number 6 shirt.', 'Xavi', 'Iniesta', 'Busquets', 'Puyol'),

-- ============================================================
-- LA MASIA - MEDIUM
-- ============================================================
('La Masia', 'MEDIUM', 'Which defender from La Masia became a long-term Barcelona centre-back?', 'Gerard Pique came through La Masia before returning to Barcelona.', 'Gerard Pique', 'Sergio Ramos', 'Pepe', 'Raphael Varane'),
('La Masia', 'MEDIUM', 'Which midfielder from La Masia became famous for his calm style and number 6 role?', 'Sergio Busquets became one of Barcelona''s most important midfielders.', 'Sergio Busquets', 'Casemiro', 'Rodri', 'Claude Makelele'),
('La Masia', 'MEDIUM', 'Which La Masia graduate scored in the 2009 Champions League final?', 'Lionel Messi scored in the 2009 Champions League final.', 'Lionel Messi', 'Xavi', 'Andres Iniesta', 'Pedro'),
('La Masia', 'MEDIUM', 'Which La Masia graduate scored in the 2011 Champions League final?', 'Lionel Messi scored in the 2011 Champions League final.', 'Lionel Messi', 'Xavi', 'Andres Iniesta', 'Pedro'),
('La Masia', 'MEDIUM', 'Which La Masia graduate became known for his role as Barcelonas holding midfielder?', 'Sergio Busquets became famous as Barcelona''s holding midfielder.', 'Sergio Busquets', 'Xavi', 'Cesc Fabregas', 'Thiago Alcantara'),

-- ============================================================
-- LA MASIA - HARD
-- ============================================================
('La Masia', 'HARD', 'Which La Masia graduate scored the winning goal in the 2010 World Cup final for Spain?', 'Andres Iniesta scored the winning goal in the 2010 World Cup final.', 'Andres Iniesta', 'Xavi', 'Sergio Busquets', 'Cesc Fabregas'),
('La Masia', 'HARD', 'Which La Masia graduate left Barcelona for Arsenal and later returned?', 'Cesc Fabregas left for Arsenal and later returned to Barcelona.', 'Cesc Fabregas', 'Pedro', 'Gerard Pique', 'Thiago Alcantara'),
('La Masia', 'HARD', 'Which La Masia graduate became known for playing as a false nine under Guardiola?', 'Lionel Messi was famously used as a false nine under Guardiola.', 'Lionel Messi', 'Pedro', 'Bojan Krkic', 'David Villa'),
('La Masia', 'HARD', 'Which La Masia graduate later became Barcelona manager?', 'Xavi later became Barcelona manager.', 'Xavi', 'Andres Iniesta', 'Carles Puyol', 'Sergio Busquets'),
('La Masia', 'HARD', 'Which La Masia forward scored in the 2011 Champions League final against Manchester United?', 'Pedro scored in the 2011 Champions League final against Manchester United.', 'Pedro', 'Bojan Krkic', 'Isaac Cuenca', 'Cristian Tello'),

-- ============================================================
-- LA MASIA - EXPERT
-- ============================================================
('La Masia', 'EXPERT', 'Which La Masia graduate scored Spain''s winning goal in the 2010 World Cup final?', 'Andres Iniesta scored the winning goal for Spain in the 2010 World Cup final.', 'Andres Iniesta', 'Xavi', 'Sergio Busquets', 'Cesc Fabregas'),
('La Masia', 'EXPERT', 'Which La Masia graduate became Barcelona manager after a long playing career as a midfielder?', 'Xavi became Barcelona manager after his legendary playing career.', 'Xavi', 'Andres Iniesta', 'Carles Puyol', 'Sergio Busquets'),
('La Masia', 'EXPERT', 'Which La Masia graduate became known for redefining the defensive midfield role under Guardiola?', 'Sergio Busquets became essential to Barcelona''s positional play under Guardiola.', 'Sergio Busquets', 'Cesc Fabregas', 'Pedro', 'Bojan Krkic'),
('La Masia', 'EXPERT', 'Which La Masia graduate left for Arsenal before later returning to Barcelona?', 'Cesc Fabregas left Barcelona''s academy for Arsenal and later returned.', 'Cesc Fabregas', 'Gerard Pique', 'Pedro', 'Thiago Alcantara'),
('La Masia', 'EXPERT', 'Which La Masia graduate later became a Bayern Munich and Liverpool midfielder?', 'Thiago Alcantara came through La Masia and later played for Bayern Munich and Liverpool.', 'Thiago Alcantara', 'Cesc Fabregas', 'Mikel Arteta', 'Xavi Simons'),

-- ============================================================
-- EL CLASICO - EASY
-- ============================================================
('El Clasico', 'EASY', 'Which club does Barcelona face in El Clasico?', 'El Clasico is Barcelona against Real Madrid.', 'Real Madrid', 'Atletico Madrid', 'Espanyol', 'Valencia'),
('El Clasico', 'EASY', 'What is the name of Real Madrid''s home stadium?', 'Real Madrid play at the Santiago Bernabeu.', 'Santiago Bernabeu', 'Camp Nou', 'Metropolitano', 'Mestalla'),
('El Clasico', 'EASY', 'Which two colours are most associated with Barcelona in El Clasico?', 'Barcelona are traditionally associated with blue and red.', 'Blue and red', 'White and gold', 'Black and yellow', 'Green and white'),
('El Clasico', 'EASY', 'El Clasico is one of footballs biggest rivalries between Barcelona and which club?', 'El Clasico is played between Barcelona and Real Madrid.', 'Real Madrid', 'Atletico Madrid', 'Espanyol', 'Valencia'),
('El Clasico', 'EASY', 'What colour is Real Madrid traditionally known for wearing?', 'Real Madrid are traditionally known for wearing white.', 'White', 'Blue and red', 'Black', 'Yellow'),

-- ============================================================
-- EL CLASICO - MEDIUM
-- ============================================================
('El Clasico', 'MEDIUM', 'Who scored a famous late winner at the Bernabeu in 2017 and held up his shirt?', 'Lionel Messi scored and celebrated by holding up his shirt.', 'Lionel Messi', 'Neymar', 'Luis Suarez', 'Andres Iniesta'),
('El Clasico', 'MEDIUM', 'Which Barcelona player scored a hat-trick at the Bernabeu in 2014?', 'Lionel Messi scored a hat-trick in the 2014 Clasico at the Bernabeu.', 'Lionel Messi', 'Neymar', 'Alexis Sanchez', 'Pedro'),
('El Clasico', 'MEDIUM', 'Which Barcelona manager was in charge during the 5-0 win over Real Madrid in 2010?', 'Pep Guardiola managed Barcelona during the 5-0 Clasico win in 2010.', 'Pep Guardiola', 'Luis Enrique', 'Frank Rijkaard', 'Tito Vilanova'),
('El Clasico', 'MEDIUM', 'Which Barcelona defender famously celebrated by showing five fingers after the 5-0 Clasico?', 'Gerard Pique famously celebrated the 5-0 win with five fingers.', 'Gerard Pique', 'Carles Puyol', 'Dani Alves', 'Victor Valdes'),
('El Clasico', 'MEDIUM', 'Which Barcelona player scored a famous solo goal at the Bernabeu in the 2011 Champions League semi-final?', 'Lionel Messi scored a famous solo goal at the Bernabeu in 2011.', 'Lionel Messi', 'David Villa', 'Pedro', 'Andres Iniesta'),

-- ============================================================
-- EL CLASICO - HARD
-- ============================================================
('El Clasico', 'HARD', 'Which Barcelona player scored two goals in the 5-0 Clasico win in 2010?', 'David Villa scored twice in Barcelona''s 5-0 win over Real Madrid.', 'David Villa', 'Lionel Messi', 'Pedro', 'Xavi'),
('El Clasico', 'HARD', 'Which Barcelona midfielder scored the opening goal in the 5-0 Clasico win in 2010?', 'Xavi scored the opening goal in that match.', 'Xavi', 'Iniesta', 'Busquets', 'Keita'),
('El Clasico', 'HARD', 'Which Barcelona forward scored in the 2-6 win at the Bernabeu in 2009?', 'Thierry Henry scored in Barcelona''s famous 2-6 win.', 'Thierry Henry', 'Zlatan Ibrahimovic', 'David Villa', 'Neymar'),
('El Clasico', 'HARD', 'Which Barcelona captain was sent off in the 5-0 win over Real Madrid in 2010?', 'This is a trick question: no Barcelona captain was sent off in that match.', 'No Barcelona captain', 'Carles Puyol', 'Xavi', 'Gerard Pique'),
('El Clasico', 'HARD', 'Who scored Barcelonas sixth goal in the 2-6 win at the Bernabeu in 2009?', 'Gerard Pique scored Barcelona''s sixth goal in the 2-6 win.', 'Gerard Pique', 'Lionel Messi', 'Thierry Henry', 'Samuel Eto''o'),

-- ============================================================
-- EL CLASICO - EXPERT
-- ============================================================
('El Clasico', 'EXPERT', 'Who scored two goals for Barcelona in the famous 5-0 win over Real Madrid in 2010?', 'David Villa scored twice in Barcelona''s 5-0 win against Real Madrid.', 'David Villa', 'Lionel Messi', 'Pedro', 'Xavi'),
('El Clasico', 'EXPERT', 'Who scored the opening goal in Barcelona''s 5-0 win over Real Madrid in 2010?', 'Xavi scored the opening goal in the 2010 5-0 Clasico.', 'Xavi', 'Iniesta', 'Pedro', 'Busquets'),
('El Clasico', 'EXPERT', 'Which Barcelona player held up his shirt after scoring a late winner at the Bernabeu in 2017?', 'Lionel Messi celebrated by holding up his shirt after scoring the late winner.', 'Lionel Messi', 'Neymar', 'Luis Suarez', 'Andres Iniesta'),
('El Clasico', 'EXPERT', 'Which Barcelona forward scored twice in the 2-6 win at the Bernabeu in 2009?', 'Thierry Henry scored twice in Barcelona''s 2-6 win against Real Madrid.', 'Thierry Henry', 'Samuel Eto''o', 'Lionel Messi', 'David Villa'),
('El Clasico', 'EXPERT', 'Which Barcelona captain scored with a header in the 2-6 win at the Bernabeu in 2009?', 'Carles Puyol scored with a header in the 2-6 win at the Bernabeu.', 'Carles Puyol', 'Gerard Pique', 'Xavi', 'Dani Alves');

-- Insert questions
INSERT INTO questions (difficulty, explanation, text, category_id)
SELECT
    sq.difficulty,
    sq.explanation,
    sq.question_text,
    c.id
FROM seed_questions sq
         JOIN categories c ON c.name = sq.category_name
WHERE NOT EXISTS (
    SELECT 1 FROM questions q WHERE q.text = sq.question_text
);

-- Insert answer options for every seeded question
INSERT INTO answer_options (correct, text, question_id)
SELECT
    option_data.correct,
    option_data.answer_text,
    q.id
FROM seed_questions sq
         JOIN questions q ON q.text = sq.question_text
         CROSS JOIN LATERAL (
    VALUES
        (TRUE, sq.correct_answer),
        (FALSE, sq.wrong1),
        (FALSE, sq.wrong2),
        (FALSE, sq.wrong3)
        ) AS option_data(correct, answer_text)
WHERE NOT EXISTS (
    SELECT 1
    FROM answer_options ao
    WHERE ao.question_id = q.id
      AND ao.text = option_data.answer_text
);

COMMIT;

-- ============================================================
-- VALIDATION QUERIES
-- Run these after the seed.
-- ============================================================

-- 1. Every category/difficulty should have at least 5 questions.
SELECT
    c.name AS category,
    q.difficulty,
    COUNT(*) AS question_count
FROM questions q
         JOIN categories c ON c.id = q.category_id
GROUP BY c.name, q.difficulty
ORDER BY c.name, q.difficulty;

-- 2. This should return no rows.
-- If it returns rows, those questions are missing options or have wrong correct-answer count.
SELECT
    q.id,
    q.text,
    q.difficulty,
    c.name AS category,
    COUNT(ao.id) AS option_count,
    SUM(CASE WHEN ao.correct = true THEN 1 ELSE 0 END) AS correct_count
FROM questions q
         JOIN categories c ON c.id = q.category_id
         LEFT JOIN answer_options ao ON ao.question_id = q.id
GROUP BY q.id, q.text, q.difficulty, c.name
HAVING COUNT(ao.id) <> 4
    OR SUM(CASE WHEN ao.correct = true THEN 1 ELSE 0 END) <> 1
ORDER BY q.id;