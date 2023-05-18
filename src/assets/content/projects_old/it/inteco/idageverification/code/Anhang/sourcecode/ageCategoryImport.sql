SELECT CASE
    WHEN os20_typ IN ('rotw' , 'weis', 'sues', 'rose', 'scha') THEN 'weine'
    WHEN os20_typ = 'spir' THEN 'spirituosen'
    WHEN LEFT(os20_shop_stcd, 5) = 61650 THEN 'bier'
    ELSE 'andere'
END FROM os20
WHERE os20_artnr = '$1';
