-- OliverVVE als omgeving op het portaal.
-- Draai dit in de Supabase SQL Editor vóórdat je iemand toegang tot VVE geeft;
-- zonder deze enum-waarde mislukt het opslaan van die toegang.
alter type tool_slug add value if not exists 'energy';
alter type tool_slug add value if not exists 'vve';
