# STRUTTURA delle scene

## Shipyard


## star map

## combact map

# equipaggiamenti

## Armi

### Laser

Le armi laser sono armi che proiettano un raggio laser sul bersaglio. i giocatori possono decidere se concentrare il laser in un punto o su una retta. i raggi laser sono fermati dagli scudi.

Laser mk1 | value
------------ | -------------
tempo di ricarica:| x sec
danni al secondo: | x
secondi di sparo: | x sec
lunghezza massima del raggio: | x 
consumo energetico | x

### armi balistiche

le armi balistiche sono armi che lanciano proiettili. i proiettili vengono fermati dagli scudi 

Cannone  | value
------------ | -------------
Danni per colpo: | x
proiettili per colpo: | 1
tempo di ricarica: | x sec
consumo energetico | 1

doppio cannone  | value
------------ | -------------
Danni per colpo: | x
proiettili per colpo: | 2
tempo di ricarica: | x sec
consumo energetico | 2

## missili

i missili possono passare attraverso gli scudi tramite disturbatori di scudo montati su di essi.

## scudi

gli scudi riparano la nave dai laser e dai proiettili. Il generatore di scudi occupa 4 spazi e genera un certo ammontare di scudo al secondo fino ad un massimo che dipende dal livello del generatore e dal numero di generatori.

Generatore | liv 1 | liv 2 |liv 3 | liv 4
--------|---|---|---|---
scudo max | x | x | x | x
scudo al secondo | x | x | x | x
consumo energetico | 2 | 4 | 6 | 8

## stanze

le stanze si dividono in 3 dimensioni, 2x2, 2x1 e 1x1. ogni quadrato della stanza aggiunge un punto vita alla nave.
le stanze vuote forniscono capacità di carico alla nave.
le stanze sono aggiornabili con i seguenti potenziamenti.

### corazza

aggiunge un punto vita alla nave ed evita che la scanza riceva una breccia se colpita da un missile o da un arma balistica.

### sistema anti incendio 

spegne automaticamente gli incendi nella stanza.

## sistemi

### motori

i motori aumentano la velocità della nave, quindi aumenta la probabilità di schivare i colpi in arrivo. la probabilità massima di schivata non può superare il 50%. possono essere montati in stanze 1x2 o 2x2

### console di guida

la console di guida permette di manovrare la nave, ogni livello aumenta la probabilità di schivata, e l'ultimo livello permette alla nave di guidarsi da sola. può essere montato in staze 1x1 o più grandi

### reattore 

il reattore fornisce energia alla nave. ogni reattore può contenere un numero di barre di uranio che dipende dal livello. ogni barra fornisce 1 punto di energia. il reattore ha bisogno di stanze 2x2

liv | 1 | 2 | 3 | 4
--------|---|---|---|---
numero barre | 10 | 20 | 30 | 40

### supporto armamenti

in questo sistema vengono montate le armi della nave. può essere montato in stanza 2x1, fornendo un solo slot di armi, o in stanze 2x2 fornendo 2 slot di armi. ogni livello aumenta la potenza energetica utilizzabile dalle armi.

liv | 1 | 2 | 3 | 4
--------|---|---|---|---
potenza | 2 | 4 | 6 | 8

### airlook

gli airloock servono per far uscire o entrare l'equipaggio dalla nave. ogni nave dev'esserne provvista di almeno 1. dagli airlock possono entrare i nemici che tentano di invadere la nave.

### navete d'assalto

le navette d'assalto permettono di assaltare le navi nemiche e di prenderne il controllo. a seconda della grandezza della stanza possono portare 1, 2 o 4 membri dell'equipaggio. ogni livello aumenta la corazza della navetta.

### sistemi difensivi

i sistemi difensivi difendono la nave dalle minacce in arrivo. possono essere di 3 tipi, difesa interna o esterna. può esserci solo un tipo di difesa esterna, laser o mitragliatrice.

#### torretta interna

spara a ogni nemico nella stanza in cui è montata, le stanze più grandi possono contenere più torrette.

#### Laser a corto raggio

i laser a corto raggio sparano ai proiettili, missili o navette in arrivo. richiedono 2 unità energetiche, ma hanno 80% di probabilità di colpire.

#### mitragliatrice difensiva.

questa mitragliatrice spara ai missili, navette o proiettili in arrivo. è più potente di un laser, ma ha una probabilità dell'50% di colpire.
