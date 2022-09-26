CREATE SEQUENCE pokemon_id_seq;

CREATE TABLE pokemon(
    id int4 NOT NULL DEFAULT nextval('pokemon_id_seq'),
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    description VARCHAR(226) NOT NULL,
    evolutionChain0id INTEGER,
    evolutionChain0name VARCHAR(30),
    evolutionChain1id INTEGER,
    evolutionChain1name VARCHAR(30),
    height INTEGER NOT NULL,
    imageUrl VARCHAR(178) NOT NULL,
    name VARCHAR(30) NOT NULL,
    type VARCHAR(30) NOT NULL,
    weight INTEGER NOT NULL,
    CONSTRAINT produto_pk PRIMARY KEY (id)
);

CREATE UNIQUE INDEX pokemon_id_idx ON public.pokemon USING btree (id);